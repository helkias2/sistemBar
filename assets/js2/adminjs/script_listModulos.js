

$(function(){
	carregarDados();
	function carregarDados(){
		  var datatable = $('#listModulos_data').DataTable({
		  select: {
			  style: 'multi'
		  },
		 "aaSorting": [[0, "asc" ]],
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
			  "url": BASE_URL + "/ajaxModulo/listModulo",
			  "type": 'POST',
				"data": function(d) {
					d.vlaction = "action";   
				},
              "dataSrc":""
          },
          
		  "columns":[
            
            { data: "nome_grupos" }, 
              {data:"datacad_admin",
				"render": function (data, type, row, meta) { 
				  function dateToEN(date){
                    dataSplite = date.split(' ');
					return dataSplite[0].split('-').reverse().join('/')+" "+dataSplite[1];
				  }; 
				  return  dateToEN(data);
				},
               },
               { data: "id_grupos",
				  "render": function (data, type, row, meta) { 
						  return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/adminModulos/editGrupo/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }
                },    
                
		],	  
	});	
	  $("#listModulos_data").show();
    }
    
})