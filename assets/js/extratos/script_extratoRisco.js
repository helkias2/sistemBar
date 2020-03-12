$(document).ready(function() {
    //mudar aqui 
    $("#ExtratoRisco").on('keyup', function() {
        //mudar aqui
        let extratoRisco = $("#buscaExtratoRisco").val();
        //mudar aqui
        if (extratoRisco != '') {
            $.ajax({                                    //mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoRisco",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui
                data: { extratoRisco: extratoRisco },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codigo">' + json[i].codigo +
                        '</td><td id="gruporisco">' + json[i].gruporisco +
                        '</td><td id="razaoempresarisco">' + json[i].razaoempresarisco +
                        '</td><td id="codempresa" style="display: none;">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui
                    $('#bodyExtratoRisco').html(html);
                    $('#bodyExtratoRisco').show();
                },
            })
            return false;
        }
    })
                           //mudar aqui
    $("input[name=tableExtratoRisco]").keyup(function() { //pega o css da tabela 
        var tabela = $(this).attr('alt');
        if ($(this).val() != "") {
            $("." + tabela + " tbody>tr").hide();
            $("." + tabela + " td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        } else {
            $("." + tabela + " tbody>tr").show();
        }
    });
    var vl = '';
    $.extend($.expr[":"], {
        "contains-ci": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
    pegarvlores();

    function pegarvlores() {
        $(document).ready(function() {
                          //mudar aqui
            $("#bodyExtratoRisco").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codigo = $(this).find('td[id=codigo]').text();
                var gruporisco = $(this).find('td[id=gruporisco]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                var razaoempresarisco = $(this).find('td[id=razaoempresarisco]').text();
                //mudar aqui
                jsondbRisco = { 'codigo': codigo, 'gruporisco': gruporisco, 'codempresa': codempresa, 'razaoempresarisco': razaoempresarisco};
                //mudar aqui
                valorRisco(jsondbRisco);
            });
        });
    }
                //mudar aqui.......
    function valorRisco(jsondbRisco) {
            //mudar aqui
        $("#envExtratoRisco").on('click', function(e) {
            e.preventDefault();
            //mudar aqui
            if (jsondbRisco != '') {
                                        //mudar aqui  
                $("#codigo").val(jsondbRisco.codigo);
                $("#nomeRisco").val(jsondbRisco.gruporisco);
                $("#codempresa").val(jsondbRisco.codempresa);
                $("#empresa").val(jsondbRisco.razaoempresarisco);

            }               //mudar aqui
            $("#bodyExtratoRisco tr").remove();
        });
        return false;
    }           //mudar aqui
    $("#envExtratoRisco").on('click', function() {
        $("#bodyExtratoRisco tr").remove();
    });         //mudar aqui
    $("#closedExtratoRisco").on('click', function() {
        $("#bodyExtratoRisco tr").remove();
    });
})

                ///mudar aqui
function openExtratoRisco(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoRisco?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}