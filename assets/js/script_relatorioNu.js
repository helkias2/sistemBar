function relatorioNu_back() {
    window.location.href = BASE_URL + '/sstRelatorioNrUm';
};

$(function() {
    carregarDados();

    function carregarDados() {
        var datatable = $('#relatorioNrUm').DataTable({
            select: {
                style: 'multi'
            },
            "aaSorting": [
                [0, "desc"]
            ],
            "processing": true,
            "language": {
                "lengthMenu": "Exibição _MENU_ Registros por página",
                "zeroRecords": "Nada encontrado - desculpe",
                "info": " Mostrando página _PAGE_ ate _PAGES_",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "infoFiltered": "(filtrado de _MAX_ total linhas)",
                "search": "Pesquisar:",
                "paginate": {
                    "first": "Primeiro",
                    "last": "Último",
                    "next": "Próximo",
                    "previous": "Anterior"
                },
            },
            "ajax": {
                "url": BASE_URL + "/ajaxRelatorioNr/listDeclaracoesNrUm",
                "type": 'POST',
                "data": function(d) {
                    d.vlactionNr = "actionNr";

                },
                "dataSrc": ""
            },
            "columns": [
                { data: "codrelnr" },
                { data: "razaoempresa" },
                { data: "cnpjempresa" },
                {
                    data: "novo", // Atualizado 09/18/2019
                    "render": function(data, type, row, meta) {
                        if (row.novo[0] == 0) {
                            return row.chavedocument;
                        } else if (row.novo[0] != 0) {
                            return row.novo[0].uuidDoc;
                        }
                    }
                },
                {
                    data: "novo", //Atualizado 09/18/2019
                    "render": function(data, type, row, meta) {
                        if (row.novo[0] == 0) {
                            return '<a class="btn btn-info btn-sm">' + 'Cancelado' + '</a>';
                        } else if (row.novo[0].statusId == 1) {
                            return '<a class="btn btn-warning btn-sm">' + 'Processando' + '</a>';
                        } else if (row.novo[0].statusId == 2) {
                            return '<a class="btn btn-info btn-sm">' + 'Aguardando Signatários' + '</a>';
                        } else if (row.novo[0].statusId == 3) {
                            return '<a class="btn btn-info btn-sm">' + 'Aguardando Assinaturas' + '</a>';
                        } else if (row.novo[0].statusId == 4) {
                            return '<a class="btn btn-info btn-sm">' + 'Finalizado' + '</a>';
                        } else if (row.novo[0].statusId == 5) {
                            return '<a class="btn btn-info btn-sm">' + 'Arquivado' + '</a>';
                        }
                    }
                },
                { data: "nomeresponsavel" },
                {
                    data: "datcad",
                    "render": function(data, type, row, meta) {


                        function dateToEN(date) {
                            return date.split('-').reverse().join('/');
                        };
                        return dateToEN(data);
                    },
                },
                {
                    data: "codrelnr",
                    "render": function(data, type, row, meta) {

                        return '<button type="button" class="btn btn-primary btn-sm" id="btnrelatorioNr" data-row-id="' + data + '"><span class="fa fa-print fa-lg "> </span></button>';
                    }
                },
                {
                    data: "codrelnr",
                    "render": function(data, type, row, meta) {
                        console.log(data);
                        return '<a class="btn btn-danger btn-sm" href="' + BASE_URL + '/sstRelatorioNrUm/delete/' + data + '">' + 'Delete' + '</a>';
                    }
                },
            ],

        });

        $("#relatorioNrUm").show();
    }
})
$(document).ready(function() {
        $("#relatorioNrUm").on('click', '#btnrelatorioNr', function(e) {
            e.preventDefault();
            let valor = $(this).attr('data-row-id')
            var url = BASE_URL + "/sstRelatorioNrUm/viewRelatorio/" + valor;
            window.open(url, "sstAsoView1", "width=850,height=500");
        })
    })
    // ---------------------------EMPRESA
$(document).ready(function() {
    $("#NrResponcavel").on('keyup', function() {
        let buscEmpresa = $("#buscaResponcavelNrUm").val();
        if (buscEmpresa != '') {
            $.ajax({
                url: BASE_URL + "/ajaxRelatorioNr/getRelatorioNrEmpresa",
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { buscEmpresa: buscEmpresa },
                success: function(data) {

                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';

                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '  <tr id="trtr">' +
                            '<td id="codempresanr"> ' + json[i].codempresa + '</td>' +
                            '<td id="nomempresanr">' + json[i].razaosocial + '</td>' +
                            '<td id="cnpjempresanr">' + json[i].nrmatricula + '</td>' +
                            '<td id="nomeresp" style="display:none">' + json[i].nomerespempresa + '</td>' +
                            '<td id="cpfresp" style="display:none">' + json[i].cpfresponsavel + '</td>' +
                            '<td id="telresp" style="display:none">' + json[i].telresponsavel + '</td>' +
                            '<td id="emailresp" style="display:none">' + json[i].emailresponsavel + '</td>' +
                            '<td id="nisresp" style="display:none">' + json[i].nitresponsavel + '</td>' +
                            '</tr>';
                    }
                    $('#tabelamodalResponcavelNrUm').html(html);
                    $('#tabelamodalResponcavelNrUm').show();
                },
            })
            return false;
        }
    })
    $("input[name=tablemodalResponcavelNr]").keyup(function() { //pega o css da tabela 
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
            $("#tabelamodalResponcavelNrUm").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodNrEmp = $(this).find('td[id=codempresanr]').text();
                var valnomeNrEmp = $(this).find('td[id=nomempresanr]').text();
                var valcnpjNrEmp = $(this).find('td[id=cnpjempresanr]').text();
                var nomeresp = $(this).find('td[id=nomeresp]').text();
                var cpfresp = $(this).find('td[id=cpfresp]').text();
                var telresp = $(this).find('td[id=telresp]').text();
                var emailresp = $(this).find('td[id=emailresp]').text();
                var nisresp = $(this).find('td[id=nisresp]').text();

                jsondbEmpresa = { 'codigoEmpresaUm': valcodNrEmp, 'nomedbEmpresaUm': valnomeNrEmp, 'cnpjEmpresaUm': valcnpjNrEmp, 'nomerespnr': nomeresp, 'cpfrespnr': cpfresp, 'telrespnr': telresp, 'emailrespnr': emailresp, 'nisrespnr': nisresp };
                pegarvlaso(jsondbEmpresa);
            });
        });
    }

    function pegarvlaso(jsondbEmpresa) {
        $("#enviarespNr").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#codEmpresaNR").val(jsondbEmpresa.codigoEmpresaUm);
                $("#idEmpresaNr").val(jsondbEmpresa.cnpjEmpresaUm);
                $("#razsocialNr").val(jsondbEmpresa.nomedbEmpresaUm);

                $("#nomeRespEmpresa_Nr").val(jsondbEmpresa.nomerespnr);
                $("#cpfResp_Nr").val(jsondbEmpresa.cpfrespnr);
                $("#teleResp_Nr").val(jsondbEmpresa.telrespnr);
                $("#emailRespEmpresa_Nr").val(jsondbEmpresa.emailrespnr);
                $("#nisResp_Nr").val(jsondbEmpresa.nisrespnr);

            }
            $("#tabelamodalResponcavelNrUm tr").remove();
        });
        return false;
    }
    $("#enviarespNr").on('click', function() {
        $("#tabelamodalResponcavelNrUm tr").remove();
    });
    $("#fecharespNr").on('click', function() {
        $("#tabelamodalResponcavelNrUm tr").remove();
    });
})


//------------------------------------------------------RESPONSAVEL
$(document).ready(function() {
    $("#RespNrUm").on('keyup', function() {
        let buscRespNu = $("#ResponcavelNrUm").val();
        if (buscRespNu != '') {
            $.ajax({
                url: BASE_URL + "/ajaxRelatorioNr/getRelatorioNrResp",
                type: 'POST',
                datatype: 'json',
                async: false,
                data: { buscRespNu: buscRespNu },
                success: function(data) {

                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';

                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '  <tr id="trtr"> <td id="codrespnr">' +
                            json[i].codresp + '</td> <td id="nomerespnr">' +
                            json[i].nomeresponsavel + '</td><td id="cpfrespnr">' +
                            json[i].cpf + '</td></tr>';
                    }
                    $('#bodyResponcavelNrUm').html(html);
                    $('#bodyResponcavelNrUm').show();
                },
            })
            return false;
        }
    })
    $("input[name=tableResponcavelNrUm]").keyup(function() { //pega o css da tabela 
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
            $("#bodyResponcavelNrUm").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var valcodNrResp = $(this).find('td[id=codrespnr]').text();
                var valnomeNrResp = $(this).find('td[id=nomerespnr]').text();
                var valcpfNrResp = $(this).find('td[id=cpfrespnr]').text();
                jsondbEmpresa = { 'codigoRespUm': valcodNrResp, 'nomeRespUm': valnomeNrResp, 'cpfRespUm': valcpfNrResp };
                pegarvlaso(jsondbEmpresa);
            });
        });
    }

    function pegarvlaso(jsondbEmpresa) {
        $("#enviaRespNrUm").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#codRespNR").val(jsondbEmpresa.codigoRespUm);
                $("#nrcodRespUm").val(jsondbEmpresa.cpfRespUm);
                $("#nrNomRespUm").val(jsondbEmpresa.nomeRespUm);
            }
            $("#bodyResponcavelNrUm tr").remove();
        });
        return false;
    }
    $("#enviaRespNrUm").on('click', function() {
        $("#bodyResponcavelNrUm tr").remove();
    });
    $("#fechaRespNrUm").on('click', function() {
        $("#bodyResponcavelNrUm tr").remove();
    });
})


$(document).ready(function() {

    var sig = $('#sig').signature();
    $('#clear').click(function() {
        sig.signature('clear');
        $("#assinaturahide").val('');
    });

    $("#salv").on('click', function() {
        let toNovoData = sig.signature('toDataURL', 'image/jpg', 0.8)
        let toNovoDado = toNovoData.replace(/^data:image\/(png|jpg);base64,/, '');
        $("#assinaturahide").val(toNovoDado);

    });

})

//$(document).ready(function() {
// //  $("#modalCadAssinatura").on('keyup', function() {
// $(function() {
//     d4sign.configure({
//         container: "signature-div",
//         key: "aecc711c-76cd-4e09-bac3-deb99833a971",
//         protocol: "https",
//         host: "secure.d4sign.com.br/embed/viewblob",
//         signer: {
//             email: "email@signatario.com"
//                 // display_name: "Nome do Signatário", //optional,
//                 // documentation: "123.321.123-40", //optional,
//                 // birthday: "22/11/1983", //optional,
//                 // disable_preview: "0", //optional
//                 // key_signer: "{CHAVE-DO-SIGNATARIO}"
//         },
//         width: '600',
//         height: '400',
//         callback: function(event) {
//             if (event.data === "signed") {
//                 alert('ASSINADO');
//             }
//         }
//     });
// })

//})

// $(document).ready(function() {

//     var sig = $('#signat').signature();
//     $('#Limpar').click(function() {
//         sig.signature('clear');
//         $("#assinatProfhide").val('');
//     });

//     $("#salve").on('click', function() {

//         let toNovoData = sig.signature('toDataURL', 'image/jpg', 0.8)
//         let toNovoDado = toNovoData.replace(/^data:image\/(png|jpg);base64,/, '');
//         $("#assinatProfhide").val(toNovoDado);

//     });

// })



$(document).ready(function() {
    $("#buscaCertificadoNr").on('keyup', function() {
        //   let codEmpresaCert = $("#idEmpresaNr").val();
        let numeroCert = $("#certNrUm").val();

        if (numeroCert != '') {
            $.ajax({
                url: BASE_URL + "/ajaxRelatorioNr/buscaCertificadoNrUm",
                type: "POST",
                async: false,
                cache: false,
                datatype: "json",
                data: { numeroCert: numeroCert },
                success: function(response) {

                    json = response.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';

                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '  <tr id="trtr"> ' +
                            '<td id="tipIncCert">' + json[i].tpinscricao + '</td>' +
                            '<td id="incricaoCert">' + json[i].inscricao + '</td>' +
                            '<td id="apelidCert">' + json[i].apelido + '</td>' +
                            '<td id="nomerealCert" style="display:none">' + json[i].nomereal + '</td>' +
                            '<td id="titulaCert" style="display:none">' + json[i].titularcertificado + '</td></tr>';
                    }
                    $('#bodyCertificadoNrUm').html(html);
                    $('#bodyCertificadoNrUm').show();
                },
                error: function() {
                    alert("Error");
                }
            })
        } else {
            alert("Deu Errado!");
        }

    })

    $("input[name=tableCertificadoNrUm]").keyup(function() { //pega o css da tabela 
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
            $("#bodyCertificadoNrUm").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var tipIncCert = $(this).find('td[id=tipIncCert]').text();
                var incricaoCert = $(this).find('td[id=incricaoCert]').text();
                var apelidCert = $(this).find('td[id=apelidCert]').text();
                var nomerealCert = $(this).find('td[id=nomerealCert]').text();
                var titulaCert = $(this).find('td[id=titulaCert]').text();
                jsondbEmpresa = { 'tipoIncCert': tipIncCert, 'incricaoCertnr': incricaoCert, 'apelidoCert': apelidCert, 'nomeCert': nomerealCert, 'titula': titulaCert };
                pegarvlaso(jsondbEmpresa);
            });
        });
    }

    function pegarvlaso(jsondbEmpresa) {
        $("#enviaCertNrUm").on('click', function(e) {
            e.preventDefault();
            if (jsondbEmpresa != '') {
                $("#codCertDig").val(jsondbEmpresa.tipoIncCert);
                $("#codCertDigCNPJ").val(jsondbEmpresa.incricaoCertnr);
                $("#nrApelidoCert_Dig").val(jsondbEmpresa.apelidoCert);
                $("#nrChaveCert_Dig").val(jsondbEmpresa.nomeCert);
                $("#nrNomeCertDigital").val(jsondbEmpresa.titula);


            }
            $("#bodyCertificadoNrUm tr").remove();
        });
        return false;
    }
    $("#enviaCertNrUm").on('click', function() {
        $("#bodyCertificadoNrUm tr").remove();
    });
    $("#fechaCertNrUm").on('click', function() {
        $("#bodyCertificadoNrUm tr").remove();
    });

});


$(document).ready(function() {

    $("#ModalAssinaturaD4sign").on('click', function() {
        let actionToken = 'token';
        $.ajax({
            url: BASE_URL + '/ajaxRelatorioNr/listSafes',
            type: 'POST',
            datatype: 'json',
            data: { actionToken: actionToken },
            success: function(json) {
                // var json = Object.entries(json)
                console.log(json);
                json = json.replace(/(\r\n|\n|\r)/gm, "");
                var json = $.parseJSON(json);

                var html = '';

                for (var i = 0; i < json.length && json != ''; ++i) {
                    html += '  <tr id="trtr">' +
                        '<td id="safeNm">' + json[i].nome + '</td>' +
                        '<td id="safechv">' + json[i].chave + '</td>' +
                        '</tr>';
                }
                $('#bodyListD4sign').html(html);
                $('#bodyListD4sign').show();
            },
            error: function() {
                alert("Error");
            }
        })

    })
    $("input[name=tableD4sign]").keyup(function() { //pega o css da tabela 
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
            $("#bodyListD4sign").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var safeNm = $(this).find('td[id=safeNm]').text();
                var safechv = $(this).find('td[id=safechv]').text();

                jsonToken = { 'safeNome': safeNm, 'safeChave': safechv };
                pegarvlaso(jsonToken);
            });
        });
    }

    function pegarvlaso(jsonToken) {
        $("#enviasafeNr").on('click', function(e) {
            e.preventDefault();
            if (jsonToken != '') {
                $("#nomeSafe_Nr").val(jsonToken.safeNome);
                $("#chaveSafe_Nr").val(jsonToken.safeChave);

            }
            $("#bodyListD4sign tr").remove();
        });
        return false;
    }
    $("#enviasafeNr").on('click', function() {
        $("#bodyListD4sign tr").remove();
    });
    $("#fechasafe").on('click', function() {
        $("#bodyListD4sign tr").remove();
    });


})