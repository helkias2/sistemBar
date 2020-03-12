$(function(){
    carregarDados();
  function carregarDados(){
      var rows_selected = [];
      var datatable = $('#treinamento_data').DataTable({
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
          "url": BASE_URL + "/ajaxTreinamento/getListTreinamentos",
          "type": 'POST',
            "data": function(d) {
                d.vlaction = "action";   
            },
          "dataSrc":""
      },
      "columns":[
          {data:"codtreinamento"}, 
          {data:"razaosocial"}, {data:"codtabela"}, {data:"desctabela"},
  
        //   {data:"datacad",
        //     "render": function (data, type, row, meta) { 
        //       function dateToEN(date){  
        //         return date.split('-').reverse().join('/');
        //       }; 
        //       return  dateToEN(data);
        //     },
        // },
        //   {data:"situacao",
        //        "render": function (data, type, row, meta) { 
        //           if( data === 'N'){
        //             return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'DESATIVADA'+'</a>';
        //           } else{
        //             return '<a class="btn btn-info btn-sm">' +'ATIVA'+ '</a>';
        //           }
        //       }
        //   },
          { data: "codtreinamento",
              "render": function (data, type, row, meta) { 
                      return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstTreinamento/treinamentoEdit/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }
          },    
          { data: "codtreinamento",
              "render": function (data, type, row, meta) { 
                      return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstTreinamento/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
          },
      ],
  
      });
      // $('#funcionario tbody').on( 'click', 'button', function () {
      //     var data = table.row( $(this).parents('tr') ).data();
      //     alert( data[0] +"'s salary is: "+ data[ 8 ] );
      // });
  
  $("#empresa_data").show();
  }
  })