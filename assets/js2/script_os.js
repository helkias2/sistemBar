$(function() {

   // $('#emp_body').hide();
    // -----------------------------  lista dos resultados OS--------------------------//
    var grid = $("#ordem").bootgrid({
    labels: {
        noResults: "Não existem resultados.",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} inscrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    caseSensitive: false,    
    post: function(){
            return{ id:"b0df282a-0d67-40e5-8558-c9e93b7befed" };
    },
    formatters: {
        "commands": function(column, row) {
                return  "<button type=\"button\" class=\"btn btn-primary w-100 command-atestado\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-print fa-lg \"></span></button>"; 
        }
    }     
    }).on("loaded.rs.jquery.bootgrid", function() {
        grid.find(".command-atestado").on("click", function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
                var url = BASE_URL+"/sstOS/osGet/"+valor;
                window.open(url, "sstOs", "width=820,height=500");
        })
    });
});