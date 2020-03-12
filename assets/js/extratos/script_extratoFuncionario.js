$(document).ready(function() {
    //mudar aqui 
    $("#ExtratoFuncionario").on('keyup', function() {
        //mudar aqui
        let extratoFuncionario = $("#buscaExtratoFuncionario").val();
        //mudar aqui
        if (extratoFuncionario != '') {
            $.ajax({                                    //mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoFuncionario",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui
                data: { extratoFuncionario: extratoFuncionario },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codfuncionario">' + json[i].codfuncionario +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="nomefuncionario">' + json[i].nomefuncionario +
                        '</td><td id="cpf">' + json[i].cpf +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui
                    $('#bodyExtratoFuncionario').html(html);
                    $('#bodyExtratoFuncionario').show();
                },
            })
            return false;
        }
    })
                           //mudar aqui
    $("input[name=tableExtratoFuncionario]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoFuncionario").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codfuncionario = $(this).find('td[id=codfuncionario]').text();
                var nomefuncionario = $(this).find('td[id=nomefuncionario]').text();
                var cpf = $(this).find('td[id=cpf]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui
                jsondbFuncionario = { 'codfuncionario': codfuncionario, 'nomefuncionario': nomefuncionario, 'cpf': cpf, 'razaosocial': razaosocial, 'codempresa': codempresa};
                //mudar aqui
                valorFuncionario(jsondbFuncionario);
            });
        });
    }
                //mudar aqui.......
    function valorFuncionario(jsondbFuncionario) {
            //mudar aqui
        $("#envExtratoFuncionario").on('click', function(e) {
            e.preventDefault();
            //mudar aqui
            if (jsondbFuncionario != '') {
                                        //mudar aqui  
                $("#codfuncionario").val(jsondbFuncionario.codfuncionario);
                $("#nomefuncionario").val(jsondbFuncionario.nomefuncionario);
                $("#cpf").val(jsondbFuncionario.cpf);
                $("#razaosocial").val(jsondbFuncionario.razaosocial);
                $("#codempresa").val(jsondbFuncionario.codempresa);

            }               //mudar aqui
            $("#bodyExtratoFuncionario tr").remove();
        });
        return false;
    }           //mudar aqui
    $("#envExtratoFuncionario").on('click', function() {
        $("#bodyExtratoFuncionario tr").remove();
    });         //mudar aqui
    $("#closedExtratoFuncionario").on('click', function() {
        $("#bodyExtratoFuncionario tr").remove();
    });
})

                ///mudar aqui
function openExtratoFuncionario(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoFuncionario?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}