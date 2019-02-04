<?php

spl_autoload_register(function ($class) {
    $pastas = [
    	"controller"
    ];

	foreach ($pastas as $key => $pasta) 
	{
	    // Criando o caminho do arquivo
	    $file =  __DIR__.'/'.$pasta."/".str_replace('\\', '/', $class).'.php';

	    // Verifica se existe o arquivo no diretório
	    if (file_exists($file)){
	        require $file;
	    }
	}
});