//Modal companies
$(function() {
    $("#ModalRelEmpresaCompany").on('keyup', function() {
        let buscRelEmpresa = $("#idreport_companyEmpresa").val();
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
                    $('#bodyRelEmpresaCompany').html(html);
                    $('#bodyRelEmpresaCompany').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableRelEmpresa]").keyup(function() { //pega o css da tabela 
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
            $("#bodyRelEmpresaCompany").on('click', 'tr', function(e) {
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
        $("#envRelEmp").on('click', function(e) {
            e.preventDefault();
            if (jsonRelEmpresa != '') {
                $("#Emp_CodCompany").val(jsonRelEmpresa.codigoEmpresa);
                $("#Emp_CnpjCompany").val(jsonRelEmpresa.cnpjEmpresa);
                $("#Emp_CpfCompany").val(jsonRelEmpresa.cpfEmpresa);
                $("#Emp_NameCompany").val(jsonRelEmpresa.nomeEmpresa);

            }
            $("#bodyRelEmpresaCompany tr").remove();
        });
        return false;
    }
    $("#envRelEmp").on('click', function() {
        $("#bodyRelEmpresaCompany tr").remove();
    });
    $("#fechRelEmp").on('click', function() {
        $("#bodyRelEmpresaCompany tr").remove();
    });
})


$(function() {
    $("#ModalRelatEmpresa").on('keyup', function() {
        var buscRelEmp = $("#relat_Empresa").val();
        var buscCodEmpresa = $("#Emp_CodCompany").val();
        console.log(buscCodEmpresa);

        if (buscRelEmp != '' && buscCodEmpresa != '') {

            $.ajax({
                url: BASE_URL + "/ajaxRelatoriosGeral/listRelatorioEmpresa",
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
                            '<td id="codrlempresa">' + json[i].codempresa +
                            '<td id="matrlempresa">' + json[i].nrmatricula +
                            '</td> <td id="nomrlempresa">' + json[i].razaosocial +
                            '</td></tr>';
                    }
                    $('#bodyRelatEmpresa').html(html);
                    $('#bodyRelatEmpresa').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableRelatEmpresa]").keyup(function() { //pega o css da tabela 
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
            $("#bodyRelatEmpresa").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodRlEmp = $(this).find('td[id=codrlempresa]').text();
                var valmatRelEmp = $(this).find('td[id=matrlempresa]').text();
                var valnameRelEmp = $(this).find('td[id=nomrlempresa]').text();
                jsondbEmpresa = { 'codrlempresa': valcodRlEmp, 'matrlempresa': valmatRelEmp, 'nomrlempresa': valnameRelEmp };
                pegarvlaso(jsondbEmpresa);
            });
        });
    }

    function pegarvlaso(jsondbEmpresa) {
        $("#envRelatEmp").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#Emp_CodEmpresa").val(jsondbEmpresa.codrlempresa);
                $("#Emp_CnpjEmpresa").val(jsondbEmpresa.matrlempresa);
                $("#Emp_NameEmpresa").val(jsondbEmpresa.nomrlempresa);
            }
            $("#bodyRelatEmpresa tr").remove();
        });
        return false;
    }
    $("#envRelatEmp").on('click', function() {
        $("#bodyRelatEmpresa tr").remove();
    });
    $("#fechRelatEmp").on('click', function() {
        $("#bodyRelatEmpresa tr").remove();
    });
})

function openPopupEmpresa(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/adminReportEmpresa/empresa?" + data;
        window.open(url, "adminReportEmpresa", "width=700, height=600");
        return false;
    }

    return false;
}