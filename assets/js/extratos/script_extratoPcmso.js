$(document).ready(function() {
    //mudar aqui/// 
    $("#ExtratoPCMSO").on('keyup', function() {
        //mudar aqui///
        let extratoPCMSO = $("#buscaExtratoPCMSO").val();
        //mudar aqui///
        if (extratoPCMSO != '') {
            $.ajax({                                 //////mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoPCMSO",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui////////////
                data: { extratoPCMSO: extratoPCMSO },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codpcmso">' + json[i].codpcmso +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui////////
                    $('#bodyExtratoPCMSO').html(html);
                    $('#bodyExtratoPCMSO').show();
                },
            })
            return false;
        }
    })
            //////////////////////mudar aqui
    $("input[name=tableExtratoPCMSO]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoPCMSO").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codpcmso = $(this).find('td[id=codpcmso]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui//
                jsondbPCMSO = { 'codpcmso': codpcmso, 'razaosocial': razaosocial, 'codempresa': codempresa};
                //mudar aqui////////
                valorPCMSO(jsondbPCMSO);
            });
        });
    }
                //mudar aqui///////
    function valorPCMSO(jsondbPCMSO) {
        //////mudar aqui/////
        $("#envExtratoPCMSO").on('click', function(e) {
            e.preventDefault();
            //mudar aqui///////////
            if (jsondbPCMSO != '') {
                               //mudar aqui/////////////  
                $("#codpcmso").val(jsondbPCMSO.codpcmso);
                $("#razaosocial").val(jsondbPCMSO.razaosocial);
                $("#codempresa").val(jsondbPCMSO.codempresa);

            } //mudar aqui///////////
            $("#bodyExtratoPCMSO tr").remove();
        });
        return false;
    } //mudar aqui///////
    $("#envExtratoPCMSO").on('click', function() {
        $("#bodyExtratoPCMSO tr").remove();
    });//mudar aqui/////////
    $("#closedExtratoPCMSO").on('click', function() {
        $("#bodyExtratoPCMSO tr").remove();
    });
})

        ///mudar aqui/////////
function openExtratoPCMSO(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoPCMSO?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}