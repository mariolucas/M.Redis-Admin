<?php 

$app->get('/',function(){
	echo "M.Redis Admin";
});

$app->get('/config_servers','ConfigController:getConfigServers');

$app->get('/{server}/dbs',function($request, $response, $args){
	$dbs = new DbsController( $args['server'] );
	return $dbs->getDbs();
});

$app->get('/{server}/host/info', function($request, $response, $args){
	$key = new ServerController( $args['server'] );
	return $key->getHostInfo();
});

$app->get('/{server}/server/info', function($request, $response, $args){
	$key = new ServerController( $args['server'] );
	return $key->getServerInfo();
});