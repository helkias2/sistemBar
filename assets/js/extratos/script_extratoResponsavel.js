$(document).ready(function() {
    //mudar aqui 
    $("#ExtratoResponsavel").on('keyup', function() {
        //mudar aqui
        let extratoResponsavel = $("#buscaExtratoResponsavel").val();
        //mudar aqui
        if (extratoResponsavel != '') {
            $.ajax({                                    //mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoResponsavel",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui
                data: { extratoResponsavel: extratoResponsavel },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codresp">' + json[i].codresp +
                        '</td><td id="nomeresponsavel">' + json[i].nomeresponsavel +
                        '</td><td id="identprofissional">' + json[i].identprofissional +
                        '</td><td id="cpf">' + json[i].cpf +
                        // '</td><td id="codempresa" style="display: none;">' + json[i].codempresa +
                        // '</td><td id="rzempresa">' + json[i].rzempresa +
                        '</td></tr>';
                    }
                    //mudar aqui
                    $('#bodyExtratoResponsavel').html(html);
                    $('#bodyExtratoResponsavel').show();
                },
            })
            return false;
        }
    })
                    //mudar aqui
    $("input[name=tableExtratoResponsavel]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoResponsavel").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codresp = $(this).find('td[id=codresp]').text();
                var nomeresponsavel = $(this).find('td[id=nomeresponsavel]').text();
                var identprofissional = $(this).find('td[id=identprofissional]').text();
                var cpf = $(this).find('td[id=cpf]').text();
                //var codempresa = $(this).find('td[id=codempresa]').text();
                //var rzempresa = $(this).find('td[id=rzempresa]').text();
                //mudar aqui
                jsondbResponsavel = { 'codresp': codresp, 'nomeresponsavel': nomeresponsavel, 'identprofissional': identprofissional, 'cpf': cpf/*'codempresa': codempresa, 'rzempresa': rzempresa*/};
                //mudar aqui
                valorResponsavel(jsondbResponsavel);
            });
        });
    }
                //mudar aqui.......
    function valorResponsavel(jsondbResponsavel) {
            //mudar aqui
        $("#envExtratoResponsavel").on('click', function(e) {
            e.preventDefault();
            //mudar aqui
            if (jsondbResponsavel != '') {
                                //mudar aqui  
                $("#codresp").val(jsondbResponsavel.codresp);
                $("#nomeresponsavel").val(jsondbResponsavel.nomeresponsavel);
                $("#identprofissional").val(jsondbResponsavel.identprofissional);
                $("#cpf").val(jsondbResponsavel.cpf);
                //$("#codempresa").val(jsondbResponsavel.codempresa);
                //$("#rzempresa").val(jsondbResponsavel.rzempresa);

            }//mudar aqui
            $("#bodyExtratoResponsavel tr").remove();
        });
        return false;
    }//mudar aqui
    $("#envExtratoResponsavel").on('click', function() {
        $("#bodyExtratoResponsavel tr").remove();
    });//mudar aqui
    $("#closedExtratoResponsavel").on('click', function() {
        $("#bodyExtratoResponsavel tr").remove();
    });
})

    ///mudar aqui
function openExtratoResponsavel(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoResponsavel?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}