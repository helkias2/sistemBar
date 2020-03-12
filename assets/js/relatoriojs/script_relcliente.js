$(document).ready(function() {
    $("#ModalRelatotioGeral").on('keyup', function() {
        let buscRelEmpresa = $("#relClienteGeral").val();
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
                        html += '<tr id="trtr"> <td id="iddbempresa">' + json[i].idcompanies +
                            '</td><td id="cnpjdbempresa">' + json[i].cnpj +
                            '</td><td id="cpfdbempresa">' + json[i].cpf +
                            '</td> <td id="nomdbempresa">' + json[i].razaosocial +
                            '</td></tr>';
                    }
                    $('#bodyRelCliente').html(html);
                    $('#bodyRelCliente').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableRelCliente]").keyup(function() { //pega o css da tabela 
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
            $("#bodyRelCliente").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodDbEmp = $(this).find('td[id=iddbempresa]').text();
                var valnomeDbEmp = $(this).find('td[id=nomdbempresa]').text();
                var valcnpjDbEmp = $(this).find('td[id=cnpjdbempresa]').text();
                var valcpfDbEmp = $(this).find('td[id=cpfdbempresa]').text();
                jsondbEmpresa = { 'codigoEmpresa': valcodDbEmp, 'nomedbEmpresa': valnomeDbEmp, 'cnpjEmpresa': valcnpjDbEmp, 'cpfEmpresa': valcpfDbEmp };
                pegarvlaso(jsondbEmpresa);
            });
        });
    }

    function pegarvlaso(jsondbEmpresa) {
        $("#enviaRelCliente").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#rel_codCompanyView").val(jsondbEmpresa.codigoEmpresa);
                $("#rel_CnpjCompany").val(jsondbEmpresa.cnpjEmpresa);
                $("#rel_CpfCompany").val(jsondbEmpresa.cpfEmpresa);
                $("#rel_NameCompany").val(jsondbEmpresa.nomedbEmpresa);

            }
            $("#bodyRelCliente tr").remove();
        });
        return false;
    }
    $("#enviaRelCliente").on('click', function() {
        $("#bodyRelCliente tr").remove();
    });
    $("#fechaRelCliente").on('click', function() {
        $("#bodyRelCliente tr").remove();
    });
})


$(document).ready(function() {
    $("#ModalRelatotioEmpresa").on('keyup', function() {
        let buscRelEmp = $("#relEmpresaGeral").val();
        let buscCodEmpresa = $("#rel_codCompanyView").val();

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
                    $('#bodyRelEmpresa').html(html);
                    $('#bodyRelEmpresa').show();
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
            $("#bodyRelEmpresa").on('click', 'tr', function(e) {
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
        $("#envRelEmp").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#rel_CodEmpresa").val(jsondbEmpresa.codrlempresa);
                $("#rel_CnpjEmpresa").val(jsondbEmpresa.matrlempresa);
                $("#rel_NameEmpresa").val(jsondbEmpresa.nomrlempresa);
            }
            $("#bodyRelEmpresa tr").remove();
        });
        return false;
    }
    $("#envRelEmp").on('click', function() {
        $("#bodyRelEmpresa tr").remove();
    });
    $("#fechRelEmp").on('click', function() {
        $("#bodyRelEmpresa tr").remove();
    });
})