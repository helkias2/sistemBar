$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoLTCAT").on('keyup', function() {
        //mudar aqui///
        let extratoLTCAT = $("#buscaExtratoLTCAT").val();
        //mudar aqui///
        if (extratoLTCAT != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoLTCAT",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoLTCAT: extratoLTCAT },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codltcat">' + json[i].codltcat +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoLTCAT').html(html);
                    $('#bodyExtratoLTCAT').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoLTCAT]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoLTCAT").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codpcmso = $(this).find('td[id=codpcmso]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui//
                jsondbLTCAT = { 'codpcmso': codpcmso, 'razaosocial': razaosocial, 'codempresa': codempresa};
                //mudar aqui////////
                valorLTCAT(jsondbLTCAT);
            });
        });
    }
                //mudar aqui///////
    function valorLTCAT(jsondbLTCAT) {
        //////mudar aqui/////
        $("#envExtratoLTCAT").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbLTCAT != '') {
                               //mudar aqui/////////////  
                $("#codpcmso").val(jsondbLTCAT.codpcmso);
                $("#razaosocial").val(jsondbLTCAT.razaosocial);
                $("#codempresa").val(jsondbLTCAT.codempresa);

            } //mudar aqui///////////
            $("#bodyExtratoLTCAT tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoLTCAT").on('click', function() {
        $("#bodyExtratoLTCAT tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoLTCAT").on('click', function() {
        $("#bodyExtratoLTCAT tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoLTCAT(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoLTCAT?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}