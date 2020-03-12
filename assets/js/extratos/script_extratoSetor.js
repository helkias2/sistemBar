$(document).ready(function() {
    //mudar aqui 
    $("#ExtratoSetor").on('keyup', function() {
        //mudar aqui
        let extratoSetor = $("#buscaExtratoSetor").val();
        //mudar aqui
        if (extratoSetor != '') {
            $.ajax({                                    //mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoSetor",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui
                data: { extratoSetor: extratoSetor },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codsetor">' + json[i].codsetor +
                        '</td><td id="nomesetor">' + json[i].setordesenvolvido +
                        '</td><td id="razaosocial">' + json[i].razaosocial +
                        '</td><td id="codempresa" style="display: none">' + json[i].codempresa +
                        '</td></tr>';
                    }
                    //mudar aqui
                    $('#bodyExtratoSetor').html(html);
                    $('#bodyExtratoSetor').show();
                },
            })
            return false;
        }
    })
                           //mudar aqui
    $("input[name=tableExtratoFuncionario]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoSetor").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codsetor = $(this).find('td[id=codsetor]').text();
                var setordesenvolvido = $(this).find('td[id=nomesetor]').text();
                var razaosocial = $(this).find('td[id=razaosocial]').text();
                var codempresa = $(this).find('td[id=codempresa]').text();
                //mudar aqui
                jsondbSetor = { 'codsetor': codsetor, 'setordesenvolvido': setordesenvolvido, 'razaosocial': razaosocial, 'codempresa': codempresa};
                //mudar aqui
                valorSetor(jsondbSetor);
            });
        });
    }
                //mudar aqui.......
    function valorSetor(jsondbSetor) {
            //mudar aqui
        $("#envExtratoSetor").on('click', function(e) {
            e.preventDefault();
            //mudar aqui
            if (jsondbSetor != '') {
                                        //mudar aqui  
                $("#codsetor").val(jsondbSetor.codsetor);
                $("#nomesetor").val(jsondbSetor.setordesenvolvido);
                $("#razaosocial").val(jsondbSetor.razaosocial);
                $("#codempresa").val(jsondbSetor.codempresa);

            }               //mudar aqui
            $("#bodyExtratoSetor tr").remove();
        });
        return false;
    }           //mudar aqui
    $("#envExtratoSetor").on('click', function() {
        $("#bodyExtratoSetor tr").remove();
    });         //mudar aqui
    $("#closedExtratoSetor").on('click', function() {
        $("#bodyExtratoSetor tr").remove();
    });
})

                ///mudar aqui
function openExtratoSetor(obj) {
    let data = $(obj).serialize();
    if (data != '') {                        //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoSetor?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}