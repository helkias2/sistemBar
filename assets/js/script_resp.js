
// $(function() {
//     $('#emp_body').hide();
//     $("#resp_data").bootgrid({
//         cache: false,
//         labels: {
//             noResults: "Não existe Resultados",
//             search: "pesquisa",
//             infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
//             responsiveTable: 'table-responsive'+ 'data-row-id'
//         },    
//         caseSensitive: false,    
//         })
//     });


$(function(){
    carregarDados();
    function carregarDados(){
      var datatable = $('#resp_data').DataTable({
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
              "url": BASE_URL + "/ajaxResponsible/listResponsaveis",
              "type": 'POST',
              "data": function(d) {
                d.vlactionResponsaveis = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"codresp"}, 
        {data:"rzempresa"}, 
        {data:"nomeresponsavel"},
        //{data:"uf"},
        {data:"cpf"},
        {data:"celular"},
        //{data:"email"},
        {data:"situacao",
        "render": function (data, type, row, meta) { 
            if( data == 'N'){
          return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'INATIVO'+'</a>';
      } else{
          return '<a class="btn btn-info btn-sm">' +'ATIVO'+ '</a>';
      }
  }
},
        //{data:"risco"},
               //{data:"statusppp"},
                 //"render": function (data, type, row, meta) { 
                   //function dateToEN(date){  
                    // return date.split('-').reverse().join('/');
                   //}; 
                  // return  dateToEN(data);
                 //},
             //},
            //   {data:"situacao",
            //     "render": function (data, type, row, meta) { 
            //        if( data === ''){
            //          return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'Demitido'+'</a>';
            //        } else{
            //          return '<a class="btn btn-info btn-sm">' +'ATIVO'+ '</a>';
            //        }
            //    }
            //   },
            { data: "codresp", 
            "render": function (data, type, row, meta) { 
                return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstResponsavel/responsavelEdit/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }

            },    
            { data: "codresp",
            "render": function (data, type, row, meta) { 
              return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstResponsavel/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
          },

          ],

      });

      $("#resp_data").show();
  }
})

$(document).ready(function(){
//------------------------Buscar Parceiro ------------------------------//
$("#modalResponcavel").on('keyup',function(){
    var valresponc = $("#buscaResponcavelModal").val();
    if(valresponc != ''){
        $.ajax({
            url: BASE_URL+'/ajax/seachListResponcavel',
            type: "POST",
            data: {valresponc: valresponc},
            cache: false,
            async: false,
            datatype: 'JSON',
            success:function(data) {
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                var json = $.parseJSON(json);
                var html = '';
                for( var i = 0; i < json.length && json != ''; ++i) {
                    html += ' <tr id="trtr"> <td id="cdresp">'+json[i].codempresa+'</td> <td id="nmresp">'+json[i].razaosocial+'</td><td id="nisresp">'+json[i].nrmatricula+'</td></tr>';
                }
                $('#tabelamodalResponcavel').html(html);
                $('#tabelamodalResponcavel').show();
            }               
        })
        return false;
    }
});

$("input[name=tablemodalResponcavel]").keyup(function(){ //pega o css da tabela     
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
   $("#tabelamodalResponcavel").on('click', 'tr', function (e) {
       e.preventDefault();
       $(this).toggleClass('ativo');
       $(this).siblings().removeClass('ativo');

       var cdResp = $(this).find('td[id=cdresp]').text();
       var nmResp = $(this).find('td[id=nmresp]').text();
       var nisResp = $(this).find('td[id=nisresp]').text();
       jsonaso = {'codResponsavel':cdResp, 'nomResponsavel':nmResp, 'nisResponsavel':nisResp};
       pegarvlaso(jsonaso);
   });
}
function pegarvlaso(jsonaso){     
    $("#enviaresp").on('click',function (e) {
       e.preventDefault();     
       if( jsonaso != ''){ 
        $("#codRespEmpresa").val(jsonaso.codResponsavel);
        $("#rzRespEmpresa").val(jsonaso.nomResponsavel);
        $("#nisRespEmpresa").val(jsonaso.nisResponsavel);
    }else{
        alert("Digite Novamente");
    };
    $("#tabelamodalResponcavel tr").remove();
});
    return false;
}
$("#enviaresp").on('click', function(){
    $("#tabelamodalResponcavel tr").remove();
});

});






