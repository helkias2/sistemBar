$(function() {
    carregarDados();

    function carregarDados() {
        var rows_selected = [];
        var datatable = $('#companiesModulo_data').DataTable({
            select: {
                style: 'multi'
            },
            "aaSorting": [
                [0, "desc"]
            ],
            "processing": true,
            "language": {
                "lengthMenu": "Exibição MENU Registros por página",
                "zeroRecords": "Nada encontrado - desculpe",
                 "sInfo": "Mostrando _START_ / _END_ de _TOTAL_ registro(s)",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "infoFiltered": "(filtrado de MAX total linhas)",
                "search": "Pesquisar:",
                "paginate": {
                    "first": "Primeiro",
                    "last": "Último",
                    "next": "Próximo",
                    "previous": "Anterior"
                },
            },
            "ajax": {
                "url": BASE_URL + "/ajaxModuloCompanies/listCompanies",
                "type": 'POST',
                "data": function(d) {
                    d.vlactioncompanies = "action";
                },
                "dataSrc": ""
            },
            "columns": [
                { data: "idcompanies" },
                { data: "razaosocial" },
                { data: "cnpj" },
                  {
                    data: "qtdUser",
                    "render": function(data, type, row, meta) {
                        var valor = String(data.qtdUser);
                      
                        if (valor === 'undefined') {
                            return '<a class="btn btn-info btn-sm">' + 'Zero' + '</a>';
                        } else {
                            return '<a class="btn btn-warning btn-sm" >' + valor + '</a>';

                        }
                    }
                },
                {
                    data: "datacadastro",
                    "render": function(data, type, row, meta) {
                       

                        function dateToEN(date) {
                            return date.split('-').reverse().join('/');
                        };
                        return dateToEN(data);
                    },
                },
                {
                    data: "statuscompanies",
                    "render": function(data, type, row, meta) {
                        if (data === 'c') {
                            return '<a class="btn btn-warning btn-sm" href="' + BASE_URL + '/adminCompanies/ativarCompanies/' + row.idcompanies + '" value="' + data + '">' + 'DESATIVADA' + '</a>';
                        } else {
                            return '<a class="btn btn-info btn-sm" href="' + BASE_URL + '/adminCompanies/deleteCompanies/' + row.idcompanies + '"  >' + 'ATIVA' + '</a>';
                        }
                    }
                },
                {
                    data: "idcompanies",
                    "render": function(data, type, row, meta) {
                        return '<a class="btn btn-primary btn-sm" href="' + BASE_URL + '/adminCompanies/editCompanies/' + data + '">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>';
                    }
                },
                {
                    data: "idcompanies",
                    "render": function(data, type, row, meta) {
                   
                        return '<a class="btn btn-primary btn-sm" href="' + BASE_URL + '/adminModulosCompanies/editModuloCompanies/' + data + '">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>';
                    }
                },
            ],

        });
        // $('#funcionario tbody').on( 'click', 'button', function () {
        //     var data = table.row( $(this).parents('tr') ).data();
        //     alert( data[0] +"'s salary is: "+ data[ 8 ] );
        // });

        $("#companiesModulo_data").show();
    }
})