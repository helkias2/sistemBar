/*----------------MULTI SUSPENSÃO DE EXIGIBILIDADE------------------------------*/

$(function() {

    // $('#emp_body').hide();
    
$("#evt1070_data").bootgrid({
    cache: false,
    labels: {
        noResults: "Não existe Resultados",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
    },    
    caseSensitive: false,        
    })

});
$(function(){
	$("#submitInfosusps").on('click', function(){
		var codIndSusp     = $('#codIndSusp').val();
		var indcatSusp     = $('#indcatSusp').val();
		var dataDecisao    = $('#dataDecisao').val();
		var indcatDeposito = $('#indcatDeposito').val();

		//VALIDAÇÃO CAMPOS INDICATIVOS DE SUSPENSÃO
		if (indcatSusp == '01') {
			indcatSusp = "01 - Liminar em Mandado de Segurança";
			indcatSuspok = '01';
		}else if (indcatSusp == '02') {
			indcatSusp = "02 - Depósito Judicial do Montante Integral";
			indcatSuspok = '02';
		}else if (indcatSusp == '03') {
			indcatSusp = "03 - Liminar em mandado de segurança";
			indcatSuspok = '03';
		}else if (indcatSusp == '04') {
			indcatSusp = "04 - Antecipação de Tutela";
			indcatSuspok = '04'
		}else if (indcatSusp == '05') {
			indcatSusp = "05 - Liminar em Medida Cautelar";
			indcatSuspok = '05'
		}else if (indcatSusp == '08') {
			indcatSusp = "08 - Sentença em Mandado de Segurança Favorável ao Contribuinte";
			indcatSuspok = '06'
		}else if (indcatSusp == '09') {
			indcatSusp = "09 - Sentença em Ação Ordinária Favorável ao Contribuinte e Confirmada pelo TRF";
			indcatSuspok = '09'
		}else if (indcatSusp == '10') {
			indcatSusp = "10 - Acórdão do TRF Favorável ao Contribuinte";
			indcatSuspok = '10'
		}else if (indcatSusp == '11') {
			indcatSusp = "11 - Acórdão do STJ em Recurso Especial Favorável ao Contribuinte";
			indcatSuspok = '11'
		}else if (indcatSusp == '12') {
			indcatSusp = "12 - Acórdão do STF em Recurso Extraordinário Favorável ao Contribuinte";
			indcatSuspok = '12'
		}else if (indcatSusp == '13') {
			indcatSusp = "13 - Sentença 1ª instância não transitada em julgado com efeito suspensivo";
			indcatSuspok = '13'
		}else if (indcatSusp == '14'){
			indcatSusp = "14 - Contestação Administrativa FAP";
			indcatSuspok = '14';
		}else if (indcatSusp == '90'){	
			indcatSusp = "90 - Decisão Definitiva a favor do contribuinte";
			indcatSuspok = '90';
		}else if (indcatSusp == '92'){
			indcatSusp = "92 - Sem suspensão da exigibilidade";
			indcatSuspok = '92';
		}
		//VALIDAR DATADECISAO BR
		function databr(dataDecisao){
			return dataDecisao.split('-').reverse().join('/');
		}
		//VALIDAR RETORNO INDICATIVO DE DEPÓSITO
		if (indcatDeposito == 'S') {
			indcatDeposito = 'SIM';
			indcatDepositoOk = 'S';
		}else{
			indcatDeposito = 'NÃO';
			indcatDepositoOk = 'N';
		}

		if(codIndSusp != '' && codIndSusp != null && indcatSusp != '' 
			&& dataDecisao != '' && indcatDeposito != ''){
			var count = 1;
		while(document.getElementById("codSusp"+count) != null){

			count += 1;
		}

		var cols = "";
		var newRow = $("<tr>");	
		cols += "<td>"+codIndSusp+"</td><input type=hidden value='"+codIndSusp+"'name=codSusp"+count+" id='codSusp"+count+"'/>";
		cols += "<td>"+indcatSusp+"</td><input type=hidden value='"+indcatSuspok+"' name=indSusp"+count+" id='indSusp"+count+"'/>";
		cols += "<td>"+databr(dataDecisao)+"</td><input type=hidden value='"+dataDecisao+"' name=dtDecisao"+count+" id='dtDecisao"+count+"'/>";		
		cols += "<td>"+indcatDeposito+"</td><input type=hidden value='"+indcatDepositoOk+"' name=indDeposito"+count+" id='indDeposito"+count+"'/>";			

			//<input type=hidden name=ExcluirAtestadoEvt/>
			newRow.append(cols);
			$("#tabelaInfosusp").append(newRow);

			var rowCount = $('table#tabelaInfosusp tbody tr:last').index() + 1;
			$('#qtdIntensInfosusp').val(rowCount);
			
			$('#codSusp').val();
			$('#indcatSusp').val();
			$('#dtDecisao').val();
			$('#indDeposito').val();

		}else{
			alert("NENHUM DOS CAMPO DADOS SUSPENSÃO DE EXIGIBILIDADE DE TRIBUTOS PODEM ESTAR VAZIO!");
			$("#codSusp").focus();
		}
	});
});

$("#tabelaInfosusp").on('dblclick', 'tr',function(obj){
	let id = $(obj).attr('data-id');
	$(this).closest('tr').remove();
 		//console.log('executou');		
 		var rowCount = $('table#tabelaInfosusp tbody tr:last').index() + 1;
 		$('#qtdIntensInfosusp').val(rowCount);

 	});