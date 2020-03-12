$(document).ready(function() {
    $("#ExtratoMatEpi").on('keyup', function() {
        let extratoMatEpi = $("#buscaExtratoMatEpi").val();
        if (extratoMatEpi != '') {
            $.ajax({
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoMatEpi",
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { extratoMatEpi: extratoMatEpi },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codmtepi">' + json[i].codmtepi +
                        '</td><td id="codempresa" style="display: none;">' + json[i].codempresa +
                        '</td><td id="razaoempresa">' + json[i].razaoempresa +
                        '</td><td id="nomefuncionario">' + json[i].nomefuncionario +
                        '</td></tr>';
                    }
                    $('#bodyExtratoMatEpi').html(html);
                    $('#bodyExtratoMatEpi').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableExtratoMatEpi]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoMatEpi").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codmtepi = $(this).find('td[id=codmtepi]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                var razaoempresa = $(this).find('td[id=razaoempresa]').text();
                //var nomesetor = $(this).find('td[id=nomesetor]').text();
                jsondbMatEpi = { 'codmtepi': codmtepi, 'razaoempresa': razaoempresa, 'codempresa': codempresa};
                valorMatEpi(jsondbMatEpi);
            });
        });
    }

    function valorMatEpi(jsondbMatEpi) {
        $("#envExtratoMatEpi").on('click', function(e) {
            e.preventDefault();
            if (jsondbMatEpi != '') {
                $("#codmtepi").val(jsondbMatEpi.codmtepi);
                $("#codempresa").val(jsondbMatEpi.codempresa);
                $("#razaoempresa").val(jsondbMatEpi.razaoempresa);
                //$("#nomesetor").val(jsondbMatEpi.nomesetor);

            }
            $("#bodyExtratoMatEpi tr").remove();
        });
        return false;
    }
    $("#envExtratoMatEpi").on('click', function() {
        $("#bodyExtratoMatEpi tr").remove();
    });
    $("#closedExtratoMatEpi").on('click', function() {
        $("#bodyExtratoMatEpi tr").remove();
    });
})


function openExtratoMatEpi(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/extratosGerais/extratoMatEpi?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}