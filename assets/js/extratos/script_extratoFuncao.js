$(document).ready(function() {
    //mudar aqui 
    $("#ExtratoFuncao").on('keyup', function() {
        //mudar aqui
        let extratoFuncao = $("#buscaExtratoFuncao").val();
        //mudar aqui
        if (extratoFuncao != '') {
            $.ajax({                                    //mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoFuncao",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui
                data: { extratoFuncao: extratoFuncao },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codfuncao">' + json[i].codfuncao +
                        '</td><td id="cargocbo">' + json[i].cargocbo +
                        '</td><td id="nomeempresa">' + json[i].nomeempresa +
                        '</td><td id="codempresa" style="display:none;">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui
                    $('#bodyExtratoFuncao').html(html);
                    $('#bodyExtratoFuncao').show();
                },
            })
            return false;
        }
    })
                           //mudar aqui
    $("input[name=tableExtratoFuncao]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoFuncao").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codfuncao = $(this).find('td[id=codfuncao]').text();
                var cargocbo = $(this).find('td[id=cargocbo]').text();
                var nomeempresa = $(this).find('td[id=nomeempresa]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui
                jsondbFuncao = { 'codfuncao': codfuncao, 'cargocbo': cargocbo, 'nomeempresa': nomeempresa, 'codempresa': codempresa};
                //mudar aqui
                valorFuncao(jsondbFuncao);
            });
        });
    }
                //mudar aqui.......
    function valorFuncao(jsondbFuncao) {
            //mudar aqui
        $("#envExtratoFuncao").on('click', function(e) {
            e.preventDefault();
            //mudar aqui
            if (jsondbFuncao != '') {
                                        //mudar aqui  
                $("#codfuncao").val(jsondbFuncao.codfuncao);
                $("#nomefuncao").val(jsondbFuncao.cargocbo);
                $("#empresa").val(jsondbFuncao.nomeempresa);
                $("#codempresa").val(jsondbFuncao.codempresa);

            }               //mudar aqui
            $("#bodyExtratoFuncao tr").remove();
        });
        return false;
    }           //mudar aqui
    $("#envExtratoFuncao").on('click', function() {
        $("#bodyExtratoFuncao tr").remove();
    });         //mudar aqui
    $("#closedExtratoFuncao").on('click', function() {
        $("#bodyExtratoFuncao tr").remove();
    });
})

                ///mudar aqui
function openExtratoFuncao(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoFuncao?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}