$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoTreinamento").on('keyup', function() {
        //mudar aqui///
        let extratoTreinamento = $("#buscaExtratoTreinamento").val();
        //mudar aqui///
        if (extratoTreinamento != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoTreinamento",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoTreinamento: extratoTreinamento },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codtreinamento">' + json[i].codtreinamento +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoTreinamento').html(html);
                    $('#bodyExtratoTreinamento').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoTreinamento]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoTreinamento").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codtreinamento = $(this).find('td[id=codtreinamento]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui//
                jsondbTreinamento = { 'codtreinamento': codtreinamento, 'razaosocial': razaosocial, 'codempresa': codempresa};
                //mudar aqui////////
                valorTreinamento(jsondbTreinamento);
            });
        });
    }
                //mudar aqui///////
    function valorTreinamento(jsondbTreinamento) {
        //////mudar aqui/////
        $("#envExtratoTreinamento").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbTreinamento != '') {
                               //mudar aqui/////////////  
                $("#idppp").val(jsondbTreinamento.idppp);
                $("#razaosocial").val(jsondbTreinamento.razaosocial);
                $("#codempresa").val(jsondbTreinamento.codempresa);

            } //mudar aqui///////////
            $("#bodyExtratoTreinamento tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoTreinamento").on('click', function() {
        $("#bodyExtratoTreinamento tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoTreinamento").on('click', function() {
        $("#bodyExtratoTreinamento tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoTreinamento(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoTreinamento?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}