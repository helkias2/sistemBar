//Modal companies
$(function() {
    $("#ModalExpressRelCompany").on('keyup', function() {
        let buscRelEmpresa = $("#rel_ExpressCompany").val();
        if (buscRelEmpresa != '') {
            $.ajax({
                url: BASE_URL + "/ajaxRelatoriosGeral/listRelatorioCompanies",
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { buscRelEmpresa: buscRelEmpresa },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="tr">' +
                            '<td id="CODEmpresa">' + json[i].idcompanies +
                            '</td><td id="CNPJEmpresa">' + json[i].cnpj +
                            '</td><td id="CPFEmpresa">' + json[i].cpf +
                            '</td> <td id="NOMEmpresa">' + json[i].razaosocial +
                            '</td></tr>';
                    }
                    $('#bodyRelExpressCompany').html(html);
                    $('#bodyRelExpressCompany').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableRelExpressCompany]").keyup(function() { //pega o css da tabela 
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
            $("#bodyRelExpressCompany").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodDbEmp = $(this).find('td[id=CODEmpresa]').text();
                var valnomeDbEmp = $(this).find('td[id=NOMEmpresa]').text();
                var valcnpjDbEmp = $(this).find('td[id=CNPJEmpresa]').text();
                var valcpfDbEmp = $(this).find('td[id=CPFEmpresa]').text();
                jsonRelEmpresa = { 'codigoEmpresa': valcodDbEmp, 'nomeEmpresa': valnomeDbEmp, 'cnpjEmpresa': valcnpjDbEmp, 'cpfEmpresa': valcpfDbEmp };
                pegarvlaso(jsonRelEmpresa);
            });
        });
    }

    //Modal Empresa
    function pegarvlaso(jsonRelEmpresa) {
        $("#envRelExpress").on('click', function(e) {
            e.preventDefault();
            if (jsonRelEmpresa != '') {
                $("#Express_codCompany").val(jsonRelEmpresa.codigoEmpresa);
                $("#Express_CnpjCompany").val(jsonRelEmpresa.cnpjEmpresa);
                $("#Express_CpfCompany").val(jsonRelEmpresa.cpfEmpresa);
                $("#Express_NameCompany").val(jsonRelEmpresa.nomeEmpresa);

            }
            $("#bodyRelExpressCompany tr").remove();
        });
        return false;
    }
    $("#envRelExpress").on('click', function() {
        $("#bodyRelExpressCompany tr").remove();
    });
    $("#fechRelExpress").on('click', function() {
        $("#bodyRelExpressCompany tr").remove();
    });
})


$(function() {
    $("#ModalExpressRelEmpresa").on('keyup', function() {
        var buscRelEmp = $("#relExpress_Empresa").val();
        var buscCodEmpresa = $("#Express_codCompany").val();

        if (buscRelEmp != '' && buscCodEmpresa != '') {

            $.ajax({
                url: BASE_URL + "/ajaxRelatoriosGeral/listRelatorioAsoExpress",
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { buscRelEmp: buscRelEmp, buscCodEmpresa: buscCodEmpresa },
                success: function(data) {
                    console.log(data)
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; i++) {
                        html += '<tr id="trtr">' +
                            
                            '<td id="matrlempresa">' + json[i].cnpjrazaosocial +
                            '</td> <td id="nomrlempresa">' + json[i].razaosocial +
                            '</td></tr>';
                    }
                    $('#bodyRelExpressEmpresa').html(html);
                    $('#bodyRelExpressEmpresa').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableRelEpressEmpresa]").keyup(function() { //pega o css da tabela 
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
            $("#bodyRelExpressEmpresa").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
               
                var valmatRelEmp = $(this).find('td[id=matrlempresa]').text();
                var valnameRelEmp = $(this).find('td[id=nomrlempresa]').text();
                jsondbEmpresa = { 'matrlempresa': valmatRelEmp, 'nomrlempresa': valnameRelEmp };
                pegarvlaso(jsondbEmpresa);
            });
        });
    }

    function pegarvlaso(jsondbEmpresa) {
        $("#envRelExpEmp").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
          
                $("#rel_ExpressCnpjEmpresa").val(jsondbEmpresa.matrlempresa);
                $("#rel_ExpressNameEmpresa").val(jsondbEmpresa.nomrlempresa);
            }
            $("#bodyRelExpressEmpresa tr").remove();
        });
        return false;
    }
    $("#envRelExpEmp").on('click', function() {
        $("#bodyRelExpressEmpresa tr").remove();
    });
    $("#fechRelExpEmp").on('click', function() {
        $("#bodyRelExpressEmpresa tr").remove();
    });
})

function openPopupAsoExpress(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/adminReportAsoExpress/asoExpress?" + data;
        window.open(url, "adminReportAsoExpress", "width=700, height=600");
        return false;
    }

    return false;
}