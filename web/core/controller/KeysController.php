<?php 
/**
 * Gerenciamento de chaves
 */
class KeysController extends RedisController
{
	function __construct($server)
	{
		parent::__construct($server);
	}

	public function getTimeKey($key)
	{
		$ttl = $this->redis->ttl( $key );
		if($ttl == -1 ){
			$ttl = "0";
		}
		return $ttl;
	}
	/**
	 * [getKeyInfoArray description]
	 * @param  string $key   Nome da chave
	 * @param  array $infos Opções de informações que deverão ser retornados. 
	 *                       Exemplo: ["type","ttl","key","value"]
	 *                       
	 * @return array
	 */
	public function getKeyInfoArray( string $key, array $infos )
	{
		$res["key"] = $key;
		$type = $this->redis->type( $key );
		switch ( $type ) {
			case Redis::REDIS_STRING :
				$res["value"] = $this->redis->get( $key );
				$res["ttl"]   = $this->getTimeKey( $key );
				$res["type"]  = "String" ;
				break;
			case Redis::REDIS_SET :
				$res["value"] = $this->redis->sMembers( $key );
				$res["ttl"]   = $this->getTimeKey( $key );
				$res["type"]  = "Set" ;
				break;
			case Redis::REDIS_LIST :
				$res["value"] = $this->redis->lRange( $key, 0, -1 );
				$res["ttl"]   = $this->getTimeKey( $key );
				$res["type"]  = "List" ;
				break;
			case Redis::REDIS_ZSET  :
				$res["value"] = $this->redis->zRange( $key, 0, -1, true );
				$res["ttl"]   = $this->getTimeKey( $key );
				$res["type"]  = "zSet" ;
				break;
			case Redis::REDIS_HASH :
				$res["value"] = $value = $this->redis->hGetAll( $key );
				$res["ttl"]   = $this->getTimeKey( $key );
				$res["type"]  = "Hash" ;
				break;
		}
		foreach ($infos as $key => $value) 
		{
			$data[$value] = $res[$value];
		}
		return $data;
	}
	public function getKeyInfo( string $key, $db )
	{
		$this->redis->select( $db );
		$res = $this->getKeyInfoArray( $key, ["type","ttl","key","value"] );
		echo json_encode( $res );
	}
	public function getKeys(int $db = null, string $keyPattern = '*')
	{
		if($db >= 0 ){
			// Selecionado banco
			$this->redis->select( $db );
			// Listando keys
			$keys = $this->redis->keys( $keyPattern );
			$res = array();
			foreach ($keys as $value) {
				array_push( $res , $this->getKeyInfoArray( $value, ["type","ttl","key"] ) );
			}

			echo json_encode( $res );
		} else {
			return false;
		}
	}

	public function requestData()
	{
		$req = file_get_contents("php://input");
		$dados = json_decode( $req, true );
		return $dados;
	}

	public function setByType($dados)
	{
		$key = $dados["key"];
		$value = $dados["value"];

		switch ( $dados["type"] ) {
			case 'String':
				$this->redis->set( $key, $value );

				// Verifica se os dados foram adicionados
				$res = $this->redis->get( $key );
				break;

			case 'Set':
				// Adicionado ao conjunto
				if(isset( $dados["edit"] )){
					$this->redis->sRem( $key, $dados["oldValue"] );
					$this->redis->sAdd( $key, $value );
				} else {
					$this->redis->sAdd( $key, $value );
				}				

				// Verifica se é um membro do conjunto
				$res = $this->redis->sIsMember( $key, $value );
				break;
			case 'Hash':

				$hash = $dados["hash"];

				$this->redis->hSet($key, $hash, $value );

				// Verifica se os dados foram adicionados
				$res = $this->redis->hGet( $key, $hash);
				break;
			case 'zSet':

				$score = $dados["score"];

				if(isset( $dados["edit"] )){
					$this->redis->zRem( $key, $dados["oldValue"] );
					$this->redis->zAdd( $key, $score, $value );
				} else {
					$this->redis->zAdd($key, $score, $value );
				}

				// Verifica se os dados foram adicionados corretamente
				$scoreDb = $this->redis->zScore( $key, $value );
				$res = false;
				if($score == $scoreDb ){
					$res = true;
				}
				break;
			case 'List':

				$size = $this->redis->lSize( $key );

				if( $dados["selectIndex"] == "index"){
					$index = (int) $dados["index"];
				} 
				else if( isset( $dados["index"] ) ){
					$index = (int) $dados["index"];
				} 
				else {
					$index = $dados["selectIndex"];
				}

				if( $index === "end" || $index > $size){
					$this->redis->rPush( $key, $value );
					$res = true;
				} 
				else if( $index === "begin" || $index < 0 ){
					$this->redis->lPush($key, $value );
					$res = true;
				} 
				else if( ($index >= 0 ) && ($index <= $size ) ){
					/**
					 * REORDENANDO ITENS
					 * Caso o index tenha sido alterado
					 */
					if( $dados["edit"] && ($dados["indexOld"] != $dados["index"] ) ){

						// Obtendo lsita atual
						$list = $this->redis->lRange( $key, 0, -1 );

						// Remove o item selecionado da lista atual e 
						// inclui a saída na variavel $item
						$item = array_splice($list, $dados["indexOld"], 1);

						// Adicionada o $item na nova posição
						array_splice($list, $index, 0, $item);
						
						// Altera posições no banco
						foreach ($list as $k => $value) {
							$this->redis->lSet($key, $k , $value);
						}

					} else {
						// Alterando valor o item
						$this->redis->lSet($key, $index, $value);
					}
					$res = true;
				}
				else {
					$res = false;
				}

				break;
		}

		if( $dados["ttl"] ){
			$this->redis->expire( $key, $dados["ttl"] );
		}
		
		echo json_encode( $res );
	}

	public function edit()
	{
		$dados = $this->requestData();

		// Selecionado banco a ser gravado
		$this->redis->select( $dados["db"] );

		// Definindo tipo de valor a ser gravado
		$this->setByType( $dados );
	}

	public function setkey()
	{
		// Obtendo dados
		$dados = $this->requestData();

		// Selecionado banco a ser gravado
		$this->redis->select( $dados["db"] );

		// Alterado tempo de expiração, caso
		// tenha sido solicitado
		if( $dados["editTtl"]){
			$this->redis->expire( $dados["key"] , $dados["ttl"] );
			echo true;
		} 
		else {
			// Gravando dados por tipo da chave
			$this->setByType( $dados );
		}
	}

	public function delete($db,$key)
	{
		$this->redis->select( $db );
		$info = $this->redis->info( "server" );
		/**
		 * Verifica a versão do Redis para aplicar 
		 * a função correta.
		 */
		if($info->redis_version >= "4.0.0"){
			$res = $this->redis->unlink($key);
		} else {
			$res = $this->redis->delete($key);
		}

		echo json_encode( $res );
	}

	public function deleteValue($db, $type, $key, $item)
	{
		$this->redis->select( $db );
		switch ($type) {
			case 'List':
				$res = $this->redis->lRem($key,$item,1);
				break;

			case 'Hash':
				$res = $this->redis->hDel($key,$item);
				break;

			case 'Set':
				$res = $this->redis->sRem($key,$item);
				break;

			case 'zSet':
				$res = $this->redis->zDelete($key, $item);
				break;
			
			default:
				
				break;
		}

		echo json_encode( $res );
	}
}