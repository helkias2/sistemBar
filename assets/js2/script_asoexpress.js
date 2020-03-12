$(function() {

   // $('#emp_body').hide();
    // -----------------------------  lista dos resultados OS--------------------------//
    var grid = $("#asoexpress").bootgrid({
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
                return  "<button type=\"button\" class=\"btn btn-primary w-100 command-atestado\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-print fa-lg\"></span></button>"; 
        },        
        "commands2": function(column, row) {
                return  "<button type=\"button\" class=\"btn btn-primary w-100 command-femo\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-print fa-lg\"></span></button>"; 
        }
    }     
    }).on("loaded.rs.jquery.bootgrid", function() {
        grid.find(".command-atestado").on("click", function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
                var url = BASE_URL+"/sstAsoList/getRelatorioAsoExpressPopUp/"+valor;
                window.open(url, "sstAsolist", "width=820,height=500");
        }).end().find(".command-femo").on("click", function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
            //alert("Deseja mesmo excluir?");
            var url = BASE_URL+"/sstAsoList/relatoriofemo/"+valor;
            window.open(url, "sstAsoView2", "width=850,height=600"); 
        });
    });
});