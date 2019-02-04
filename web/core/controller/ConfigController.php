<?php 

 class ConfigController
 {
 	function __construct(){}

 	public function getFileServe()
 	{
 		return require '../config/serversConfig.php';
 	}

 	public function listServers()
 	{
 		return $this->getFileServe()["servers"];
 	}

 	public function getServer($server)
 	{
 		return $this->getFileServe()["servers"][$server];
 	}

 	public function getConfigServers()
 	{
		$servers = $this->listServers();

		foreach ($servers as $key => $value) 
		{
			$servers[$key]["auth"] = false;
			if($value["pass"]){
				$servers[$key]["auth"] = true;
			}
		}

		echo json_encode( $servers );
	}
 }