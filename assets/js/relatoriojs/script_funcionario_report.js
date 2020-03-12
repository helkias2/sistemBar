$(document).ready(function() {
    $("#ModalRelFuncionarioCompany").on('keyup', function() {
        let buscRelEmpresa = $("#relFunc_Cliente").val();
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
                        html += '<tr id="trtr"> <td id="idFuncionairioComp">' + json[i].idcompanies +
                            '</td><td id="cnpjFuncionairioComp">' + json[i].cnpj +
                            '</td><td id="cpfFuncionairioComp">' + json[i].cpf +
                            '</td> <td id="nomFuncionairioComp">' + json[i].razaosocial +
                            '</td></tr>';
                    }
                    $('#bodyRelFuncCliente').html(html);
                    $('#bodyRelFuncCliente').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableRelFuncCliente]").keyup(function() { //pega o css da tabela 
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
            $("#bodyRelFuncCliente").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodDbFunc = $(this).find('td[id=idFuncionairioComp]').text();
                var valnomeDbFunc = $(this).find('td[id=nomFuncionairioComp]').text();
                var valcnpjDbFunc = $(this).find('td[id=cnpjFuncionairioComp]').text();
                var valcpfDbFunc = $(this).find('td[id=cpfFuncionairioComp]').text();
                jsondbExame = { 'codigoFunc': valcodDbFunc, 'nomedbFunc': valnomeDbFunc, 'cnpjFunc': valcnpjDbFunc, 'cpfFunc': valcpfDbFunc };
                pegarvlaso(jsondbExame);
            });
        });
    }

    function pegarvlaso(jsondbExame) {
        $("#env_RelFunc").on('click', function(e) {
            e.preventDefault();
            if (jsondbExame != '') {
                $("#Func_CodCompanyView").val(jsondbExame.codigoFunc);
                $("#Func_CnpjCompany").val(jsondbExame.cnpjFunc);
                $("#Func_CpfCompany").val(jsondbExame.cpfFunc);
                $("#Func_NameCompany").val(jsondbExame.nomedbFunc);

            }
            $("#bodyRelFuncCliente tr").remove();
        });
        return false;
    }
    $("#env_RelFunc").on('click', function() {
        $("#bodyRelFuncCliente tr").remove();
    });
    $("#fech_RelFunc").on('click', function() {
        $("#bodyRelFuncCliente tr").remove();
    });
})


$(document).ready(function() {
    $("#ModalRelatFuncionarioEmpresa").on('keyup', function() {
        let buscRelEmp = $("#form_RelatEmpresa").val();
        let buscCodEmpresa = $("#Func_CodCompanyView").val();

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
                            '<td id="codfrlempresa">' + json[i].codempresa +
                            '<td id="matfrlempresa">' + json[i].nrmatricula +
                            '</td> <td id="nomfrlempresa">' + json[i].razaosocial +
                            '</td></tr>';
                    }
                    $('#bodyFormRelatEmpresa').html(html);
                    $('#bodyFormRelatEmpresa').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableFormRelatEmpresa]").keyup(function() { //pega o css da tabela 
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
            $("#bodyFormRelatEmpresa").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodFRlEmp = $(this).find('td[id=codfrlempresa]').text();
                var valmatFRelEmp = $(this).find('td[id=matfrlempresa]').text();
                var valnameFRelEmp = $(this).find('td[id=nomfrlempresa]').text();
                jsondbEmpresa = { 'codempresa': valcodFRlEmp, 'matempresa': valmatFRelEmp, 'nomempresa': valnameFRelEmp };
                pegarvlaso(jsondbEmpresa);
            });
        });
    }

    function pegarvlaso(jsondbEmpresa) {
        $("#envFormEmp").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#Func_CodEmpresa").val(jsondbEmpresa.codempresa);
                $("#Func_CnpjEmpresa").val(jsondbEmpresa.matempresa);
                $("#Func_NameEmpresa").val(jsondbEmpresa.nomempresa);
            }
            $("#bodyFormRelatEmpresa tr").remove();
        });
        return false;
    }
    $("#envFormEmp").on('click', function() {
        $("#bodyFormRelatEmpresa tr").remove();
    });
    $("#fechFormEmp").on('click', function() {
        $("#bodyFormRelatEmpresa tr").remove();
    });
})

function openPopupFuncionarios(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/adminReportFuncionario/funcionario?" + data;
        window.open(url, "adminReportFuncionario", "width=700, height=600");
        return false;
    }
    return false;
}