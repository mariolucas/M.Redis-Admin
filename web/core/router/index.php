<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include "../autoload.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require dirname(__FILE__) . '/../vendor/autoload.php';

$config = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$conf = new \Slim\Container($config);
$app = new \Slim\App($conf);

// Rotas para dados do servidor
require("./routerServer.php");

// Rotas para dados de chaves
require("./routerKeys.php");

$app->run();