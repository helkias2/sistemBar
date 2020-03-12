$(document).ready(function() {
    $("#ExtratoEmpresa").on('keyup', function() {
        let extratoEmpresa = $("#buscaExtratoEmpresa").val();
        if (extratoEmpresa != '') {
            $.ajax({
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoEmpresa",
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { extratoEmpresa: extratoEmpresa },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codempresa">' + json[i].codempresa +
                        '</td><td id="cnpjempresa">' + json[i].nrmatricula +
                        '</td><td id="nameEmpresa">' + json[i].razaosocial +
                        '</td></tr>';
                    }
                    $('#bodyExtratoEmpresa').html(html);
                    $('#bodyExtratoEmpresa').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableExtratoEmpresa]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoEmpresa").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codempresa = $(this).find('td[id=codempresa]').text();
                var nameEmpresa = $(this).find('td[id=nameEmpresa]').text();
                var cnpjempresa = $(this).find('td[id=cnpjempresa]').text();
                jsondbEmpresa = { 'codempresa': codempresa, 'nameEmpresa': nameEmpresa, 'cnpjempresa': cnpjempresa};
                valorEmpresa(jsondbEmpresa);
            });
        });
    }

    function valorEmpresa(jsondbEmpresa) {
        $("#envExtratoEmpresa").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#codempresa").val(jsondbEmpresa.codempresa);
                $("#nameEmpresa").val(jsondbEmpresa.nameEmpresa);
                $("#cnpjempresa").val(jsondbEmpresa.cnpjempresa);

            }
            $("#bodyExtratoEmpresa tr").remove();
        });
        return false;
    }
    $("#envExtratoEmpresa").on('click', function() {
        $("#bodyExtratoEmpresa tr").remove();
    });
    $("#closedExtratoEmpresa").on('click', function() {
        $("#bodyExtratoEmpresa tr").remove();
    });
})


function openExtratoEmpresa(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/extratosGerais/extratoEmpresa?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}