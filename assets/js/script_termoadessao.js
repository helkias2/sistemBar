// function rediricionar(){
// 	window.location.href = BASE_URL+'/sstFuncao';
// }
/*$("#termo").hide();

 $(document).ready(function(){
  var datatable = $('#termo').DataTable({
  	select: {
            style: 'multi'
        },
   "aaSorting": [[ 3, "asc" ]],
   "processing":true,
   "order":[],
   "language": {
            "lengthMenu": "Exibição _MENU_ Registros por página",
            "zeroRecords": "Nada encontrado - desculpe",
            "info": " Mostrando página _PAGE_ ate _PAGES_",
            "infoEmpty": "Nenhum registro disponível",
            "infoFiltered": "(filtrado de _MAX_ total linhas)",
            "search":         "Procurar:",
            "paginate": {
	        "first":      "Primeiro",
	        "last":       "Último",
	        "next":       "Próximo",
	        "previous":   "Anterior" },
        },
   "ajax":{
   		"url": BASE_URL + "/sstVerificaTermo/verificarTermo",
   		"dataSrc":""
   	},
   	"columns":[
   {data:"idtermoad"},
   {data:"razaosocial"},
   {data:"contato"},
   {data:"cpfcnpj"},
   {data:"telecelular"},
   {data:"datacadastrotm"},
   {
        data: "idtermoad",
        //"bSortable": false,
       "render": function (data, type, row, meta) { return '<a class="btn btn-info btn-sm" href="'+BASE_URL+'/sstVerificaTermo/verificarTermoPrint?cod=' + data + '">' + 'Visualizar' + '</a>'; }
    }
  	],

  });
$('#termo tbody').on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        alert( data[0] +"'s salary is: "+ data[ 5 ] );
    });
   	$("#termo").show();
  
})*/

// function rediricionar(){
// 	window.location.href = BASE_URL+'/sstFuncao';
// }
$("#termo").hide();

$(document).ready(function() {
    var datatable = $('#termo').DataTable({
        select: {
            style: 'multi'
        },
        "aaSorting": [
            [3, "asc"]
        ],
        "processing": true,
        "order": [],
        "language": {
            "lengthMenu": "Exibição _MENU_ Registros por página",
            "zeroRecords": "Nada encontrado - desculpe",
            "info": " Mostrando página _PAGE_ ate _PAGES_",
            "infoEmpty": "Nenhum registro disponível",
            "infoFiltered": "(filtrado de _MAX_ total linhas)",
            "search": "Procurar:",
            "paginate": {
                "first": "Primeiro",
                "last": "Último",
                "next": "Próximo",
                "previous": "Anterior"
            },
        },
        "ajax": {
            "url": BASE_URL + "/sstVerificaTermo/verificarTermo",
            "type": "POST",
            "data": function(d) {
                d.vlTermo = "action";
            },
            "dataSrc": ""
        },
        "columns": [
            { data: "idtermoad" },
            { data: "razaosocial" },
            { data: "contato" },
            { data: "cpfcnpj" },
            { data: "telecelular" },
            { data: "datacadastrotm" },
            {
                data: "idtermoad",
                "render": function(data, type, row, meta) {
                    return '<button type="button" class="btn btn-primary btn-sm" id="botaoTermo" data-row-id="' + data + '"><span class="fa fa-print fa-lg "> <span></button>';
                }
            },
            {
                data: "idtermoad",
                "render": function(data, type, row, meta) {
                    return '<a class="btn btn-danger btn-sm" href="' + BASE_URL + '/sstVerificaTermo/deleteTermo/' + data + '">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>';
                }
            },
        ],
    });
    $("#termo").show();
});
$(document).ready(function() {
    $("#termo").on('click', '#botaoTermo', function(e) {
        e.preventDefault();
        let valor = $(this).attr('data-row-id')
        var url = BASE_URL + "/sstVerificaTermo/verificarTermoPrint/" + valor;
        window.open(url, "sstVerificaTermo1", "width=850,height=500");
    })
})
