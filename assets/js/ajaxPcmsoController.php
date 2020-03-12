<?php 

class ajaxPcmsoController extends controller {
//LISTO OS PPRA
    public function listPcmso() {
        $data = array();
        $use = new Users();
        $use->setLoggedUser();
        $idcompany = new Companies($use->getCompany());
        $idcompany = $use->getCompany();
        $pcmso = new RelatorioPcmso();

        if(isset($_POST['vlactionPcmso']) && $_POST['vlactionPcmso'] == 'action') {
            //$codempresa = addslashes($_POST['mtemp']);
            $data = $pcmso->getlist($idcompany);

            echo json_encode($data);

        }
    }
}    