$(function() {
    carregarDados();

    function carregarDados() {
        var rows_selected = [];
        var datatable = $('#companiesUsers_data').DataTable({
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
                "info": " Mostrando página PAGE ate PAGES",
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
                { data: "cpf" },
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
                            return '<a class="btn btn-warning btn-sm" value="' + data + '">' + 'DESATIVADA' + '</a>';
                        } else {
                            return '<a class="btn btn-info btn-sm">' + 'ATIVA' + '</a>';
                        }
                    }
                },
                {
                    data: "idcompanies",
                    "render": function(data, type, row, meta) {
                        return '<a class="btn btn-primary btn-sm" href="' + BASE_URL + '/adminCompanies/editCompanies/' + data + '">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>';
                    }
                },
                // { data: "idcompanies",
                //     "render": function (data, type, row, meta) { 
                //             return '<a class="btn btn-danger btn-sm" href="'+BASE_URL+'/adminCompanies/deleteCompanies/' + data +'">' + '<span class="fa fa-trash fa-lg"> <span>' + '</a>'; }
                // },
            ],

        });
        // $('#funcionario tbody').on( 'click', 'button', function () {
        //     var data = table.row( $(this).parents('tr') ).data();
        //     alert( data[0] +"'s salary is: "+ data[ 8 ] );
        // });

        $("#companiesUsers_data").show();
    }
})