$(document).ready(function() {
    $("#ModalRelExameCompany").on('keyup', function() {
        let buscRelEmpresa = $("#rel_ExameComp").val();
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
                        html += '<tr id="trtr"> <td id="iddbexame">' + json[i].idcompanies +
                            '</td><td id="cnpjdbexame">' + json[i].cnpj +
                            '</td><td id="cpfdbexame">' + json[i].cpf +
                            '</td> <td id="nomdbexame">' + json[i].razaosocial +
                            '</td></tr>';
                    }
                    $('#bodyRelExameCompany').html(html);
                    $('#bodyRelExameCompany').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableRelExameCompany]").keyup(function() { //pega o css da tabela 
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
            $("#bodyRelExameCompany").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodDbExam = $(this).find('td[id=iddbexame]').text();
                var valnomeDbExam = $(this).find('td[id=nomdbexame]').text();
                var valcnpjDbExam = $(this).find('td[id=cnpjdbexame]').text();
                var valcpfDbExam = $(this).find('td[id=cpfdbexame]').text();
                jsondbExame = { 'codigoExam': valcodDbExam, 'nomedbExam': valnomeDbExam, 'cnpjExam': valcnpjDbExam, 'cpfExam': valcpfDbExam };
                pegarvlaso(jsondbExame);
            });
        });
    }

    function pegarvlaso(jsondbExame) {
        $("#envRelExameComp").on('click', function(e) {
            e.preventDefault();
            if (jsondbExame != '') {
                $("#Exam_codCompanyView").val(jsondbExame.codigoExam);
                $("#Exam_CnpjCompany").val(jsondbExame.cnpjExam);
                $("#Exam_CpfCompany").val(jsondbExame.cpfExam);
                $("#Exam_NameCompany").val(jsondbExame.nomedbExam);

            }
            $("#bodyRelExameCompany tr").remove();
        });
        return false;
    }
    $("#envRelExameComp").on('click', function() {
        $("#bodyRelExameCompany tr").remove();
    });
    $("#fechRelExameComp").on('click', function() {
        $("#bodyRelExameCompany tr").remove();
    });
})


$(document).ready(function() {
    $("#ModalRelExameEmpresa").on('keyup', function() {
        let buscRelEmp = $("#relExameEmpresaGeral").val();
        let buscCodEmpresa = $("#Exam_codCompanyView").val();

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
                            '<td id="codrlexempresa">' + json[i].codempresa +
                            '<td id="matrlexempresa">' + json[i].nrmatricula +
                            '</td> <td id="nomrlexempresa">' + json[i].razaosocial +
                            '</td></tr>';
                    }
                    $('#bodyRelExameEmpresa').html(html);
                    $('#bodyRelExameEmpresa').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableRelExameEmpresa]").keyup(function() { //pega o css da tabela 
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
            $("#bodyRelExameEmpresa").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodRlExEmp = $(this).find('td[id=codrlexempresa]').text();
                var valmatRelExEmp = $(this).find('td[id=matrlexempresa]').text();
                var valnameRelExEmp = $(this).find('td[id=nomrlexempresa]').text();
                jsondbEmpresa = { 'codrlexempresa': valcodRlExEmp, 'matrlempresa': valmatRelExEmp, 'nomrlempresa': valnameRelExEmp };
                pegarvlaso(jsondbEmpresa);
            });
        });
    }

    function pegarvlaso(jsondbEmpresa) {
        $("#envRelExamEmp").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#Exam_CodEmpresa").val(jsondbEmpresa.codrlexempresa);
                $("#Exam_CnpjEmpresa").val(jsondbEmpresa.matrlempresa);
                $("#Exam_NameEmpresa").val(jsondbEmpresa.nomrlempresa);
            }
            $("#bodyRelExameEmpresa tr").remove();
        });
        return false;
    }
    $("#envRelExamEmp").on('click', function() {
        $("#bodyRelExameEmpresa tr").remove();
    });
    $("#fechRelExamEmp").on('click', function() {
        $("#bodyRelExameEmpresa tr").remove();
    });
})

function openPopupExame(obj) {
    let data = $(obj).serialize();
    if (data != '') {
        let url = BASE_URL + "/adminReportExame/exame?" + data;
        window.open(url, "adminReportExame", "width=700, height=600");
        return false;
    } else {
        let url = BASE_URL + "/adminReportExame/erro"
        window.open(url, "adminReportExame2", "width=700, height=600");
    }

    return false;
}