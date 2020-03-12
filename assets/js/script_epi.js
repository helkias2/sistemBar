// $(function() {
    
//     var grid = $("#employee_data").bootgrid({

//     labels: {
//         noResults: "Não existe Resultados",
//         search: "pesquisa",
//         infos: "Mostrando {{ctx.start}} de {{ctx.end}} de {{ctx.total}} incrições",
//         responsiveTable: 'table-responsive'+ 'data-row-id'
//     },    
    
//     caseSensitive: false,    

//     }).on("loaded.rs.jquery.bootgrid", function() {

//         /* Executes after data is loaded and rendered */
//         grid.find(".command-edit").on("click", function(e) {
//             e.preventDefault();
//         }).end().find(".command-delete").on("click", function(e) {
//             e.preventDefault();     
//         });
//     });
//     function editvalor(epivalor) {

//         let resultado    = BASE_URL + "/epiEdit?id=" + epivalor;
//         return resultado;
//     }
// });

$(function(){
    carregarDados();
    function carregarDados(){
      var datatable = $('#epi_data').DataTable({
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
              "url": BASE_URL + "/ajaxEpi/listEpi",
              "type": 'POST',
              "data": function(d) {
                d.vlactionEpi = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"codepi"}, 
        {data:"razaosocial"}, 
        {data:"equipprotectindividual"},
        //{data:"uf"},
        {data:"categoria"},
        {data:"fabricante"},
        {data:"ca"},
//         {data:"situacao",
//         "render": function (data, type, row, meta) { 
//             if( data == 'N'){
//           return '<a class="btn btn-warning btn-sm" value="'+data+'">'+'INATIVO'+'</a>';
//       } else{
//           return '<a class="btn btn-info btn-sm">' +'ATIVO'+ '</a>';
//       }
//   }
// },
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
            { data: "codepi", 
            "render": function (data, type, row, meta) { 
                return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstEPI/epiEdit/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }

            },    
            { data: "codepi",
            "render": function (data, type, row, meta) { 
              return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstEPI/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
          },

          ],

      });

      $("#epi_data").show();
  }
})


$(document).ready(function(){
    $('#btnEpiAdd').on('click', function(e){
        e.preventDefault();
        let CodEPIEmpresa        = $("input[name=codempresa]").val();
        let nomEPIEmpresa        = $("input[name=razao_social]").val();
        let categoriaEPI         = $("#categoria_EPI option:selected").val();
        let equipEPI             = $("input[name=equipamento]").val();
        let fabricEPI            = $("input[name=fabricante]").val();
        let caEPI                = $("input[name=ca]").val();
        let dataEPI              = $("input[name=validade_ca]").val();
        let tecnicoEPI           = $("input[name=tecnico]").val();
        if(CodEPIEmpresa !='' && CodEPIEmpresa.trim() !='' && nomEPIEmpresa != '' && nomEPIEmpresa.trim() !='' && categoriaEPI != '' && categoriaEPI.trim() !='' && equipEPI != '' && equipEPI.trim() !='' && fabricEPI != '' && fabricEPI.trim() !='' && caEPI != '' && caEPI.trim() !='' && dataEPI != '' && dataEPI.trim() !=''&& tecnicoEPI != ''&& tecnicoEPI.trim()!=''){
                       
            var count = 1;
            if(count >= 1){
            while(document.getElementById("EPI_equipamento"+count) != null){
                count += 1;
            }

        var html = ''; 
            var html =
                "<tr>"+
                //"<td>"+CodEPIEmpresa+"</td>"+"<input type=hidden value ='"+codFcSetor+"' name=FccodSetor"+count+" id=Fc_codSetor"+count+">"+
                "<td>"+categoriaEPI+"</td>"+"<input type=hidden value ='"+categoriaEPI+"' name=EPIcategoria"+count+" id=EPI_categoria"+count+">"+
                "<td>"+equipEPI+"</td>"+"<input type=hidden value ='"+equipEPI+"' name=EPIequipamento" +count+" id=EPI_equipamento"+count+">"+
                "<td>"+fabricEPI+"</td>"+"<input type=hidden value ='"+fabricEPI+"' name=EPIfabricante" +count+" id=EPI_fabricante"+count+">"+
                "<td>"+caEPI+"</td>"+"<input type=hidden value ='"+caEPI+"' name=EPIca" +count+" id=EPI_ca"+count+">"+                   
                // "<td>"+caEPI+"</td>"+"<input type=hidden value ='"+caEPI+"' name=EPIca" +count+" id=EPI_ca"+count+">"+                   
                "<td>"+tecnicoEPI+"</td>"+"<input type=hidden value ='"+tecnicoEPI+"' name=EPItecnico" +count+" id=EPI_tecnico"+count+">"+
                 "<td>"+dataEPI+"</td>"+"<input type=hidden value ='"+dataEPI+"' name=EPIdata" +count+" id=EPI_data"+count+">"+
                "<td><a href=javascript:; onclick= '" + excluirProdEPI(this) +"'>Excluir</a></td></tr>";
            $('#tbodyEPI').append(html);
              }
            limparCampos();
        }else{
            $("#ModalEmpMensagem").modal();
        }
    })

    function limparCampos(){
        $("#equipamento_EPI").val('');
        $("#fabricante_EPI").val('');
        $("#ca_EPI").val('');
        $("#validadeca_EPI").val('');
        $("#tecnico_EPI").val('');
    };

    $("#btnEPILimpar").on('click', function(){
        $("#tbodyEPI tr").remove();
            let id = $(obj).attr('data-id');
            $(this).closest('td').remove();
    });

    function excluirProdEPI(obj){
        $("#tbodyEPI").on('click', 'tr',function(obj){
            let id = $(obj).attr('data-id');
            $(this).closest('tr').remove();
        });
    }
});


$(document).ready(function(){
    $("#ModalTecnicoEpi").on('blur', function(){
        var buscTecEmp = $("#idEmpresaEvt").val();
        //let buscTec = $("#buscaTecEPI").val();

        if(buscTecEmp!=''){
        $.ajax({
            url: BASE_URL+ "/ajax/searchTecnicoEPI",
            type: 'POST',
            datatype: 'json',
            cache: false,
            async: false,
            data: {buscTecEmp:buscTecEmp},
            success: function(data){
                json = data.replace(/(\r\n|\n|\r)/gm,"");
                    var json = $.parseJSON(json);
                    var html = '';
                    for( var i = 0; i < json.length && json != ''; ++i) {
                        html += '  <tr id="trtr"> <td id="nometecEPI">'+json[i].nomeresponsavel+'</td> <td id="dcotecEPI">'+json[i].identprofissional+'</td></tr>';
                    }
                $('#tbodyTECEPI').html(html);
                $('#tbodyTECEPI').show();
                },
            })
        return false;
        }
    })
    $("input[name=buscaDado_Emp]").keyup(function(){ //pega o css da tabela 
        var tabela = $(this).attr('alt');
        if( $(this).val() != ""){
            $("."+tabela+" tbody>tr").hide();
            $("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        } else{
            $("."+tabela+" tbody>tr").show();
        }
    });
    var vl ='';
    $.extend($.expr[":"], {
        "contains-ci": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
    pegarvlores();
    function pegarvlores(){ 
    $(document).ready(function(){
        $("#tbodyTECEPI").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');
            var valEPI = $(this).find('td[id=nometecEPI]').text();
            jsontecepi = {'resulEPI':valEPI};
            pegarvlaso(jsontecepi);
        });
    });
}
function pegarvlaso(jsontecepi){     
        $("#enviaTecEPI").on('click', function (e) {
            e.preventDefault();     
            if( jsontecepi != ''){   
                $("#tecnico_EPI").val(jsontecepi.resulEPI);
            }
            $("#tbodyTECEPI tr").remove();
        });
    return false;
    }
    $("#enviaTecEPI").on('click', function(){
        $("#tbodyTECEPI tr").remove();
    });
    $("#fecheTecEPI").on('click', function(){
        $("#tbodyTECEPI tr").remove();
    });
})






