$(document).ready(function() {
    //mudar aqui 
    $("#ExtratoParceiro").on('keyup', function() {
        //mudar aqui
        let extratoParceiro = $("#buscaExtratoParceiro").val();
        //mudar aqui
        if (extratoParceiro != '') {
            $.ajax({                                    //mudar aqui
                url: BASE_URL + "/ajaxExtratosGerais/buscaExtratoParceiro",
                type: 'POST',
                datatype: 'json',
                async: false,
                        //mudar aqui
                data: { extratoParceiro: extratoParceiro },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="codparceiro">' + json[i].codparceiro +
                        '</td><td id="cnpj">' + json[i].cnpj +
                        '</td><td id="nome">' + json[i].nome +
                        '</td></tr>';
                    }
                    //mudar aqui
                    $('#bodyExtratoParceiro').html(html);
                    $('#bodyExtratoParceiro').show();
                },
            })
            return false;
        }
    })
                    //mudar aqui
    $("input[name=tableExtratoParceiro]").keyup(function() { //pega o css da tabela 
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
            $("#bodyExtratoParceiro").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var codparceiro = $(this).find('td[id=codparceiro]').text();
                var nome = $(this).find('td[id=nome]').text();
                var cnpj = $(this).find('td[id=cnpj]').text();
                //mudar aqui
                jsondbParceiro = { 'codparceiro': codparceiro, 'nome': nome, 'cnpj': cnpj};
                //mudar aqui
                valorParceiro(jsondbParceiro);
            });
        });
    }
                //mudar aqui.......
    function valorParceiro(jsondbParceiro) {
            //mudar aqui
        $("#envExtratoParceiro").on('click', function(e) {
            e.preventDefault();
            //mudar aqui
            if (jsondbParceiro != '') {
                                //mudar aqui  
                $("#codparceiro").val(jsondbParceiro.codparceiro);
                $("#nome").val(jsondbParceiro.nome);
                $("#cnpj").val(jsondbParceiro.cnpj);

            }//mudar aqui
            $("#bodyExtratoParceiro tr").remove();
        });
        return false;
    }//mudar aqui
    $("#envExtratoParceiro").on('click', function() {
        $("#bodyExtratoParceiro tr").remove();
    });//mudar aqui
    $("#closedExtratoParceiro").on('click', function() {
        $("#bodyExtratoParceiro tr").remove();
    });
})

    ///mudar aqui
function openExtratoParceiro(obj) {
    let data = $(obj).serialize();
    if (data != '') {           //mudar aqui
        let url = BASE_URL + "/extratosGerais/extratoParceiro?" + data;
        window.open(url, "extratosGerais", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminRelatorioGeral/erro"
        window.open(url, "adminRelatorioGeral2", "width=700, height=600");
    }

    return false;
}