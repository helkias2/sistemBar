/*-----------------------BUSCA AMBIENTE----------------------------*/
$(function(){
	$("#buscaCodAmb").on('keyup', function(){
		var busca = $('#buscaCodAmb').val();
		var codempresa = $('#idEmpresaEvt').val();
		//console.log(busca);	
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtTabAmb/buscarCodAmb',
			data:{busca, codempresa:busca, codempresa},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				$("#tbmodalAmbiente tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>NOME</th>";
				cols += "<th>INSCRIÇÃO.</th>";
				cols += "<th>PRÓPRIO</th>";
				newRow.append(cols);
				$("#tbmodalAmbiente").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idamb+' name=idamb id=idamb></td>';
					cols += '<td>'+json[i].codamb+'</td>';
					cols += '<td>'+json[i].nomeestab+'</td>';
					cols += '<td>'+json[i].inscriestab+'</td>';
					cols += '<td>'+json[i].estabprop+'</td>';
					newRow.append(cols);
					$("#tbmodalAmbiente").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GET TABAMBIENTE------------------------*/
$(function(){
	$("#submitAmbiente").on('click', function(){
		
		var idamb = $("input[name='idamb']:checked").val();
		//console.log(idamb);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtTabAmb/getCodTabAmb',
			data:{idamb:idamb},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#codAmb").val(json[0].codamb);
				$("#nmAmb").val(json[0].nomeestab);
				$("#nrInsc").val(json[0].inscriestab);	
			}
		});
	});
});