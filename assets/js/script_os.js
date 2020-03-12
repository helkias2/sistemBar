$(function(){
    carregarDados();
    function carregarDados(){
      var rows_selected = [];
      var datatable = $('#ordem').DataTable({
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
              "url": BASE_URL + "/ajaxOs/getListOs",
              "type": 'POST',
              "data": function(d) {
                d.vlaction = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"idos"}, 
        {data:"razaosocial"}, 
        {data:"nomefuncionario"},
        {data:"datacad",
        "render": function (data, type, row, meta) { 
          function dateToEN(date){  
            return date.split('-').reverse().join('/');
        }; 
        return  dateToEN(data);
    },
},
{ data: "idos", 
"render": function (data, type, row, meta) { 
    return '<button type="button" class="btn btn-primary btn-sm" id="botaoOs" data-row-id="' + data + '" data-id="' + row.statusos + '"><span class="fa fa-print fa-lg "> <span></button>';
}
},    
{ data: "idos",
"render": function (data, type, row, meta) { 
  return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstOS/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; 
}
},
],

});

      $("#ordem").show();
  }
})

$(document).ready(function() {
    $("#ordem").on('click', '#botaoOs', function(e) {
        e.preventDefault();
        let valor = $(this).attr('data-row-id')
        let status = $(this).attr('data-id')
        if(status == 'a'){
            var url = BASE_URL + "/sstOS/osGet/" + valor;
            window.open(url, "sstOS", "width=850,height=600");
        }else{
            var url = BASE_URL + "/sstPPP/pppGet/" + valor;
            window.open(url, "sstPPP", "width=850,height=600");    
        }
    })
})
