$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoExame").on('keyup', function() {
        //mudar aqui///
        let extratoExame = $("#buscaExtratoExame").val();
        //mudar aqui///
        if (extratoExame != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoExame",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoExame: extratoExame },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codempresa">' + json[i].codempresa +
                        '</td><td id="razaoempresa">' + json[i].razaoempresa +
                        '</td><td id="nomeexame">' + json[i].nomeexame +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoExame').html(html);
                    $('#bodyExtratoExame').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoExame]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoExame").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codempresa = $(this).find('td[id=codempresa]').text();
                var razaoempresa = $(this).find('td[id=razaoempresa]').text();
                var nomeexame = $(this).find('td[id=nomeexame]').text();
                //mudar aqui//
                jsondbExame = { 'codempresa': codempresa, 'razaoempresa': razaoempresa, 'nomeexame': nomeexame};
                //mudar aqui////////
                valorExame(jsondbExame);
            });
        });
    }
                //mudar aqui///////
    function valorExame(jsondbExame) {
        //////mudar aqui/////
        $("#envExtratoExame").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbExame != '') {
                               //mudar aqui/////////////  
                $("#codempresa").val(jsondbExame.codempresa);
                $("#razaoempresa").val(jsondbExame.razaoempresa);
                $("#nomeexame").val(jsondbExame.nomeexame);

            } //mudar aqui///////////
            $("#bodyExtratoExame tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoExame").on('click', function() {
        $("#bodyExtratoExame tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoExame").on('click', function() {
        $("#bodyExtratoExame tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoExame(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoExame?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}