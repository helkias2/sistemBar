$(function(){
    carregarDados();
    function carregarDados(){
      var datatable = $('#pcmso_data').DataTable({
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
              "url": BASE_URL + "/ajaxPcmso/listPcmso",
              "type": 'POST',
              "data": function(d) {
                d.vlactionPcmso = "action";   
            },
            "dataSrc":""
        },
        "columns":[
        {data:"codpcmso"}, 
        {data:"razaosocial"}, 
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
        
        { data: "codpcmso", 
        "render": function (data, type, row, meta) { 
            return '<a class="btn btn-primary btn-sm" href="'+BASE_URL+'/sstPCMSO/viewPcmso/' + data +'">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>'; }

        },    
        { data: "codpcmso",
        "render": function (data, type, row, meta) { 
          return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/sstPCMSO/delete/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
      },

      ],

  });

      $("#pcmso_data").show();
  }
})


/*-----------------------BUSCA AMBIENTE -------------------------*/
$(function() {
    $("#buscaAmbEmpresaPCMSO").on('keyup', function() {
        var busca = $('#buscaAmbEmpresaPCMSO').val();
        var codEmpresa = $('#idEmpresaEvt').val();
        console.log(busca, codEmpresa);
        $.ajax({
            type: 'POST',
            url: BASE_URL + '/ajaxSetor/getAmbientEmpresaPCMSO',
            data: { busca: busca, codEmpresa: codEmpresa },
            success: function(json) {
                json = json.replace(/(\r\n|\n|\r)/gm, "");
                json = json.replace(/\t/, "");
                var json = JSON.parse(json);

                $("#tbAmbienteModalPCMSO tr").remove();

                var newRow = $("<tr>");
                var cols = "";
                cols += "<th></th>";
                cols += "<th>CÓDIGO</th>";
                cols += "<th>NOME</th>";
                cols += "<th>INSCRIÇÃO.</th>";
                // cols += "<th>PRÓPRIO</th>";
                newRow.append(cols);
                $("#tbAmbienteModalPCMSO").append(newRow);

                for (var i = 0; i < json.length; i++) {
                    var cols = "";
                    var newRow = $("<tr>");
                    cols += '<td><input type=radio value=' + json[i].idamb + ' name=idamb id=idamb></td>';
                    cols += '<td>' + json[i].codamb + '</td>';
                    cols += '<td>' + json[i].nomeestab + '</td>';
                    cols += '<td>' + json[i].matricula + '</td>';
                    // cols += '<td>' + json[i].estabprop + '</td>';
                    newRow.append(cols);
                    $("#tbAmbienteModalPCMSO").append(newRow);
                }
            }
        });
    });
});

/*-----------------------GET TABAMBIENTE------------------------*/
$(function() {
    $("#submitAmbEmpresaPCMSO").on('click', function() {

        var idamb = $("input[name='idamb']:checked").val();

        $.ajax({
            type: 'POST',
            url: BASE_URL + '/ajaxSetor/resultAmbEmpPCMSO',
            data: { idamb: idamb },
            success: function(json) {
                //console.log(json);
                json = json.replace(/(\r\n|\n|\r)/gm, "");
                json = json.replace(/\t/, "");
                //console.log(msg);
                var json = JSON.parse(json);

                $("#codAmbEmpPCMSO").val(json.codamb);
                $("#nomeAmbPCMSO").val(json.nomeestab);
                $("#propAmbPCMSO").val(json.matricula);
            }
        });
    });
});