$(function() {

    $('#emp_body').hide();
    
$("#setor_data").bootgrid({
    cache: false,
    labels: {
        noResults: "Não existe Resultados",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    
    caseSensitive: false,    

    
    })

 
});

function rediricionarsetor(){
	window.location.href = BASE_URL+'/sstSetor';
}
