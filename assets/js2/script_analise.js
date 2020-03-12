// $('#emp_body').hide();  
// $("#analiseRisco_data").bootgrid({
//     cache: false,
//     labels: {
//         noResults: "Não existem resultados.",
//         search: "pesquisa",
//         infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} inscrições",
//         responsiveTable: 'table-responsive'+ 'data-row-id'
//     },    
//     caseSensitive: false,
// 	formatters: {
//         "commands1": function(column, row) {
//                 return  "<button type=\"button\" class=\"btn btn-success w-100 command-viewaso\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-lg\"></span></button>"; 
//         },
//         "commands2": function(column, row) {
//                 return  "<button type=\"button\" class=\"btn btn-success w-100 command-femo\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-lg\"></span></button>"; 
//         }
//     } 
// });// JavaScript Document


$(function(){
    carregarDados();
    function carregarDados(){
      var datatable = $('#analiseRisco_data').DataTable({
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
              "url": BASE_URL + "/ajaxAnalise/listAnaliseRisco",
              "type": 'POST',
              "data": function(d) {
                d.vlactionAnalise = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"codanalise"}, 
        {data:"razaosocial"}, {data:"nomesetor"},{data:"nomefuncionario"},{data:"funcao"},
        {data:"risco"},
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
            { data: "codanalise", 
            "render": function (data, type, row, meta) { 
                return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstAnaliseTecnica/analiseEdit/' + data +'">' + 'Editar' + '</a>'; }

            },    
            { data: "codanalise",
            "render": function (data, type, row, meta) { 
              return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstAnaliseTecnica/delete/' + data +'">' + 'Delete' + '</a>'; }
          },

          ],

      });

      $("#analiseRisco_data").show();
  }
})

