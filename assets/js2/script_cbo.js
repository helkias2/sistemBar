$(function(){

    //$('#cbo_data').hide();

    $("#cbo_data").bootgrid({

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
