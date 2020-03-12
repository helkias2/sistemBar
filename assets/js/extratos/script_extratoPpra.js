$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoPPRA").on('keyup', function() {
        //mudar aqui///
        let extratoPPRA = $("#buscaExtratoPPRA").val();
        //mudar aqui///
        if (extratoPPRA != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoPPRA",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoPPRA: extratoPPRA },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codppra">' + json[i].codppra +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="nomeamb">' + json[i].nomeamb +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoPPRA').html(html);
                    $('#bodyExtratoPPRA').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoPPRA]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoPPRA").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codppra = $(this).find('td[id=codppra]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var nomeamb = $(this).find('td[id=nomeamb]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui//
                jsondbPPRA = { 'codppra': codppra, 'razaosocial': razaosocial, 'nomeamb': nomeamb, 'codempresa': codempresa};
                //mudar aqui////////
                valorPPRA(jsondbPPRA);
            });
        });
    }
                //mudar aqui///////
    function valorPPRA(jsondbPPRA) {
        //////mudar aqui/////
        $("#envExtratoPPRA").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbPPRA != '') {
                               //mudar aqui/////////////  
                $("#codppra").val(jsondbPPRA.codppra);
                $("#razaosocial").val(jsondbPPRA.razaosocial);
                $("#nomeamb").val(jsondbPPRA.nomeamb);
                $("#codempresa").val(jsondbPPRA.codempresa);

            } //mudar aqui///////////
            $("#bodyExtratoPPRA tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoPPRA").on('click', function() {
        $("#bodyExtratoPPRA tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoPPRA").on('click', function() {
        $("#bodyExtratoPPRA tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoPPRA(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoPPRA?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}