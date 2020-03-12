/*-----------------------BUSCA TREINAMENTO----------------------------*/
$(function(){
	$("#buscaTreinamento").on('keyup', function(){
		
		var busca = $('#buscaTreinamento').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtTreiCap/buscarCodTreinamento',
			data:{busca:busca},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");			
				var json = JSON.parse(json);
				//console.log(json);		
				
				$("#tbmodalTreinamento tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>CÓDIGO</th>";
				cols += "<th>DESCRIÇÃO</th>";
				newRow.append(cols);
				$("#tbmodalTreinamento").append(newRow);
				
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idtreicap+' name=idtreicap id=idtreicap></td>';
					cols += '<td>'+json[i].codtreicap+'</td>';
					cols += '<td>'+json[i].desctreicap+'</td>';
					newRow.append(cols);
					$("#tbmodalTreinamento").append(newRow);
				}		
			}
		});
	});
});

/*-----------------------GETTREINAMENTO------------------------*/
$(function(){
	$("#submitTreinamento").on('click', function(){
		
		var idtreicap = $("input[name='idtreicap']:checked").val();
		//console.log(idacidtrab);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxEvtTreiCap/getCodTreinamento',
			data:{idtreicap:idtreicap},
			success:function(json){
				//console.log(json);
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
				//console.log(json);
				$("#codTreiCap").val(json[0].codtreicap);
				$("#obsTreiCap").val(json[0].desctreicap);				
			}
		});
	});
});

/*----------------MULTI DADOS DE PROFISSIONAL RESPONSÁVEL------------------------------*/
$(function(){
	$("#submitProfResponsavel").on('click', function(){
		var nmcpfProf  = $('#nmcpfProf').val();
		var nmnomeProf = $('#nmnomeProf').val();
		var nmtpProf   = $('#nmtpProf').val();
		var nmformProf = $('#nmformProf').val();
		var nmcodCBO   = $('#codcbo').val();
		var nmnacProf  = $('#nmnacProf').val();
		//VALIDAÇÃO MINISTRADO POR
		if (nmtpProf == '1') {
			nmtpProf = "1 - Profissional empregado do declarante";
			nmtpProfOk = '1';
		}else if(nmtpProf == '2'){
			nmtpProf = "2 - Profissional sem vínculo de emprego/estatutário com o declarante";
			nmtpProfOk = '2';
		}
		//VALIDAÇÃO NACIONALIDADE
		if (nmnacProf == '1') {
			nmnacProf = "1 - Brasileiro";
			nmnacProfOk = '1';
		}else if(nmnacProf == '2'){
			nmnacProf = "2 - Estrangeiro";
			nmnacProfOk = '2';
		} 
		//VALIDAÇÃO CAMPOS VZIOS
		if(nmnomeProf != '' && nmtpProf != '' && nmformProf != '' 
			&& nmcodCBO != '' && nmnacProf != ''){
			var count = 1;
		while(document.getElementById("nomeProf"+count) != null){

			count += 1;
		}

		var cols = "";
		var newRow = $("<tr>");	
		cols += "<td>"+nmcpfProf+"</td><input type=hidden value='"+nmcpfProf+"'name=cpfProf"+count+" id='cpfProf"+count+"'/>";
		cols += "<td>"+nmnomeProf+"</td><input type=hidden value='"+nmnomeProf+"' name=nomeProf"+count+" id='nomeProf"+count+"'/>";
		cols += "<td>"+nmtpProf+"</td><input type=hidden value='"+nmtpProfOk+"' name=tpProf"+count+" id='tpProf"+count+"'/>";		
		cols += "<td>"+nmformProf+"</td><input type=hidden value='"+nmformProf+"' name=formProf"+count+" id='formProf"+count+"'/>";
		cols += "<td>"+nmcodCBO+"</td><input type=hidden value='"+nmcodCBO+"' name=codCBO"+count+" id='codcbo"+count+"'/>";
		cols += "<td>"+nmnacProf+"</td><input type=hidden value='"+nmnacProfOk+"' name=nacProf"+count+" id='nacProf"+count+"'/>";			

		newRow.append(cols);
		$("#tabelaProfResponsavel").append(newRow);

		var rowCount = $('table#tabelaProfResponsavel tbody tr:last').index() + 1;
		$('#qtdProfResponsavel').val(rowCount);
		
		$('#nmcpfProf').val();
		$('#nmnomeProf').val();
		$('#nmtpProf').val();
		$('#nmformProf').val();
		$('#codcbo').val();
		$('#nmnacProf').val();

	}else{
		
		alert("NENHUM CAMPO PODE ESTAR VAZIO, POR FAVOR VERIFIQUE E TENTE NOVAMENTE!");
			//$("#nmcpfProf").focus();
		}
	});
});

$("#tabelaProfResponsavel").on('dblclick', 'tr',function(obj){
	let id = $(obj).attr('data-id');
	$(this).closest('tr').remove();
 		//console.log('executou');		
 		var rowCount = $('table#tabelaProfResponsavel tbody tr:last').index() + 1;
 		$('#qtdProfResponsavel').val(rowCount);

 	});