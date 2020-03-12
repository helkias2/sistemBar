$(function(){
  carregarDados();
  function carregarDados(){
    var rows_selected = [];
    var datatable = $('#asoexpress').DataTable({
      select: {
        style: 'multi'
    },
    "aaSorting": [[0, "desc" ]],
    "processing": true,
    "language": {
        "lengthMenu": "Exibição _MENU_ Registros por página",
        "zeroRecords": "Nada encontrado - desculpe",
        "info": " Mostrando página _PAGE_ ate _PAGES_",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "infoFiltered": "(filtrado de _MAX_ total linhas)",
        "search":         "Pesquisar:",
        "paginate": {
          "first":      "Primeiro",
          "last":       "Último",
          "next":       "Próximo",
          "previous":   "Anterior" 
      },
  },
  "ajax":{
    "url": BASE_URL + "/ajaxAsoExpress/listaAsoEpress",
    "type": 'POST',
    "data": function(d) {
      d.vlaction = "action";   
  },
  "dataSrc":""
},
"columns":[
{data:"idasoexpress"},
{data:"razaosocial"}, 
{data:"nometrabalhador"},
{data:"tipoexame"},  
{data:"datacadasoexpress",
"render": function (data, type, row, meta) { 
    function dateToEN(date){  
     return date.split('-').reverse().join('/');
 }; 
 return  dateToEN(data);
},
},
          // {data:"situacao",
          //      "render": function (data, type, row, meta) { 
          //         if( data === 'N'){
          //           return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'DESATIVADA'+'</a>';
          //         } else{
          //           return '<a class="btn btn-info btn-sm">' +'ATIVA'+ '</a>';
          //         }
          //     }
          // },
          { data: "codasoexpress",
          "render": function(data, type, row, meta) {
            return '<button type="button" class="btn btn-primary btn-sm" id="botaoAso" data-row-id="' + data + '"><span class="fa fa-print fa-lg "> </span></button>';
        }
    },    
    { data: "codasoexpress",
    "render": function(data, type, row, meta) {
        return '<button type="button" class="btn btn-primary btn-sm" id="botaoProntuario" data-row-id="' + data + '"><span class="fa fa-print fa-lg "> </span></button>';
    }
},
    {data: "codasoexpress",
"render": function(data, type, row, meta) {
    return '<a class="btn btn-danger btn-sm" href="' + BASE_URL + '/sstAsoList/delete/' + data + '"><span class="fa fa-trash fa-lg "></span></a>';
    }
    },
],

});

    $("#asoexpress").show();
}
})
//chamada de popup exame
$(document).ready(function() {
    $("#asoexpress").on('click', '#botaoAso', function(e) {
        e.preventDefault();
        let valor = $(this).attr('data-row-id')
        var url = BASE_URL + "/sstAsoList/getRelatorioAsoExpressPopUp/" + valor;
        window.open(url, "sstAsolist", "width=850,height=500");
    })
})
//chamada de popup prontuario
$(document).ready(function() {
    $("#asoexpress").on('click', '#botaoProntuario', function(e) {
        e.preventDefault();
        let valor = $(this).attr('data-row-id')
        var url = BASE_URL + "/sstAsoList/relatoriofemo/" + valor;
        window.open(url, "sstAsoView2", "width=850,height=500");
    })
})





