$(function(){
  carregarDados();
  function carregarDados(){
    var rows_selected = [];
    var datatable = $('#funcionario_data').DataTable({
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
        "url": BASE_URL + "/ajaxFuncionario/seachVisualizarFuncionarios",
        "type": 'POST',
        "data": function(d) {
          d.vlaction = "action";   
        },
        "dataSrc":""
      },
      "columns":[
      {data:"codfuncionario"}, 
      {data:"nomefuncionario"}, {data:"telcelular"}, {data:"funcao"}, 
      {data:"razaosocial"}, 

      {data:"datcad",
      "render": function (data, type, row, meta) { 
        function dateToEN(date){  
          return date.split('-').reverse().join('/');
        }; 
        return  dateToEN(data);
      },
    },
    {data:"situacao",
    "render": function (data, type, row, meta) { 
      if( data === 'D'){
        return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'Demitido'+'</a>';
      } else{
        return '<a class="btn btn-info btn-sm">' +'ATIVO'+ '</a>';
      }
    }
  },
  { data: "codfuncionario",
  "render": function (data, type, row, meta) { 
    return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstFuncionario/funcionarioEdit/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }
  },    
  { data: "codfuncionario",
  "render": function (data, type, row, meta) { 
    return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstFuncionario/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
  },
  ],
  
});
      // $('#funcionario tbody').on( 'click', 'button', function () {
      //     var data = table.row( $(this).parents('tr') ).data();
      //     alert( data[0] +"'s salary is: "+ data[ 8 ] );
      // });

      $("#funcionario_data").show();
    }
  })

$(document).ready(function(){
  $("input[name=cep_Funcionario]").on("blur", function () {
    let cep = $(this).val();
    //console.log("Saiu "+ cep);

    $.ajax({
      url:'http://api.postmon.com.br/v1/cep/'+cep,
      type:'GET',
      dataType:'json',
      success:function (json) {
        if(typeof json.logradouro != 'undefined'){
          $("input[name=endereco]").val(json.logradouro);
          $("input[name=bairro]").val(json.bairro);
                //console.log(json.bairro);
                //$("input[name=cidade]").val(json.cidade);
                //$("input[name=uf]").val(json.estado);
                //$("input[name=endereco]").val(json.logradouro)
              }
              $("input[name=numero]").focus();
            //console.log(json);

          }
        });
  })
})



$(document).ready(function(){
  $("#modalFuncaoEdit").on('keyup', function(){
    var mdbusca =  $("#mudanca_func option:selected").val();
    if(mdbusca == 2 && mdbusca > 1){
      let codfuncionario   = $("input[name='codigo']").val();
      let codsetor   			 = $("#codsetor").val();
      let nomsetor   			 = $("#nomeSetor").val();
      let codfuncao  			 = $("#codigoFuncao").val();
      let codcbo     			 = $("#codigocbo").val();
      let nomefuncao 			 = $("#funcnome").val();
      let dataini          		 = $("#dataIniFuncao").val();
      let datafim          	     = $("#dataFimFuncao").val();
      let codgfip                = $("#codgfip").val();
      var buscaemp   			 = $('#idEmpresaEvt').val();

      if(buscaemp !=''){
        $.ajax({
          url:BASE_URL + '/ajax/mudancaDeFuncao',
          type: 'POST',
          data:{buscaemp:buscaemp,codfuncionario:codfuncionario,codsetor:codsetor,nomsetor:nomsetor,codfuncao:codfuncao,codcbo:codcbo,nomefuncao:nomefuncao,dataini:dataini,datafim:datafim,codgfip:codgfip,mdbusca:mdbusca},
          success: function(json){
            if(json == 0 ){
              alert("Essa função ja existe, verifique!");
            }
          }
        }, false);
      }

      soma(buscaemp);
    }else if(mdbusca == 1 && mdbusca <= 1){
      var buscaemp = $('#idEmpresaEvt').val();
      soma(buscaemp);
    }

    function soma(buscaemp){
      $("#buscaMdFuncao").focus();
      var busca = $('#buscaMdFuncao').val();
      if(buscaemp != '' && busca!=''){

        $.ajax({
          type:'POST',
          url:BASE_URL+'/ajax/buscaFuncao', 
          data:{busca:busca, buscaemp:buscaemp},
          success:function(json){
            json = json.replace(/(\r\n|\n|\r)/gm,"");
            json = json.replace(/\t/,"");
            var json = JSON.parse(json);

            $("#tbmodalMdFuncao tr").remove();

            var newRow = $("<tr>");	
            var cols = "";
            cols += "<th></th>";
            cols += "<th>Setor</th>";
            cols += "<th>Cbo</th>";
            cols += "<th>Função</th>";
            //cols += "<th>Gfip</th>";
            newRow.append(cols);
            $("#tbmodalMdFuncao").append(newRow);

            for(var i = 0; i < json.length; i++) {
              var cols = "";
              var newRow = $("<tr>");	
              cols += '<td><input type=radio value='+json[i].codfuncao+' name=idfuncao id=idfuncao></td>';
              cols += '<td>'+json[i].nomesetor+'</td>';
              cols += '<td>'+json[i].codcbo+'</td>';
              cols += '<td>'+json[i].cargocbo+'</td>';
              //cols += '<td>'+json[i].codgfip+'</td>';
              newRow.append(cols);
              $("#tbmodalMdFuncao").append(newRow);
            }
          }
        });
      }else{
        $("#buscaMdFuncao").focus();
      }
    }
  });
});

$(function(){
	$("#submitMdFuncao").on('click', function(){
		
		var codfuncao= $("input[name='idfuncao']:checked").val();
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajax/getFuncao',
			data:{codfuncao:codfuncao},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);

				$("#codigoFuncao").val(json[0].codfuncao);
				$("#nomeSetor").val(json[0].nomesetor);
				$("#nomeempresa").val(json[0].nomeempresa);
				$("#funcnome").val(json[0].cargocbo);
				$("#codsetor").val(json[0].codsetor);
        		$("#dataIniFuncao").val(json[0].dataini);
        		$("#dataFimFuncao").val(json[0].datafim);
				//$("#cargocbo").val(json[0].cargocbo);
				$("#codigocbo").val(json[0].codcbo);
        		$("#codgfip").val(json[0].codgfip);
        		//$("#ghefuncao").val(json[0].ghe);
      }
    });
    $("#buscaMdFuncao").val('');
    $("#bodyMudancadeFuncao tr").remove();
  });
});

//BOOTGRID DA FUNÇÕES ANTIGAS, PEGO O CÓDIGO DA FUNÇÃO E SUAS DATAS
$(function() {

  $('#parceir_body').hide();

  $(document).ready(function(){
    $("#trocafuncao").bootgrid({
      templates:{search:''},
      navigation:0,
      cache: false,
      labels: {
        noResults: "Não existe Resultados",
        search: "pesquisa",
        infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
        responsiveTable: 'table-responsive'+ 'data-row-id'
      },    

      caseSensitive: false,    
      formatters: {
        "commands1": function(column, row) {
          return  "<button type=\"button\" class=\"btn btn-primary w-100 command-edit\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-edit fa-lg\"></span></button>"; 
        },
        "commands2": function(column, row) {
          return  "<button type=\"button\" class=\"btn btn-danger w-100 command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash fa-lg\"></span></button>"; 
        }
      }
    }).on("loaded.rs.jquery.bootgrid", function() {
      $(document).find(".command-edit").on("click", function(e) {
        e.preventDefault();
        let codFuncAtig = $(this).attr('data-row-id');

        $("#funcaoAntiga").modal('show');
        $('#btnfuncao').click(function(){

          let dataini = $("#dataini").val();
          let datafim = $("#datafim").val();
          //console.log(dataini, datafim,codFuncAtig);
          if(codFuncAtig !='' && dataini !='' && datafim !=''){
            $.ajax({
              url: BASE_URL + '/ajaxFuncionario/setAlteraDaraFuncao',
              type:'POST',
              data:{codFuncAtig:codFuncAtig, dataini:dataini, datafim:datafim },
              cache: false,
              async: false,
              datatype:'JSON',
              success: function(data){
                window.location.reload(true);
              }
            })
          }else{
            alert("Selecione um Valor");
          }   
        })
      });
      //DELETA A FUNÇÃO ANTIGA
      $(document).find(".command-delete").on("click", function(e) {
        e.preventDefault();
        let codFuncAtig = $(this).attr('data-row-id');
        $.ajax({
          url: BASE_URL + '/ajaxFuncionario/setAlteraDeleteFuncao',
          type:'POST',
          data:{codFuncAtig:codFuncAtig},
          cache: false,
          async: false,
          datatype:'JSON',
          success: function(data){
            window.location.reload(true);
          }
        })
      })
    })
  });
});


