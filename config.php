<?php

ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);

require 'environment.php';

global $config;
$config = array();
	if(ENVIRONMENT == 'development') {
		$config['dbname'] = 'sistembar';
		$config['host'] = 'localhost';
		$config['dbuser'] = 'root';
		$config['dbpass'] = 'root';
		$config['dbcharset'] = 'utf8_decode';
		$config['DEBUG']  = true;
		
	} else {
		$config['dbname'] = 'sistembar';
		$config['host'] = 'localhost';
		$config['dbuser'] = 'root';
		$config['dbpass'] = '';
	}
?>
