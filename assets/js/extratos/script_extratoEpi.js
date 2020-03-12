$(document).ready(function() {
    //mudar aqui 
    $("#ExtratoEpi").on('keyup', function() {
        //mudar aqui
        let extratoEpi = $("#buscaExtratoEpi").val();
        //mudar aqui
        if (extratoEpi != '') {
            $.ajax({                                    //mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoEpi",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui
                data: { extratoEpi: extratoEpi },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codepi">' + json[i].codepi +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="equipprotectindividual">' + json[i].equipprotectindividual +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui
                    $('#bodyExtratoEpi').html(html);
                    $('#bodyExtratoEpi').show();
                },
            })
            return false;
        }
    })
                           //mudar aqui
    $("input[name=tableExtratoEpi]").keyup(function() { //pega o css da tabela 
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
                          //mudar aqui
            $("#bodyExtratoEpi").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codepi = $(this).find('td[id=codepi]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui
                jsondbEpi = { 'codepi': codepi, 'razaosocial': razaosocial, 'codempresa': codempresa};
                //mudar aqui
                valorEpi(jsondbEpi);
            });
        });
    }
                //mudar aqui.......
    function valorEpi(jsondbEpi) {
            //mudar aqui
        $("#envExtratoEpi").on('click', function(e) {
            e.preventDefault();
            //mudar aqui
            if (jsondbEpi != '') {
                                        //mudar aqui  
                $("#codepi").val(jsondbEpi.codepi);
                $("#razaosocial").val(jsondbEpi.razaosocial);
                $("#codempresa").val(jsondbEpi.codempresa);

            }               //mudar aqui
            $("#bodyExtratoEpi tr").remove();
        });
        return false;
    }           //mudar aqui
    $("#envExtratoEpi").on('click', function() {
        $("#bodyExtratoEpi tr").remove();
    });         //mudar aqui
    $("#closedExtratoEpi").on('click', function() {
        $("#bodyExtratoEpi tr").remove();
    });
})

                ///mudar aqui
function openExtratoEpi(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoEpi?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}