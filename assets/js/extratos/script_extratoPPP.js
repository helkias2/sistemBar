$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoPPP").on('keyup', function() {
        //mudar aqui///
        let extratoPPP = $("#buscaExtratoPPP").val();
        //mudar aqui///
        if (extratoPPP != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoPPP",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoPPP: extratoPPP },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="idppp">' + json[i].idppp +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoPPP').html(html);
                    $('#bodyExtratoPPP').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoPPP]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoPPP").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var idppp = $(this).find('td[id=idppp]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui//
                jsondbPPP = { 'idppp': idppp, 'razaosocial': razaosocial, 'codempresa': codempresa};
                //mudar aqui////////
                valorPPP(jsondbPPP);
            });
        });
    }
                //mudar aqui///////
    function valorPPP(jsondbPPP) {
        //////mudar aqui/////
        $("#envExtratoPPP").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbPPP != '') {
                               //mudar aqui/////////////  
                $("#idppp").val(jsondbPPP.idppp);
                $("#razaosocial").val(jsondbPPP.razaosocial);
                $("#codempresa").val(jsondbPPP.codempresa);

            } //mudar aqui///////////
            $("#bodyExtratoPPP tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoPPP").on('click', function() {
        $("#bodyExtratoPPP tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoPPP").on('click', function() {
        $("#bodyExtratoPPP tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoPPP(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoPPP?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}