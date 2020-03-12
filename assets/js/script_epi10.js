
$(function() {
    
    var grid = $("#employee_data").bootgrid({

    labels: {
        noResults: "Não existe Resultados",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    
    caseSensitive: false,    

    }).on("loaded.rs.jquery.bootgrid", function() {

        /* Executes after data is loaded and rendered */
        grid.find(".command-edit").on("click", function(e) {
            e.preventDefault();
        }).end().find(".command-delete").on("click", function(e) {
            e.preventDefault();     
        });
    });
    function editvalor(epivalor) {

        let resultado    = BASE_URL + "/epiEdit?id=" + epivalor;
        return resultado;
    }
});




