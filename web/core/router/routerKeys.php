<?php 

$app->get('/{server}/{db}/getkeys', function($request, $response, $args){
	$key = new KeysController( $args['server'] );
	return $key->getKeys( $args['db'] );
});

$app->get('/{server}/{db}/getkeyinfo/{key}', function($request, $response, $args){
	$key = new KeysController( $args['server'] );
	return $key->getKeyInfo($args["key"], $args["db"]);
});

$app->post('/{server}/setkey', function($request, $response, $args){
	$key = new KeysController( $args['server'] );
	return $key->setkey();
});

$app->post('/{server}/editkey', function($request, $response, $args){
	$key = new KeysController( $args['server'] );
	return $key->edit();
});

$app->delete('/{server}/{db}/deleteKey/{key}', function($request, $response, $args){
	$key = new KeysController( $args['server'] );
	return $key->delete($args["db"], $args["key"]);
});

$app->delete('/{server}/{db}/deleteValue/{type}/{key}/{item}', function($request, $response, $args){
	$key = new KeysController( $args['server'] );
	return $key->deleteValue($args["db"], $args["type"] ,$args["key"],$args["item"]);
});