// $(function() {

//     $('#parceir_body').hide();
    
//     $(document).ready(function(){
//         $("#parceiros_data").bootgrid({
//             cache: false,
//             labels: {
//                 noResults: "Não existe Resultados",
//                 search: "pesquisa",
//                 infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
//                 responsiveTable: 'table-responsive'+ 'data-row-id'
//             },    
            
//             caseSensitive: false,    
            
//         });
//     });
// });    

$(function(){
    carregarDados();
    function carregarDados(){
      var datatable = $('#parceiros_data').DataTable({
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
              "url": BASE_URL + "/ajaxParceiros/listParceiros",
              "type": 'POST',
              "data": function(d) {
                d.vlactionParceiros = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"codparceiro"}, 
        {data:"nome"}, 
        {data:"telefone"},
        {data:"responsavel"},
        {data:"email"},
        {data:"obs"},
        //{data:"funcao"},
        //{data:"risco"},
               //{data:"statusppp"},
                 //"render": function (data, type, row, meta) { 
                   //function dateToEN(date){  
                    // return date.split('-').reverse().join('/');
                   //}; 
                  // return  dateToEN(data);
                 //},
             //},
            //   {data:"situacao",
            //     "render": function (data, type, row, meta) { 
            //        if( data === ''){
            //          return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'Demitido'+'</a>';
            //        } else{
            //          return '<a class="btn btn-info btn-sm">' +'ATIVO'+ '</a>';
            //        }
            //    }
            //   },
            { data: "codparceiro", 
            "render": function (data, type, row, meta) { 
                return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstParceiro/parceiroEdit/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }

            },    
            { data: "codparceiro",
            "render": function (data, type, row, meta) { 
              return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstParceiro/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
          },

          ],

      });

      $("#parceiros_data").show();
  }
})