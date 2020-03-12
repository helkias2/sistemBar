// $('#emp_body').hide();  
// $("#ambiente_data").bootgrid({
//     cache: false,
//     labels: {
//         noResults: "Não existem resultados.",
//         search: "pesquisa",
//         infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} inscrições",
//         responsiveTable: 'table-responsive'+ 'data-row-id'
//     },    
//     caseSensitive: false,
//     formatters: {
//         "commands1": function(column, row) {
//                 return  "<button type=\"button\" class=\"btn btn-success w-100 command-viewaso\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-lg\"></span></button>"; 
//         },
//         "commands2": function(column, row) {
//                 return  "<button type=\"button\" class=\"btn btn-success w-100 command-femo\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-lg\"></span></button>"; 
//         }
//     } 
// });

$(function(){
    carregarDados();
    function carregarDados(){
      var datatable = $('#ambiente_data').DataTable({
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
              "url": BASE_URL + "/ajaxAmbiente/listAmbiente",
              "type": 'POST',
              "data": function(d) {
                d.vlactionAmbiente = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"codamb"}, 
        {data:"razaosocial"}, 
        {data:"estabprop",
        "render": function(data, type, row, meta) {
            if (row.estabprop == 'S') {
                return "SIM";
            }else{
                return "NÃO";
            }
        }    
    },
    {data:"nomeestab"},
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
            { data: "codamb", 
            "render": function (data, type, row, meta) { 
                return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/cadAmb/edit/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }

            },    
            { data: "codamb",
            "render": function (data, type, row, meta) { 
              return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/cadAmb/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
          },

          ],

      });

      $("#ambiente_data").show();
  }
})