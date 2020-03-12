$(function(){
	carregarDados();
	function carregarDados(){
	  var rows_selected = [];
	  var datatable = $('#ltcat_data').DataTable({
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
		  "url": BASE_URL + "/ajaxLtcat/lista",
		  "type": 'POST',
		  "data": function(d) {
			d.vlaction = "action";   
		  },
		  "dataSrc":""
		},
		"columns":[
		{data:"codltcat"},
		{data:"razaosocial"},  
		{data:"nomeamb"},   
		{data:"data_cad",
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
			{ data: "codltcat",
			"render": function (data, type, row, meta) { 
			 return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstLtcat/viewLtcat/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }
		   },    
		   { data: "codltcat",
		   "render": function (data, type, row, meta) { 
			 return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstLtcat/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
		   },
		   ],
  
		 });
  
	  $("#ltcat_data").show();
	}
  })

$(function(){
	$("#buscaEngenheiroModal").on('keyup', function(){
		var busca = $('#buscaEngenheiroModal').val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxLtcat/buscaEngenheiro',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#tbmodalEngenheiro tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Nome</th>";
				cols += "<th>Orgão</th>";
				cols += "<th>Numero</th>";
				newRow.append(cols);
				$("#tbmodalEngenheiro").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idresp+' name=codEngenheiro id=codEngenheiro></td>';
					cols += '<td>'+json[i].nomeresponsavel+'</td>';
					cols += '<td>'+json[i].identprofissional+'</td>';
					cols += '<td>'+json[i].numero+'</td>';
					newRow.append(cols);
					$("#tbmodalEngenheiro").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitEngenheiroModal").on('click', function(){
		
		var codEngenheiro = $("input[name='codEngenheiro']:checked").val();
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajaxLtcat/getEngenheiro',
			data:{codEngenheiro:codEngenheiro},
			success:function(json){
			
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#idresponsavelEngenheiro").val(json.idresp);
				$("#codresponsavelEngenheiro").val(json.codresp);
				$("#nmEngenheiroResp").val(json.nomeresponsavel);
				$("#nrInsOrgEngenheiro").val(json.numero);
				$("#ufDocEngenheiro").val(json.uf);
	
			}
		});
	});
});

