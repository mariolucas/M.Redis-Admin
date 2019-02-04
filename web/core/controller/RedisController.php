<?php 

class RedisController extends ConfigController
{
	public $redis;

	function __construct($server)
	{
		$data = $this->getServer($server);
		
		$this->redis = new Redis();
                $this->redis->connect(
                	$data["host"],
                	$data["port"],
                	$data["timeout"],
                	$data["persistent_id"]
                );

                // Autenticação
                if($data["pass"]){
                        $this->redis->auth($data["pass"]);
                }               
                
	}
}

 ?>