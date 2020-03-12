$(function(){
    carregarDados();
    function carregarDados(){
      var datatable = $('#ppra_data').DataTable({
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
              "url": BASE_URL + "/ajaxPpra/listPpra",
              "type": 'POST',
              "data": function(d) {
                d.vlactionPPRA = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"codppra"}, 
        {data:"razaosocial"}, 
        {data:"nomeamb"},
        {data:"data_inicio",
            "render": function (data, type, row, meta) { 
              function dateToEN(date){  
                return date.split('-').reverse().join('/');
              }; 
              return  dateToEN(data);
            },
        },

        {data:"data_fim",
            "render": function (data, type, row, meta) { 
              function dateToEN(date){  
                return date.split('-').reverse().join('/');
              }; 
              return  dateToEN(data);
            },
            
        },
        
        { data: "codppra", 
        "render": function (data, type, row, meta) { 
            return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstPPRA/viewPPRA/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }

        },    
        { data: "codppra",
        "render": function (data, type, row, meta) { 
          return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstPPRA/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
      },

      ],

  });

      $("#ppra_data").show();
  }
})



//------------------------Buscar Empresa------------------------------//
$(document).ready(function(){
   $("#modalppraemp").on('keyup',function(){
       var valmatemp = $("#buscappraemp").val();
       if(valmatemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxPpra/searchPpraEmpresa',
            type: "POST",
            data: {valmatemp: valmatemp},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr"> <td id="codMatEmp">'+json[i].codempresa+'</td> <td id="descMatEmp">'+json[i].razaosocial+'</td><td id="nisMatEmp">'+json[i].nrmatricula+'</td></tr>';
                }
                $('#bodymodalppra').html(html);
                $('#bodymodalppra').show();
            }             
        })
        return false;
    } 
});
$("input[name=modalppraemp]").keyup(function(){ //pega o css da tabela     
    var tabela = $(this).attr('alt');
    if( $(this).val() != ""){
        $("."+tabela+" tbody>tr").hide();
        $("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
    } else{
        $("."+tabela+" tbody>tr").show();
    }
}); 
var val = "";
$.extend($.expr[":"], {
    "contains-ci": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});
pegarvlores();
function pegarvlores(){ 
  $("#bodymodalppra").on('click', 'tr', function (e) {
      e.preventDefault();
      $(this).toggleClass('ativo');
      $(this).siblings().removeClass('ativo');

	    	// var valcod = $(" #tiporisco_aso option:selected").text();
	    	var cmtemp = $(this).find('td[id=codMatEmp]').text();
	    	var dmtemp = $(this).find('td[id=descMatEmp]').text();
	    	var nismtemp = $(this).find('td[id=nisMatEmp]').text();
	    	jsonaso = {'codmtEmp':cmtemp, 'dmtEmp':dmtemp, 'nismtEmp':nismtemp};
	    	pegarvlaso(jsonaso);
      });
}
function pegarvlaso(jsonaso){ 	
  $("#enviappraempr").on('click', function (e) {
      e.preventDefault();	 	
      if( jsonaso != ''){	
        $("#getcodppraemp").val(jsonaso.codmtEmp);
        $("#getnomppraemp").val(jsonaso.dmtEmp);
        $("#cnpjMatEmpresa").val(jsonaso.nismtEmp);
    }
    $("#bodymodalppra tr").remove();
});
  return false;
}
$("#enviappraempr").on('click', function(){
  $("#bodymodalppra tr").remove();
});
$("#fechappraempr").on('click', function(){
  $("#bodymodalppra tr").remove();
});
});


//------------------------Buscar Funcionario------------------------------//
$(document).ready(function(){
    $("#modalpprafunc").on('blur',function(){
       var codemp = $("#getcodppraemp").val();
       if(codemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxPpra/searchPpraFuncionario',
            type: "POST",
            data: {codemp: codemp},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr"> <td id="codMatFunc">'+json[i].codfuncionario+'</td> <td id="descMatFunc">'+json[i].nomefuncionario	+'</td><td id="nisMatFunc">'+json[i].cpf+'</td></tr>';
                }
                $('#bobymodalpprafunc').html(html);
                $('#bobymodalpprafunc').show();  
            }               
        })
    }
    return false;  
});
$("input[name=tabelamodalpprafunc]").keyup(function(){ //pega o css da tabela     
    var tabela = $(this).attr('alt');
    if( $(this).val() != ""){
        $("."+tabela+" tbody>tr").hide();
        $("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
    } else{
        $("."+tabela+" tbody>tr").show();
    }
}); 
var val = "";
$.extend($.expr[":"], {
    "contains-ci": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});
pegarvlores();
function pegarvlores(){ 
  $("#bobymodalpprafunc").on('click', 'tr', function (e) {
      e.preventDefault();
      $(this).toggleClass('ativo');
      $(this).siblings().removeClass('ativo');

	    	// var valcod = $(" #tiporisco_aso option:selected").text();
	    	var cmtfunc = $(this).find('td[id=codMatFunc]').text();
	    	var dmtfunc = $(this).find('td[id=descMatFunc]').text();
	    	var nismtfunc = $(this).find('td[id=nisMatFunc]').text();
	    	jsonaso = {'codmtFunc':cmtfunc, 'dmtFunc':dmtfunc, 'nismtFunc':nismtfunc};
	    	pegarvlaso(jsonaso);
      });
}
function pegarvlaso(jsonaso){ 	
  $("#enviapprafunc").on('click', function (e) {
      e.preventDefault();	 	
      if( jsonaso != ''){	
        $("#getcodpprafunc").val(jsonaso.codmtFunc);
        $("#getnompprafunc").val(jsonaso.dmtFunc);
        $("#cpfMatEmpresa").val(jsonaso.nismtFunc);
    }else{
        alert("Digite Novamente");
    };
    $("#bobymodalpprafunc tr").remove();
});
  return false;
}
$("#enviapprafunc").on('click', function(){
  $("#bobymodalpprafunc tr").remove();
});
$("#fechapprafunc").on('click', function(){
  $("#bobymodalpprafunc tr").remove();
});
})

// function openPopup(obj) {
// 	var data = $(obj).serialize();

// 	var url = BASE_URL+"/report/inventory_pdf?"+data;
// 	window.open(url, "report", "width=700,height=500");

// 	return false;
// }