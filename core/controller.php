<?php
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);
class controller {

	protected $db;

	public function __construct() {
		global $db;
		$this->db = $db;
	}
	
	public function loadView($viewName, $viewData = array()) {
		extract($viewData);
		include 'views/'.$viewName.'.php';
	}

	public function loadTemplate($viewName, $viewData = array()) {
		include 'views/template.php';
	}

	public function loadAdminTemplate($viewName, $viewData = array()){
		include 'views/admin/templateAdmin.php';
	}

	public function loadViewInTemplate($viewName, $viewData) {
		extract($viewData);
		include 'views/'.$viewName.'.php';
	}

	public function loadAdminViewInTemplate($viewName, $viewData){
		extract($viewData);
		include 'views/admin/'.$viewName.'.php';
		//require 'Views/admin/template.php';
	}

	public function loadLibrary($lib) {
		if(file_exists('libraries/'.$lib.'.php')) {
			include 'libraries/'.$lib.'.php';
		}
	}

}