//------------------------Buscar CNAE  ------------------------------//
$(function() {
    $("#moduloEmpCompanies").on('keyup', function() {
        var buscaEmpresa = $("#busca_EmpCompanies").val();
        if (buscaEmpresa != '') {
            $.ajax({
                url: BASE_URL + '/ajaxModuloCompanies/buscarEmpCompany',
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { buscaEmpresa: buscaEmpresa },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr">' +
                            '<td id="idcomp">' + json[i].idcompanies + '</td>' +
                            '<td id="codcomp" style="display:none">' + json[i].codcompanies + '</td>' +
                            '<td id="cnpjcomp">' + json[i].cnpj + '</td>' +
                            '<td id="descomp">' + json[i].razaosocial + '</td>' +
                            '</tr>';
                    }
                    $('#tbEmpresaDadosCompany').html(html);
                    $('#tbEmpresaDadosCompany').show();
                },
            });
            return false;
        }
    });

    $("input[name=tbEmpresaCompanies]").keyup(function() { //pega o css da tabela 

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
            $("#tbEmpresaDadosCompany").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');

                //var valcod = $(" #tiporisco option:selected").text();
                var idComp = $(this).find('td[id=idcomp]').text();
                var codComp = $(this).find('td[id=codcomp]').text();
                var cnpjComp = $(this).find('td[id=cnpjcomp]').text();
                var descComp = $(this).find('td[id=descomp]').text();
                jsoncomp = { 'IDComp': idComp, 'CODComp': codComp, 'CNPJComp': cnpjComp, 'DESCComp': descComp };
                pegarvlaso(jsoncomp);
            });
        });
    }

    // ------------- PEGAR VALORES CNAE -------------------//
    function pegarvlaso(jsoncomp) {
        $("#envEmpCompany").on('click', function(e) {
            e.preventDefault();
            if (jsoncomp != '') {
                //'<tr style="background-color: #fff">'+
                $("#id_companies").val(jsoncomp.IDComp);
                $("#cod_Companies").val(jsoncomp.CODComp);
                $("#matriculaCompany").val(jsoncomp.CNPJComp);
                $("#razsocial_Company").val(jsoncomp.DESCComp);
            }
            $("#tbEmpresaDadosCompany tr").remove();

        });
    }
    $("#envEmpCompany").on('click', function() {
        $("#tbEmpresaDadosCompany tr").remove();
    });
    $("#fechEmpCompany").on('click', function() {
        $("#tbEmpresaDadosCompany tr").remove();
    });

})