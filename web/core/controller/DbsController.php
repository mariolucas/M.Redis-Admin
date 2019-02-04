<?php 

class DbsController extends RedisController
{
	function __construct($server)
	{
		parent::__construct($server);
	}

	function getDbs()
	{
		$dbs = $this->redis->config('GET','databases');
		$databases = $dbs["databases"];

		$res = [];

		if(empty( $databases )){
			$databases = 1;
		}

		for ($i=0; $i < $databases; $i++) { 
			$res[$i]['id'] = $i;
			$res[$i]['name'] = "db".$i;
		}

		echo json_encode( $res );
	}

	function resetDb(int $db = null)
	{
		if($db >= 0 ){
			$this->redis->flushDb();
			echo json_encode( $res );
		} else {
			return false;
		}
	}
}

