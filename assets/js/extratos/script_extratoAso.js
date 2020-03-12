$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoAso").on('keyup', function() {
        //mudar aqui///
        let extratoAso = $("#buscaExtratoAso").val();
        //mudar aqui///
        if (extratoAso != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoAso",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoAso: extratoAso },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codempresa">' + json[i].codempresa +
                        '</td><td id="nomeestab">' + json[i].nomeestab +
                        '</td><td id="nomfuncionario">' + json[i].nomfuncionario +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoAso').html(html);
                    $('#bodyExtratoAso').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoAso]").keyup(function() { //pega o css da tabela 
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
            ////////////mudar aqui
            $("#bodyExtratoAso").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codempresa = $(this).find('td[id=codempresa]').text();
                var nomeestab = $(this).find('td[id=nomeestab]').text();
                var nomfuncionario = $(this).find('td[id=nomfuncionario]').text();
                //mudar aqui//
                jsondbAso = { 'codempresa': codempresa, 'nomeestab': nomeestab, 'nomfuncionario': nomfuncionario};
                //mudar aqui////////
                valorPPRA(jsondbAso);
            });
        });
    }
                //mudar aqui///////
    function valorPPRA(jsondbAso) {
        //////mudar aqui/////
        $("#envExtratoAso").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbAso != '') {
                               //mudar aqui/////////////  
                $("#codempresa").val(jsondbAso.codempresa);
                $("#nomeestab").val(jsondbAso.nomeestab);
                $("#nomfuncionario").val(jsondbAso.nomfuncionario);

            } //mudar aqui///////////
            $("#bodyExtratoAso tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoAso").on('click', function() {
        $("#bodyExtratoAso tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoAso").on('click', function() {
        $("#bodyExtratoAso tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoAso(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoAso?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}