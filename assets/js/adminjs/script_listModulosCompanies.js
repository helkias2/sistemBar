$(function() {
    carregarDados();

    function carregarDados() {
        var rows_selected = [];
        var datatable = $('#listModulo_data').DataTable({
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
                "url": BASE_URL + "/ajaxModuloCompanies/listModulosCompanies",
                "type": 'POST',
                "data": function(d) {
                    d.vlcompanies = "action";
                },
                "dataSrc": ""
            },
            "columns": [
                { data: "id_companies" },
                { data: "codcompany" },
                { data: "nome_modulo" },
                { data: "qtdModulos" },
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
                    data: "status_companies",
                    "render": function(data, type, row, meta) {
                        if (data === 'c') {
                            return '<a class="btn btn-warning btn-sm" value="' + data + '">' + 'DESATIVADA' + '</a>';
                        } else {
                            return '<a class="btn btn-info btn-sm">' + 'ATIVA' + '</a>';
                        }
                    }
                },
                {
                    data: "id_companies",
                    "render": function(data, type, row, meta) {
                        console.log(data);
                        return '<a class="btn btn-primary btn-sm" href="' + BASE_URL + '/adminModulosCompanies/editModuloCompanies/' + data + '">' + '<span class="fa fa-print fa-lg "> <span>' + '</a>';
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

        $("#listModulo_data").show();
    }
})