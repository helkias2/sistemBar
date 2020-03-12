$(document).ready(function() {
    $("#ExtratoAnaliseTecnica").on('keyup', function() {
        let extratoAnaliseTecnica = $("#buscaExtratoAnaliseTecnica").val();
        if (extratoAnaliseTecnica != '') {
            $.ajax({
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoAnaliseTecnica",
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { extratoAnaliseTecnica: extratoAnaliseTecnica },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codanalise">' + json[i].codanalise +
                        '</td><td id="codempresa" style="display: none;">' + json[i].codempresa +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="nomesetor">' + json[i].nomesetor +
                        //'</td><td id="nomeestab">' + json[i].nomeestab +
                        '</td></tr>';
                    }
                    $('#bodyExtratoAnaliseTecnica').html(html);
                    $('#bodyExtratoAnaliseTecnica').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableExtratoAnaliseTecnica]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoAnaliseTecnica").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codanalise = $(this).find('td[id=codanalise]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var nomesetor = $(this).find('td[id=nomesetor]').text();
                jsondbAnaliseTecnica = { 'codanalise': codanalise, 'razaosocial': razaosocial, 'codempresa': codempresa,'nomesetor': nomesetor};
                valorAnaliseTecnica(jsondbAnaliseTecnica);
            });
        });
    }

    function valorAnaliseTecnica(jsondbAnaliseTecnica) {
        $("#envExtratoAnaliseTecnica").on('click', function(e) {
            e.preventDefault();
            if (jsondbAnaliseTecnica != '') {
                $("#codanalise").val(jsondbAnaliseTecnica.codanalise);
                $("#codempresa").val(jsondbAnaliseTecnica.codempresa);
                $("#razaosocial").val(jsondbAnaliseTecnica.razaosocial);
                $("#nomesetor").val(jsondbAnaliseTecnica.nomesetor);

            }
            $("#bodyExtratoAnaliseTecnica tr").remove();
        });
        return false;
    }
    $("#envExtratoAnaliseTecnica").on('click', function() {
        $("#bodyExtratoAnaliseTecnica tr").remove();
    });
    $("#closedExtratoAnaliseTecnica").on('click', function() {
        $("#bodyExtratoAnaliseTecnica tr").remove();
    });
})


function openExtratoAnaliseTecnica(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/extratosGerais/extratoAnaliseTecnica?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}