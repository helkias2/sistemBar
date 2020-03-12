function rediricionarSetor(){
    window.location.href = BASE_URL+'/sstSetor';
}

$(function(){
    carregarDados();
  function carregarDados(){
      var datatable = $('#setor_data').DataTable({
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
          "url": BASE_URL + "/ajaxSetor/seachVisualizarSetor",
          "type": 'POST',
            "data": function(d) {
                d.vlaction = "action";   
            },
          "dataSrc":""
      },
      "columns":[
          {data:"codsetor"}, 
          {data:"razaosocial"}, {data:"gpanalitcsetor"},{data:"setordesenvolvido"},
  
          {data:"datacad",
            "render": function (data, type, row, meta) { 
              function dateToEN(date){  
                return date.split('-').reverse().join('/');
              }; 
              return  dateToEN(data);
            },
        },
        //   {data:"situacao",
        //        "render": function (data, type, row, meta) { 
        //           if( data === ''){
        //             return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'Demitido'+'</a>';
        //           } else{
        //             return '<a class="btn btn-info btn-sm">' +'ATIVO'+ '</a>';
        //           }
        //       }
        //   },
          { data: "codsetor",
              "render": function (data, type, row, meta) { 
                      return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstSetor/setorEdit/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }
          },    
          { data: "codsetor",
              "render": function (data, type, row, meta) { 
                      return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstSetor/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
          },
      ],
  
      });

    $("#setor_data").show();
    }
  })

//-------------------------Busca Empresa ------------------------------//
$(document).ready(function(){
 $("#modalEmpresaSetor").on('keyup',function(){
    var valmatemp = $("#buscaSetor_Emp").val();
    if(valmatemp != ''){
        $.ajax({
            url: BASE_URL+'/ajaxSetor/buscaSetorEmpresa',
            type: "POST",
            data: {busca: valmatemp},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr"> <td id="codSTEmp">'+json[i].codempresa+'</td> <td id="razaoSTEmp">'+json[i].razaosocial+'</td><td id="nisSTEmp">'+json[i].nrmatricula+'</td></tr>';
                }
            $('#bodySetorModal').html(html);
            $('#bodySetorModal').show();
            
            }
        })
    return false;
    } 
 });

$("input[name=tabelamodalSetor]").keyup(function(){ //pega o css da tabela     
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
        $("#bodySetorModal").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            var valcod = $(" #tiporisco_aso option:selected").text();
            var cdstemp = $(this).find('td[id=codSTEmp]').text();
            var rzstemp = $(this).find('td[id=razaoSTEmp]').text();
            var nistemp = $(this).find('td[id=nisSTEmp]').text();
            jsonsetor = {
                'codstempresa':cdstemp, 
                'dzstempresa':rzstemp,
                'nisstempresa':nistemp};
            
            pegarvlaso(jsonsetor);
        });
    }
   function pegarvlaso(jsonsetor){    
        $("#enviaSetor").on('click', function (e) {
            e.preventDefault();     
            if(jsonsetor != ''){ 
                $("#idEmpresaSetor").val(jsonsetor.codstempresa);
                $("#razsocialSetor").val(jsonsetor.dzstempresa);
               // $("#cnpjMatEmpresa").val(jsonaso.nisstempresa);
            }
        $("#bodySetorModal tr").remove();
        });
    return false;
    }
    $("#enviaSetor").on('click', function(){
        $("#bodySetorModal tr").remove();
    });
    $("#fechaSetor").on('click', function(){
        $("#bodySetorModal tr").remove();
    });
});


$(document).ready(function(){
    var count = 0; 
    $('#btnDepartamento').on('click', function(e){
        e.preventDefault();
        let codEmpresaSetor    = $("input[name=codempresa]").val();
        let selectGrupoSetor   = $("#setorAnalitico option:selected").val();
        let nomDesenvolvimento = $("input[name=SetorDesenvolvido]").val();
        let datInicio          = $("input[name=datasetinicio]").val();
		let localTrab          = $("#empresasetorlocal").val();
        let datFinal           = $("input[name=datasetfim]").val();
        let obsDepartement     = $("#descricaosetor").val();
      //  let jsonInfo = {'desenvoldpto':nomDesenvolvimento, 'dtinicio':datInicio, 'dtfim':datFinal, 'obsdpto':obsDepartemento} 

        
       // if(codEmpresaSetor !='' && selectGrupoSetor != '' && selectGrupoSetor != 0 && nomDesenvolvimento != '' && datInicio != ''){
			if(codEmpresaSetor =='' && codEmpresaSetor.trim() =='' && localTrab =='' && localTrab.trim() =='' && selectGrupoSetor =='' && selectGrupoSetor == 0 && selectGrupoSetor.trim() =='' && nomDesenvolvimento == '' && nomDesenvolvimento.trim() =='' && datInicio == '' && datInicio.trim() =='' && obsDepartement.trim() ==''){
            
        alert('Informe um filtro de pesquisa.');
        return false;
        }
        
        if (!codEmpresaSetor) {
            alert('Informe uma empresa cadastrada.');
            return false;
        }
        if (!localTrab) {
            alert('Informe um Local de Trabalho válido.');
            return false;
        }

        if (!selectGrupoSetor) {
            alert('Informe um Grupo de Setor válido.');
            return false;
        }
        if (!nomDesenvolvimento) {
            alert('Informe um Setor ou Departamento válida.');
            return false;
        }
        if (!datInicio) {
            alert('Informe uma data inicial válida.');
            return false;
        }else{

			var html = ''; 
            var count = 1;
            while(document.getElementById("codemp_st"+count) != null){
                count += 1;
            }
                var html =
                    "<tr>"+
                    "<td>"+codEmpresaSetor+"</td>"+"<input type=hidden value = '"+codEmpresaSetor+"' name=codempst"+count+" id=codemp_st"+count+">"+
                    "<td>"+selectGrupoSetor+"</td>"+"<input type=hidden value = '" +selectGrupoSetor+ "' name=grupoSetor"+count+" id=grupo_st"+count+">"+
                    "<td>"+nomDesenvolvimento+"</td>"+"<input type=hidden value = '" +nomDesenvolvimento+ "' name=nmdesenvst"+count+" id=nmdesenv_st"+count+">"+
                    "<td>"+obsDepartement+"</td>"+"<input type=hidden value = '" + obsDepartement +"' name=obsdptost"+count+" id=obsdpto_st "+count+">"+
                    "<td>"+datInicio+"</td>"+"<input type=hidden value ='"+datInicio+"' name=datiniciost" +count+" id=datinicio_st"+count+">"+
                    //"<input type=hidden value = '" +datFinal+"' name=datfimst "+count+" id=datfim_st "+count+">"+
                    "<td><a href=javascript:; onclick= '" + excluirProd(this) +"'>Excluir</a></td>"+
                    "</tr>";

            $('#tabelaSetorDepartamento').append(html);
              
            limparCampos();
        }
    })
    function limparCampos(){
        $("#Setor_Desenvolvido").val('');
        $("#dataset_inicio").val('');
        $("#dataset_fim").val('');
        $("#descricaosetor").val('');
    };

    $("#btnLimpar").on('click', function(){
        $("#tabelaSetorDepartamento tr").remove();
            let id = $(obj).attr('data-id');
            $(this).closest('td').remove();
    });

    function excluirProd(obj){
        $("#tabelaSetorDepartamento").on('click', 'tr',function(obj){
            let id = $(obj).attr('data-id');
            $(this).closest('tr').remove();
        });
    }
});
/*------------------------Busca Ambiente da Empresa------------------------------------*/
$(function(){
	$("#buscaAmbEmpresa").on('keyup', function(){
		//console.log('teste');
		
		var codEmpresa = $('#idEmpresaSetor').val();
		var busca = $('#buscaAmbEmpresa').val();
		
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxSetor/buscaAmbiente',
			data:{busca, codEmpresa:busca , codEmpresa},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
		
				console.log(json);
				$("#tbAmbienteModal tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Codigo</th>";
				cols += "<th>Ambiente</th>";
				cols += "<th>Empresa</th>";
				newRow.append(cols);
				$("#tbAmbienteModal").append(newRow);
			
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idamb+' name=idAmb id=idAmb></td>';
					cols += '<td>'+json[i].codamb+'</td>';
					cols += '<td>'+json[i].nomeestab+'</td>';
					cols += '<td>'+json[i].razaosocial  +'</td>';
					newRow.append(cols);
					$("#tbAmbienteModal").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitAmbEmpresa").on('click', function(){

		var idamb = $("input[name='idAmb']:checked").val();
//		console.log(codmtvafast);
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajaxSetor/getAmbEmpresa',
			data:{idamb:idamb},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#codAmbEmpresa").val(json.codamb);
				if(json.estabprop == 'S'){
					$("#proprietarioAmb").val("Próprio");
				}else{
					$("#proprietarioAmb").val("Terceiro");
				}
				$("#nomeAmb").val(json.nomeestab);
			}
		});
	});
});

/*------------------------Busca Ambiente da Empresa------------------------------------*/
$(function(){
	$("#buscaAmbEmpresaPPRA").on('keyup', function(){
		//console.log('teste');
		
		var codEmpresa = $('#idEmpresaEvt').val();
		var busca = $('#buscaAmbEmpresaPPRA').val();
		console.log(codEmpresa);
		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxSetor/buscaAmbiente',
			data:{busca, codEmpresa:busca , codEmpresa},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				//console.log(msg);
				var json = JSON.parse(json);
		
				console.log(json);
				$("#tbAmbienteModal tr").remove();
				
				var newRow = $("<tr>");	
				var cols = "";
				cols += "<th></th>";
				cols += "<th>Codigo</th>";
				cols += "<th>Ambiente</th>";
				cols += "<th>Empresa</th>";
				newRow.append(cols);
				$("#tbAmbienteModal").append(newRow);
			
				for(var i = 0; i < json.length; i++) {
					var cols = "";
					var newRow = $("<tr>");	
					cols += '<td><input type=radio value='+json[i].idamb+' name=idAmb id=idAmb></td>';
					cols += '<td>'+json[i].codamb+'</td>';
					cols += '<td>'+json[i].nomeestab+'</td>';
					cols += '<td>'+json[i].razaosocial  +'</td>';
					newRow.append(cols);
					$("#tbAmbienteModal").append(newRow);
				}
	
			}
		});
	});
});

$(function(){
	$("#submitAmbEmpresaPPRA").on('click', function(){

		var idamb = $("input[name='idAmb']:checked").val();
//		console.log(codmtvafast);
		$.ajax({
		
			type:'POST',
			url:BASE_URL+'/ajaxSetor/getAmbEmpresa',
			data:{idamb:idamb},
			success:function(json){
				json = json.replace(/(\r\n|\n|\r)/gm,"");
				json = json.replace(/\t/,"");
				var json = JSON.parse(json);
				
				$("#codAmbEmpresa").val(json.codamb);
				if(json.estabprop == 'S'){
					$("#proprietarioAmb").val("Próprio");
				}else{
					$("#proprietarioAmb").val("Terceiro");
				}
				$("#nomeAmb").val(json.nomeestab);
			}
		});
	});
});



// $(function(){
//     $("#excluirTabelaMultFuncionario").on('click', function(){
//         $("#tabelaMultFuncionario td").remove();
//         var count = 1;
//             while(document.getElementById("codfuncionario"+count) != null){
//                 $("#codfuncionario"+count).remove();
//                 $("#nomefuncionario"+count).remove();
//                 $("#cpf"+count).remove();
//                 $("#codsetor"+count).remove();
//                 $("#codsetor"+count).remove();
//                 $("#nomesetor"+count).remove();
//                 $("#codcbo"+count).remove();
//                 $("#funcao"+count).remove();
//                 count += 1;
//             }
//     });
// });
//---------------- Load Tabela ---------------------------------//
// $(document).ready(function(){
//     carrgarDadosSetor();
//     function carrgarDadosSetor(){
//         var load = "dados";
//         $.ajax({
//             url: BASE_URL+'/ajaxSetor/getsetorlist',
//             method: 'POST',
//             data:{load:load},
//             success: function(data){
//                 $('#resultSetor').html(data); 
//             }
//         })    
//     }
//     $('#btnincluirsetor').on('click', function(e){
//         e.preventDefault();
//         let codempresasetor     = $('#idEmpresaSetor').val();
//         let razaoempresasetor   = $('#razsocialSetor').val();
//         let selectgrupo         = $('#setorAnalitico option:selected').val();
//         let nomesetorlocal      = $('#empresasetorlocal').val();
//         if(codempresasetor != '' && razaoempresasetor != ''  && nomesetorlocal != '' && selectgrupo != ''){
//             $.ajax({
//                 url: BASE_URL+'/ajaxSetor/setsetoradd',
//                 type:'POST',
//                 dataType: 'json',
//                 data: {codempresasetor:codempresasetor, razaoempresasetor:razaoempresasetor, nomesetorlocal:nomesetorlocal, selectgrupo:selectgrupo},
//                 success: function(data) {      
//                    carrgarDadosSetor();
//                 },
//             });
//             alert("Cadastro com success!");
//             window.location.href = BASE_URL+'/sstSetor/setorAdd';
//         }else{
//         alert("Ambos os campos são obrigatórios");
//         }
//     })
//     $(document).on('click', '.delete', function(){
//         let codigosetor   = $('td[id=idSetor]').text();
//         let codigoempresa    = $('td[id=idEmpre]').text();
//         if(codigosetor != '' && codigoempresa != ''){
//             if(confirm("Are you sure you want to remove this data?")) { //Confim Box if OK then
//                 var action = "Delete"; //Define action variable value Delete
//                     $.ajax({
//                     url: BASE_URL + "/ajaxSetor/setordelete",    //Request send to "action.php page"
//                     method:"POST",     //Using of Post method for send data
//                     data:{action:action, codigosetor:codigosetor, codigoempresa:codigoempresa }, //Data send to server from ajax method
//                     success:function(data){
//                    // console.log(data);
//                        carrgarDadosSetor();
//                        // alert(data);    //It will pop up which data it was received from server side
//                         }
//                     })
//             }else{
//             return false; //No action will perform
//             }
//         }
//     });
// })


//---------------------------------Inserir dados ---------------------------//
// $(document).ready(function(){
//     carrgarDados();
//     function carrgarDados(){
//         var load = "dados";
//       //  let codempresasetor     = $('#idEmpresaSetor').val();
//         $.ajax({
//             url: BASE_URL+'/ajaxSetor/settabela',
//             method: 'POST',
//             data:{load:load},
//             success: function(data){
//                 $('#resultados').html(data); 
//             }
//         })    
//     }
//     $('#btnDepartamento').on('click', function(e){
//         e.preventDefault();
//         let idcodempresasetor   = $('td[id=idSetor]').text();
//         let selectgruposetor    = $('td[id=idGrupo]').text();
//         let cdempresasetor      = $('td[id=idEmpre]').text();
//         let descDesenvolvido    = $('#Setor_Desenvolvido').val();
//         let datasetorinicio     = $('#dataset_inicio').val();
//         let datasetorfim        = $('#dataset_fim').val();
//         let descricaosetor      = $('#descricaosetor').val();
//         if(idcodempresasetor != '' && cdempresasetor != ''  && descDesenvolvido != ''){
//             $.ajax({
//                 url: BASE_URL+'/ajaxSetor/departamentoadd',
//                 type:'POST',
//                 dataType: 'json',
//                 data: {idcodempresasetor:idcodempresasetor, selectgruposetor:selectgruposetor, cdempresasetor:cdempresasetor, descDesenvolvido:descDesenvolvido, datasetorinicio:datasetorinicio, datasetorfim:datasetorfim, descricaosetor:descricaosetor},
//                 success: function(data) {      
//                     alert(data);
//                     carrgarDados();
//                 },
//             });
//             confirm('Confirma Cadastrar de Departamento?');
//         }else{
//             alert("Ambos os campos são obrigatórios");
//         }
//  });

// $(document).on('click', '.delete', function(){
//       var id = $(this).attr("id"); //This code will fetch any customer id from attribute id with help of attr() JQuery method
//       if(confirm("Are you sure you want to remove this data?")) //Confim Box if OK then
//       {
//        var action = "Delete"; //Define action variable value Delete
//        $.ajax({
//         url:"action.php",    //Request send to "action.php page"
//         method:"POST",     //Using of Post method for send data
//         data:{id:id, action:action}, //Data send to server from ajax method
//         success:function(data)
//         {
//          carrgarDados();
//     // fetchUser() function has been called and it will load data under divison tag with id result
//          alert(data);    //It will pop up which data it was received from server side
//         }
//        })
//       }
//       else  //Confim Box if cancel then 
//       {
//        return false; //No action will perform
//       }
//      });
//});


 
 // $(document).on('click', '.delete', function(){
 //  var id = $(this).attr("id"); //This code will fetch any customer id from attribute id with help of attr() JQuery method
 //  if(confirm("Are you sure you want to remove this data?")) //Confim Box if OK then
 //  {
 //   var action = "Delete"; //Define action variable value Delete
 //   $.ajax({
 //    url:"action.php",    //Request send to "action.php page"
 //    method:"POST",     //Using of Post method for send data
 //    data:{id:id, action:action}, //Data send to server from ajax method
 //    success:function(data)
 //    {
 //     fetchUser();    // fetchUser() function has been called and it will load data under divison tag with id result
 //     alert(data);    //It will pop up which data it was received from server side
 //    }
 //   })
 //  }
 //  else  //Confim Box if cancel then 
 //  {
 //   return false; //No action will perform
 //  }
 // });



// $(document).on('click', '.update', function(){
//     var id = $(this).attr("id"); //This code will fetch any customer id from attribute id with help of attr() JQuery method
//     var action = "Select";   //We have define action variable value is equal to select
//     $.ajax({
//         url:"action.php",   //Request send to "action.php page"
//         method:"POST",    //Using of Post method for send data
//         data:{id:id, action:action},//Send data to server
//         dataType:"json",   //Here we have define json data type, so server will send data in json format.
//         success:function(data){     
//             //$('#customerModal').modal('show');   //It will display modal on webpage
//            // $('.modal-title').text("Update Records"); //This code will change this class text to Update records
//             $('#action').val("Update");     //This code will change Button value to Update
//             $('#customer_id').val(id);     //It will define value of id variable to this customer id hidden field
//             $('#first_name').val(data.first_name);  //It will assign value to modal first name texbox
//             $('#last_name').val(data.last_name);  //It will assign value of modal last name textbox
//         }
//     });
// });


// debugger
// //---------------- Load Tabela ---------------------------------//
// $(document).ready(function(){
//     loaddpto();

//     function loaddpto(){
//         var carrgar = "Load";
//         $.ajax({
//             url: BASE_URL+'/ajaxSetor/gerartabela',
//             method: 'POST',
//             data:{carrgar:carrgar},
//             success: function(data){
//                 $('#result').html(data); 
//             }
//         })    
//     }

    //---------------------------------Inserir dados ---------------------------//
 //    $('#Inserirdpto').on('click', function(e){
 //        e.preventDefault();
        
 //        let idempresasetor      = $('#idEmpresaEvt').val();
 //        let razaoempresasetor   = $('#razsocialEvt').val();
 //        let setoranalitico      = $('#setor_analitico option:selected').val();
 //        let setordesenvold      = $('#st_desenvold').val();
 //        let empresalocal        = $('#empresalocal').val();
 //        let descricaosetor      = $('#descricaosetor').val();
 //        let datainicio          = $('#st_dtinic').val();
 //        let datafinal           = $('#dat_final').val();
        
 //        if(idempresasetor != '' && razaoempresasetor != ''  && setoranalitico != '' && setordesenvold != ''  || empresalocal != ''  || descricaosetor != ''  || datainicio != '' || datafinal != ''){

 //            $.ajax({
 //                url: BASE_URL+'/ajaxSetor/departamentoadd',
 //                type:'POST',
 //                dataType: 'json',
 //                data: {idempresasetor:idempresasetor, razaoempresasetor:razaoempresasetor, setoranalitico:setoranalitico, setordesenvold:setordesenvold,empresalocal:empresalocal, descricaosetor:descricaosetor, datainicio:datainicio,datafinal:datafinal},
 //                success: function(data) {      
 //                    alert(data);
 //                    loaddpto();
 //                },
 //            });
 //        }else{
 //            alert("Ambos os campos são obrigatórios");
 //        }
 //    // $('#customerModal').modal('show'); //It will load modal on web page
 //    // $('#first_name').val(''); //This will clear Modal first name textbox
 //    // $('#last_name').val(''); //This will clear Modal last name textbox
 //    // $('.modal-title').text("Create New Records"); //It will change Modal title to Create new Records
 //   // $('#action').val('Create'); //This will reset Button value ot Create

 // });

//})


// //-------------- BUSCA EMPRESA -----------------------//
// $(document).ready(function(){
//     $("#buscaRisco").on('keyup', function(){
//         var busca = $('#buscaRisco').val();
//         $.ajax({
//             type:'POST',
//             url:BASE_URL+'/ajaxSetor/buscaRisco',
//             data:{busca:busca},
//             success:function(json){
//                 json = json.replace(/(\r\n|\n|\r)/gm,"");
//                 json = json.replace(/\t/,"");
                
//                 var json = JSON.parse(json);
//                 $("#modalRisco tr").remove();
                
//                 var newRow = $("<tr>"); 
//                 var cols = "";
//                 cols += "<th>Id</th>";
//                 cols += "<th>codigo</th>";
//                 cols += "<th>Cod. Cbo</th>";
//                 cols += "<th>Descrição</th>";
//                 cols += "<th>Grupo de Risco</th>";
//                 cols += "<th>Cód. Risco</th>";

                
//                 newRow.append(cols);
//                 $("#modalRisco").append(newRow);
                
//                 for(var i = 0; i < json.length; i++) {
//                     var cols = "";
//                     var newRow = $("<tr>"); 
//                     cols += '<td><input type=radio value='+json[i].idrisco+' name=idrisco id=idrisco></td>';
//                     cols += '<td>'+json[i].codigo+'</td>';
//                     cols += '<td>'+json[i].codcbo+'</td>';
//                     cols += '<td>'+json[i].desccbo+'</td>';
//                     cols += '<td>'+json[i].gruporisco+'</td>';
//                     cols += '<td>'+json[i].codrisco+'</td>';
//                     newRow.append(cols);
//                     $("#modalRisco").append(newRow);
//                 }
//             }
//         });
//     });
// });
// //-------------- SELECIONA EMPRESA -----------------------//
// $(document).ready(function(){
//     $("#submitSetor").on('click', function(){
        
//         var idrisco= $("input[name='idrisco']:checked").val();
//         $.ajax({
        
//             type:'POST',
//             url:BASE_URL+'/ajaxSetor/getIdRisco',
//             data:{idrisco:idrisco},
//             success:function(json){
                
//                 json = json.replace(/(\r\n|\n|\r)/gm,"");
//                 json = json.replace(/\t/,"");

//                 var json = JSON.parse(json);

//                 $("#codcbo").val(json[0].codcbo);
//                 $("#desccbo").val(json[0].desccbo);
//                 $("#gruporisco").val(json[0].gruporisco);
//                 $("#codrisco").val(json[0].codrisco);
                
//             }
//         });
//     });
// });


// $(document).ready(function() {
// //------------------------Buscar Produtos ------------------------------//
// $("#input[name=nome_setor]").on('keyup',function(e){
//     e.preventDefault();     

//     var valdpto = $(this).val();
//     //var valempres = $("#matCodEmpresa").val();
//     $("#produto_fabricante").autocomplete({
//         source: function(request, response) {
//                 $.ajax({
//                     url: BASE_URL+'/ajaxMaterialEpi/searchProdutoEpi',
//                     type:'GET',
//                     dataType: 'json',
//                     data: { prodepi: valepi, valempres:valempres },
//                     success: function(data) {
//                         response(data)        
//                     },
//                 });
//             },
//             focus: function( event, ui ) {
//                 $("#produto_fabricante").val( ui.item.equipprotectindividual );
//             return false;
//             },
//             select: function( event, ui ) {
//                 $("#codigofuncepi").val( ui.item.codepi );
//                 $("#codigoca").val( ui.item.ca );
//                 function dateToEN(date){    
//                     return date.split('-').reverse().join('/');
//                 };  
//                 var dat =  ui.item.datvencimentca;
//                 var dat =  dateToEN(dat);
//                 $("#datvencimeto").val( dat );
//             return false;
//             }
//         })
//         .autocomplete( "instance" )._renderItem = function(ul, item) {
//             return $("<li>").append("<a><b> " + item.equipprotectindividual + "<br></a>").appendTo( ul );
//             var valorcidade = item.equipprotectindividual;
//             var valor = valorcidade.toUpperCase();
//         };  
//     });
// });

// $(function(){

// function excluirProd(obj) {
//     $(obj).closest('tr').remove();
// }

// $(document).ready(function(){
// function addProd(obj) {
//     $('#add_prod').val('');
//     var id = $(obj).attr('data-id');
//     var name = $(obj).attr('data-name');
//     var price = $(obj).attr('data-price');

//    // $('.searchresults').hide();

//     if( $('input[name="quant['+id+']"]').length == 0 ) {
//         var tr = 
//         '<tr>'+
//             '<td>'+name+'</td>'+
//             '<td>'+
//                 '<input type="number" name="quant['+id+']" class="p_quant" value="1" onchange="updateSubtotal(this)" data-price="'+price+'" />'+
//             '</td>'+
//             '<td>R$ '+price+'</td>'+
//             '<td class="subtotal">R$ '+price+'</td>'+
//             '<td><a href="javascript:;" onclick="excluirProd(this)">Excluir</a></td>'+
//         '</tr>';

//         $('#products_table').append(tr);
//     }

//     updateTotal();

// }
// });
// });

