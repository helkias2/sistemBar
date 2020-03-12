$(document).ready(function() {
    $("#ExtratoAmbiente").on('keyup', function() {
        let extratoAmbiente = $("#buscaExtratoAmbiente").val();
        if (extratoAmbiente != '') {
            $.ajax({
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoAmbiente",
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { extratoAmbiente: extratoAmbiente },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codamb">' + json[i].codamb +
                        '</td><td id="codempresa" style="display: none;">' + json[i].codempresa +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="matricula">' + json[i].matricula +
                        //'</td><td id="nomeestab">' + json[i].nomeestab +
                        '</td></tr>';
                    }
                    $('#bodyExtratoAmbiente').html(html);
                    $('#bodyExtratoAmbiente').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableExtratoAmbiente]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoAmbiente").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codamb = $(this).find('td[id=codamb]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                //var nomeestab = $(this).find('td[id=nomeestab]').text();
                var matricula = $(this).find('td[id=matricula]').text();
                jsondbAmbiente = { 'codamb': codamb, 'razaosocial': razaosocial, 'codempresa': codempresa, /*'nomeestab': nomeestab,*/ 'matricula': matricula};
                valorAmbiente(jsondbAmbiente);
            });
        });
    }

    function valorAmbiente(jsondbAmbiente) {
        $("#envExtratoAmbiente").on('click', function(e) {
            e.preventDefault();
            if (jsondbAmbiente != '') {
                $("#codamb").val(jsondbAmbiente.codamb);
                $("#codempresa").val(jsondbAmbiente.codempresa);
                $("#razaosocial").val(jsondbAmbiente.razaosocial);
                //$("#nomeestab").val(jsondbAmbiente.nomeestab);
                $("#matricula").val(jsondbAmbiente.matricula);

            }
            $("#bodyExtratoAmbiente tr").remove();
        });
        return false;
    }
    $("#envExtratoAmbiente").on('click', function() {
        $("#bodyExtratoAmbiente tr").remove();
    });
    $("#closedExtratoAmbiente").on('click', function() {
        $("#bodyExtratoAmbiente tr").remove();
    });
})


function openExtratoAmbiente(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/extratosGerais/extratoAmbiente?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}