$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoNrUm").on('keyup', function() {
        //mudar aqui///
        let extratoNrUm = $("#buscaExtratoNrUm").val();
        //mudar aqui///
        if (extratoNrUm != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoNrUm",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoNrUm: extratoNrUm },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codrelnr">' + json[i].codrelnr +
                        '</td><td id="razaoempresa">' + json[i].razaoempresa +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoNrUm').html(html);
                    $('#bodyExtratoNrUm').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoNrUm]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoNrUm").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codrelnr = $(this).find('td[id=codrelnr]').text();
                var razaoempresa = $(this).find('td[id=razaoempresa]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui//
                jsondbNrUm = { 'codrelnr': codrelnr, 'razaoempresa': razaoempresa, 'codempresa': codempresa};
                //mudar aqui////////
                valorNrUm(jsondbNrUm);
            });
        });
    }
                //mudar aqui///////
    function valorNrUm(jsondbNrUm) {
        //////mudar aqui/////
        $("#envExtratoNrUm").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbNrUm != '') {
                               //mudar aqui/////////////  
                $("#codrelnr").val(jsondbNrUm.codrelnr);
                $("#razaoempresa").val(jsondbNrUm.razaoempresa);
                $("#codempresa").val(jsondbNrUm.codempresa);

            } //mudar aqui///////////
            $("#bodyExtratoNrUm tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoNrUm").on('click', function() {
        $("#bodyExtratoNrUm tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoNrUm").on('click', function() {
        $("#bodyExtratoNrUm tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoNrUm(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoNrUm?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}