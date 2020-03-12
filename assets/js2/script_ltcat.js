$(function() {

    $('#emp_body').hide();
    
$("#ltcat_data").bootgrid({
    cache: false,
    labels: {
        noResults: "Não existe Resultados",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    caseSensitive: false,        
    })

});// JavaScript Document*/
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

