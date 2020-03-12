$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoAsoExpress").on('keyup', function() {
        //mudar aqui///
        let extratoAsoExpress = $("#buscaExtratoAsoExpress").val();
        //mudar aqui///
        if (extratoAsoExpress != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoAsoExpress",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoAsoExpress: extratoAsoExpress },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="idasoexpress">' + json[i].idasoexpress +
                        '</td><td style="display: none;" id="cnpjrazaosocial">' + json[i].cnpjrazaosocial +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoAsoExpress').html(html);
                    $('#bodyExtratoAsoExpress').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoAsoExpress]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoAsoExpress").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var cnpjrazaosocial = $(this).find('td[id=cnpjrazaosocial]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                
                //mudar aqui//
                jsondbAsoExpress = { 'cnpjrazaosocial': cnpjrazaosocial, 'razaosocial': razaosocial};
                //mudar aqui////////
                valorAsoExpress(jsondbAsoExpress);
            });
        });
    }
                //mudar aqui///////
    function valorAsoExpress(jsondbAsoExpress) {
        //////mudar aqui/////
        $("#envExtratoAsoExpress").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbAsoExpress != '') {
                               //mudar aqui/////////////  
                $("#cnpjrazaosocial").val(jsondbAsoExpress.cnpjrazaosocial);
                $("#razaosocial").val(jsondbAsoExpress.razaosocial);
                //$("#codempresa").val(jsondbAsoExpress.codempresa);

            } //mudar aqui///////////
            $("#bodyExtratoAsoExpress tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoAsoExpress").on('click', function() {
        $("#bodyExtratoAsoExpress tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoAsoExpress").on('click', function() {
        $("#bodyExtratoAsoExpress tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoAsoExpress(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoAsoExpress?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}