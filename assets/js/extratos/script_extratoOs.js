$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoOS").on('keyup', function() {
        //mudar aqui///
        let extratoOS = $("#buscaExtratoOS").val();
        //mudar aqui///
        if (extratoOS != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoOS",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoOS: extratoOS },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="idos">' + json[i].idos +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoOS').html(html);
                    $('#bodyExtratoOS').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoOS]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoOS").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var idos = $(this).find('td[id=idos]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui//
                jsondbOS = { 'idos': idos, 'razaosocial': razaosocial, 'codempresa': codempresa};
                //mudar aqui////////
                valorOS(jsondbOS);
            });
        });
    }
                //mudar aqui///////
    function valorOS(jsondbOS) {
        //////mudar aqui/////
        $("#envExtratoOS").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbOS != '') {
                               //mudar aqui/////////////  
                $("#idos").val(jsondbOS.idos);
                $("#razaosocial").val(jsondbOS.razaosocial);
                $("#codempresa").val(jsondbOS.codempresa);

            } //mudar aqui///////////
            $("#bodyExtratoOS tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoOS").on('click', function() {
        $("#bodyExtratoOS tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoOS").on('click', function() {
        $("#bodyExtratoOS tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoOS(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoOS?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}