<?php

//echo ("VERSION","0.0.20");
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);

session_start();
// if(empty($_SESSION['dono'])){
//         $_SESSION['dono'] = md5($_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT']);       
// }
// $token = md5($_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_USER_AGENT']);
// if($_SESSION['dono'] != $token){
//         exit;
// }
//sleep(10);
	
require 'vendor/autoload.php';
require 'config.php';
define('VERSION', '1.00');
define('YEAR', '2019');

define('BASE_URL', 'http://localhost:8888/sistembar');

spl_autoload_register(function ($class){

    if(strpos($class, 'Controller') > -1) {
        
        if(file_exists('controllers/'.$class.'.php')) {
                require_once 'controllers/'.$class.'.php';
         } 
        
    } else if(file_exists('models/'.$class.'.php')) {
            require_once 'models/'.$class.'.php';

    } else if(file_exists('core/'.$class.'.php')) {
            require_once 'core/'.$class.'.php';
    }
});

$core = new Core();
$core->run();

