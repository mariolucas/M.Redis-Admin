<?php 

class ServerController extends RedisController
{
	function __construct($server)
	{
		parent::__construct($server);
	}

	public function getHostInfo()
	{
		$data["port"] = $this->redis->getPort();
		$data["host"] = $this->redis->getHost();
		$data["timeout"] = $this->redis->getTimeout(); 
		$data["auth"] = $this->redis->getAuth();
		
		echo json_encode( $data );
	}

	public function getServerInfo(){
		$paramInfo = [
			'server',
			'clients',
			'memory',
			'persistence',
			'stats',
			'replication',
			'cpu',
			'commandstats',
			'cluster',
			'keyspace'
		];
		foreach ($paramInfo as $key => $value) {
			$data[$value] = $this->redis->info($value);
		}

		echo json_encode( $data );
	}
}

 