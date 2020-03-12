// ----- EMPRESA ---------//
$(document).ready(function() {
    $("#ModalEmpEvt2220").on('keyup', function() {
        var buscEvtEmp = $("#buscEmpEvt2220").val();

        if (buscEvtEmp != '') {
            $.ajax({
                url: BASE_URL + "/ajax2220/buscaEmpresaEvt",
                type: 'POST',
                datatype: 'json',
                cache: false,
                async: false,
                data: { buscEvtEmp: buscEvtEmp },
                success: function(data) {
                    json = data.replace(/(\r\n|\n|\r)/gm, "");
                    var json = $.parseJSON(json);
                    var html = '';
                    for (var i = 0; i < json.length && json != ''; ++i) {
                        html += '<tr id="trtr"> <td id="cdempevtmt">' + json[i].codempresa +
                            '</td> <td id="rzsempeevtmt">' + json[i].razaosocial +
                            '</td> <td id="ntmempevtmt">' + json[i].nrmatricula + '</td></tr>';
                    }
                    $('#bodyDdEmpresaEvt').html(html);
                    $('#bodyDdEmpresaEvt').show();
                },
            })
            return false;
        }
    })
    $("input[name=buscaDado_Emp]").keyup(function() { //pega o css da tabela 
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
            $("#bodyDdEmpresaEvt").on('click', 'tr', function(e) {
                e.preventDefault();
                $(this).toggleClass('ativo');
                $(this).siblings().removeClass('ativo');
                var cdempmt = $(this).find('td[id=cdempevtmt]').text();
                var rzempmt = $(this).find('td[id=rzsempeevtmt]').text();
                var nmemmt = $(this).find('td[id=ntmempevtmt]').text();
                jsonmonit = { 'codemp': cdempmt, 'razaoemp': rzempmt, 'numemp': nmemmt };
                pegarvlaso(jsonmonit);
            });
        });
    }

    function pegarvlaso(jsonmonit) {
        $("#enviaEvtMonit").on('click', function(e) {
            e.preventDefault();
            if (jsonmonit != '') {

                $("#idEmpresaEvt").val(jsonmonit.codemp);
                $("#matriculaEvt").val(jsonmonit.razaoemp);
                $("#razsocialEvt").val(jsonmonit.numemp);
            }
            carregarDadosParaFuncionarios();
            $("#bodyDdEmpresaEvt tr").remove();
        });
        //  return false;
    }
    $("#enviaEvtMonit").on('click', function() {
        $("#bodyDdEmpresaEvt tr").remove();
    });
    $("#fecharEvtMonit").on('click', function() {
        $("#bodyDdEmpresaEvt tr").remove();
    });
})

$("#EnviarMt2220").on('click', function() {
    alert("EU CONSIGO");
});

function updateDataTableSelectAllCtrl(table) {
    var $table = table.table().node();
    var $chkbox_all = $('tbody input[type="checkbox"]', $table);
    var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

    // If none of the checkboxes are checked
    if ($chkbox_checked.length === 0) {
        chkbox_select_all.checked = false;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = false;
        }

        // If all of the checkboxes are checked
    } else if ($chkbox_checked.length === $chkbox_all.length) {
        chkbox_select_all.checked = true;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = false;
        }

        // If some of the checkboxes are checked
    } else {
        chkbox_select_all.checked = true;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = true;
        }
    }
}

function carregarDadosParaFuncionarios() {
    var EvtEmp = $("#idEmpresaEvt").val();
    var rows_selected = [];
    $("#funcionario .table").dataTable({ "bDestroy": true }).fnDestroy();
    var datatable = $('#funcionario').DataTable({

        //"aaSorting": [[ 1, "asc" ]],
        "processing": true,
        //"serverSide": true,
        'columnDefs': [{
            'targets': 0,
            // 'checkboxes': {
            //     'selectRow': true
            //  },
            'searchable': false,
            'orderable': false,
            'width': '1%',
            'className': 'dt-body-center',
            'render': function(data, type, full, meta) {
                // var codFuncionarios = 0;
                return "<input type=checkbox name=codFuncionarios value='" + data + "'>";
            },
        }],
        "order": [
            [1, "asc"]
        ],
        'rowCallback': function(row, data, dataIndex) {
            // Get row ID
            var rowId = data[0];

            // If row ID is in the list of selected row IDs
            if ($.inArray(rowId, rows_selected) !== -1) {
                $(row).find('input[type="checkbox"]').prop('checked', true);
                $(row).addClass('selected');
            }
        },
        "language": {
            "lengthMenu": "Exibição _MENU_ Registros por página",
            "zeroRecords": "Nada encontrado - desculpe",
            "info": " Mostrando página _PAGE_ ate _PAGES_",
            "infoEmpty": "Nenhum registro disponível",
            "infoFiltered": "(filtrado de _MAX_ total linhas)",
            "search": "Procurar:",
            "paginate": {
                "first": "Primeiro",
                "last": "Último",
                "next": "Próximo",
                "previous": "Anterior"
            },
        },
        "ajax": {
            "url": BASE_URL + "/ajax2220/buscaFuncionariosEvt",
            "type": 'POST',
            "data": function(d) {
                d.empMonit = $("#idEmpresaEvt").val();
            },
            "dataSrc": ""
        },
        "columns": [
            { data: "codfuncionario" }, { data: "codempresa" }, { data: "razaosocial" },
            { data: "cpf" }, { data: "nomefuncionario" }, { data: "pis" },
            {
                data: "datcad",
                "render": function(data, type, row, meta) {
                    function dateToEN(date) {
                        return date.split('-').reverse().join('/');
                    };
                    return dateToEN(data);
                },
            },

        ],
        "bDestroy": true,
    });
    $("#funcionario").show();
    $('#funcionario tbody').on('click', 'input[type="checkbox"]', function(e) {
        var $row = $(this).closest('tr');

        // Get row data
        // table='';   
        var data = datatable.row($row).data();

        // Get row ID
        var rowId = data.codfuncionario;

        // Determine whether row ID is in the list of selected row IDs
        var index = $.inArray(rowId, rows_selected);

        // If checkbox is checked and row ID is not in list of selected row IDs
        if (this.checked && index === -1) {
            rows_selected.push(rowId);

            // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
        } else if (!this.checked && index !== -1) {
            rows_selected.splice(index, 1);
        }

        if (this.checked) {
            $row.addClass('selected');
        } else {
            $row.removeClass('selected');
        }

        // Update state of "Select all" control
        updateDataTableSelectAllCtrl(datatable);

        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    // Handle click on table cells with checkboxes
    $('#funcionario').on('click', 'tbody td, thead th:first-child', function(e) {
        $(this).parent().find('input[type="checkbox"]').trigger('click');
    });

    //  // Handle click on "Select all" control
    $('thead input[name="select_all"]', datatable.table().container()).on('click', function(e) {
        if (this.checked) {
            $('#funcionario tbody input[type="checkbox"]:not(:checked)').trigger('click');
        } else {
            $('#funcionario tbody input[type="checkbox"]:checked').trigger('click');
        }

        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    // Handle table draw event
    datatable.on('draw', function() {
        // Update state of "Select all" control
        updateDataTableSelectAllCtrl(datatable);
    });

    // Handle form submission event
    $('#frm-example').on('submit', function(e) {
        e.preventDefault();
        var form = this;
        var EvtEmp = $("#idEmpresaEvt").val();
        $('input[name="idEmpresa"]').val(EvtEmp);
        $('input[name="funcionario"]').text(rows_selected.join(","));
        carregaDadosFuncionario();

        //$('#example-console').text($(form).serialize());
        window.location.reload();
        // Remove added elements
        // $("#termo_body").remove();

        // Prevent actual form submission
    });
}


function carregaDadosFuncionario() {
    let cdfuncionario = $("input[name=funcionario").text();
    let cdEmpresa = $("#idEmpresaEvt").val();
    let matriculaEvt = $("#matriculaEvt").val();
    let razsocialEvt = $("#razsocialEvt").val();
    let tipoenvio = $("select[name=tipoenvio] option:selected").val();

    let codCarregar = 'Action';
    if (cdEmpresa != '' && cdEmpresa != null && matriculaEvt != '' && razsocialEvt != null && razsocialEvt != '' && tipoenvio != '') {
        if (cdfuncionario != '' && cdEmpresa != '') {
            $.ajax({
                type: 'POST',
                url: BASE_URL + '/sst2220/setFuncionario2220',
                data: { cdfuncionario: cdfuncionario, cdEmpresa: cdEmpresa, codCarregar: codCarregar, tipoenvio: tipoenvio },
                success: function(json) {
                    // json = json.replace(/(\r\n|\n|\r)/gm,"");
                    // json = json.replace(/\t/,"");
                    // var json = JSON.parse(json);

                    //$("#riscosFuncionarioAnalise option").remove();
                    var html = '';
                    for (var i = 0; i < json.length; i++) {
                        // combobox.append( $('<option>', {value: json[i].codrisco, text: json[i].descrisco})
                        //);
                        html += '<tr>' +
                            '<td>' + json[i].codexame + '</td>' +
                            '<td>' + json[i].nomeexame + '</td>' +
                            '<td>' + json[i].datvencimento + '</td>' +
                            '<td>' + json[i].codproced + '</td>' +
                            '<td>' + json[i].descproced + '</td>' +
                            '<td>' + json[i].tipoexameaso + '</td>';
                    }
                    $("#tbodyEvtMonit").append(html);
                    $("#tbodyEvtMonit").show(html);
                }
            })
        }
    } else {
        alert("Voce nao vai");
    }
}

$(document).ready(function() {
    var datatable = $('#evento2220').DataTable({
        // select: {
        //     style: 'multi'
        // },
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
            "url": BASE_URL + "/ajax2220/buscaGetExame2220",
            "type": 'POST',
            "data": function(d) {
                d.actionRisc = "action";
            },
            "dataSrc": ""
        },

        "columns": [

            { data: "codevtmonitcol" },
            { data: "razaosocial" },
            { data: "nomefuncionario" },
            {
                data: "datacriacao",
                "render": function(data, type, row, meta) {
                    date = new Date();

                    function dateToEN(date) {
                        return date.split('-').reverse().join('/');
                    };
                    return dateToEN(data);
                },
            },
            {
                data: "protocoloesocial",
                "render": function(data, type, row, meta) {

                    if (data == "ND") {
                        return '<input type="button" class="btn btn-info btn-sm" value="AGUADANDO ENVIO " disabled />';
                    } else if (data == null) {
                        return '<input type="button" class="btn btn-info btn-sm" value="AGUADANDO ENVIO " disabled />';
                    } else {
                        return '<input type="button" class="btn btn-info btn-sm" value="' + data + '" disabled />';
                    }
                }
            },

            {
                data: "nrrecibo",
                "render": function(data, type, row, meta) {

                    if (data == "ND") {
                        return '<button class="btn btn-warning btn-sm" disabled />ENVIADO</button>';
                    } else if (data == null) {
                        return '<a class="btn btn-success btn-sm" href="' + BASE_URL + '/envioLote/passoUmAtestado/" >' + 'GERADO' + '</a>';
                    } else {
                        return '<input type="button" class="btn btn-danger btn-sm" value="CONSULTADO " disabled />';

                    }
                }
            },
            {
                data: "codevtmonitcol",
                "render": function(data, type, row, meta) {
                    let v = row.nrrecibo;

                    if (row != '' && row.nrrecibo == "ND") {
                        return '<a class="btn btn-danger btn-sm" href="' + BASE_URL + '/sst2220/delete2220/' + data + '" >' + 'Delete' + '</a>';
                    } else if (row.nrrecibo == null) {
                        return '<a class="btn btn-danger btn-sm" href="' + BASE_URL + '/sst2220/delete2220/' + data + '" >' + 'Delete' + '</a>';
                    } else {
                        return '<button class="btn btn-danger btn-sm" disabled>' + 'Delete' + '</button>';
                    }


                }
            },
        ],
    });
    $("#evento2220").show();
})

//$(document).ready(function() {
function erro() {
    $("#erro2220").on('click', function(e) {
        e.preventDefault();
        $("#modalErro2220").modal('show');
        $.ajax({


        })
    })
}
//})