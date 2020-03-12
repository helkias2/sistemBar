/*-----------------------VALIDAÇÃO CNPJ----------------------*/
/*
$(function(){
	$("#companies_cnpj").on('keyup', function(){
		
		var busca_cnpj = $('#companies_cnpj').val();
		console.log(busca_cnpj);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxCadCompanies/valCnpj',
			data:{busca_cnpj:busca_cnpj},
			success:function(retorno){

				if (retorno == 'true') {

					alert("ESTE CNPJ JÁ EXISTE NA BASE DE DADOS!");
					//console.log("esse cnpj já existe!");
					
				}else{
					//console.log("cnpj inexistente!");
				}

				//console.log(retorno);			
			}
		});
	});
});

/*-----------------------VALIDAÇÃO CPF----------------------
$(function(){
	$("#companies_cpf").on('keyup', function(){
		
		var busca_cpf = $('#companies_cpf').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxCadCompanies/valCpf',
			data:{busca_cpf:busca_cpf},
			success:function(retorno){

				if (retorno == 'true') {

					alert("ESTE CPF JÁ EXISTE NA BASE DE DADOS!");
					//console.log("esse cnpj já existe!");
					
				}else{
					//console.log("cnpj inexistente!");
				}

				//console.log(retorno);			
			}
		});
	});
});

/*-----------------------VALIDAÇÃO EMIAL----------------------
/*$(function(){
	$("#companies_email").on('keyup', function(){
		
		var busca_email = $('#companies_email').val();
		//console.log(busca);	

		$.ajax({
			type:'POST',
			url:BASE_URL+'/ajaxCadCompanies/valEmail',
			data:{busca_email:busca_email},
			success:function(retorno){

				if (retorno == 'true') {

					alert("ESTE EMAIL JÁ EXISTE NA BASE DE DADOS!");
					//console.log("esse cnpj já existe!");
					
				}else{
					//console.log("cnpj inexistente!");
				}

				//console.log(retorno);			
			}
		});
	});
});
*/

/*-----------------------VALIDAÇÃO DOS DIGITOS DO CNPJ----------------------*/
function validaCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

// -------------------Valida os digitos do CPF----------------------// 
function validaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.replace(/[^\d]+/g, '');
    if (strCPF == "00000000000") return false;
    if (strCPF == "11111111111") return false;
    if (strCPF == "22222222222") return false;
    if (strCPF == "33333333333") return false;
    if (strCPF == "44444444444") return false;
    if (strCPF == "55555555555") return false;
    if (strCPF == "66666666666") return false;
    if (strCPF == "77777777777") return false;
    if (strCPF == "88888888888") return false;
    if (strCPF == "99999999999") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}


function ajaxValidados(dados) {
    if (dados != '' && dados == 1) {
        $("#companies_cnpj").on('keyup', function() {
            var valorcnpj = $('#companies_cnpj').val();
            if (valorcnpj.length > 17 && valorcnpj != '' && valorcnpj.length <= 18) {
                if (validaCNPJ(valorcnpj) == true) {
                    let busca_cnpj = valorcnpj;

                    conexaoAjax(busca_cnpj);
                } else {
                    alert("ESTE CNPJ NAO E VALIDO!");
                    $('#companies_cnpj').css({ "background": "#FF6347" }).focus();
                    $("#companies_cnpj").val('');
                }
            }
        })
    } else if (dados != '' && dados == 2) {
        $("#companies_cnpj").on('keyup', function() {

            var valorcpf = $('#companies_cnpj').val();

            if (valorcpf.length > 13 && valorcpf != '' && valorcpf.length <= 14) {
                if (validaCPF(valorcpf) == true) {
                    let valorCPF = valorcpf;

                    conexaoAjax(valorCPF);
                } else {
                    alert("ESTE CPF NAO E VALIDO!");
                    $('#companies_cnpj').css({ "background": "#FF6347" }).focus();
                    $("#companies_cnpj").val('');
                }
            }
        });
    }
}

function conexaoAjax(valor) {
    let busca_cnpj = valor;
    $.ajax({
        type: 'POST',
        url: BASE_URL + '/ajaxCadCompanies/valCnpj',
        data: { busca_cnpj: busca_cnpj },
        success: function(retorno) {

            if (retorno == 'true') {

                alert("ESTE DADO JÁ EXISTE!");
                $('#companies_cnpj').css({ "background": "#FF6347" }).focus();
                $("#companies_cnpj").val('');
            }
        }
    });
}

$(function() {

    $('#select--cnpj').on('blur', function() {
        let selectdoc = $("#select--cnpj option:selected").val();

        if (selectdoc == 1 && selectdoc != '') {
            $('#companies_cnpj').val('');
            $('#companies_cnpj').prop("disabled", false);
            $('#companies_cnpj').mask("00.000.000/0000-00");
            $("#companies_cnpj").focus(); // seta focus

            ajaxValidados(selectdoc);
        } else if (selectdoc == 2 && selectdoc != '') {
            $('#companies_cnpj').val('');
            $('#companies_cnpj').prop("disabled", false);
            $('#companies_cnpj').mask("000.000.000-00");
            $("#companies_cnpj").focus(); // seta focus
            ajaxValidados(selectdoc);
        } else {
            $("#select--cnpj").focus();
        }
    })

});

/*-----------------------VALIDAÇÃO CPF----------------------*/
$(function() {
    $("#companies_cpf").on('keyup', function() {
        var buscacpf = $('#companies_cpf').val();
        if (buscacpf.length > 13 && buscacpf != '' && buscacpf.length <= 14) {
            if (validaCPF(buscacpf) == true) {
                let busca_cpf = buscacpf;

                $.ajax({
                    type: 'POST',
                    url: BASE_URL + '/ajaxCadCompanies/valCnpj',
                    data: { busca_cpf: busca_cpf },
                    success: function(retorno) {

                        if (retorno == 'true') {

                            alert("ESTE CPF JÁ EXISTE NA BASE DE DADOS!");
                            $('#companies_cpf').css({ "background": "#FF6347" }).focus();
                            $("#companies_cpf").val('');
                            //console.log("esse cnpj já existe!");
                        }
                    }
                });
            } else {
                alert("ESTE CPF NAO E VALIDO!");
                $('#companies_cpf').css({ "background": "#FF6347" }).focus();
                $("#companies_cpf").val('');
            }
        }
    });
});

/*-----------------------VALIDAÇÃO EMIAL----------------------*/
$(function() {
    $("#companies_email").on('keyup', function() {

        var busca_email = $('#companies_email').val();
        //console.log(busca);	

        $.ajax({
            type: 'POST',
            url: BASE_URL + '/ajaxCadCompanies/valEmail',
            data: { busca_email: busca_email },
            success: function(retorno) {

                if (retorno == 'true') {

                    alert("ESTE EMAIL JÁ EXISTE NA BASE DE DADOS!");
                    //console.log("esse cnpj já existe!");
                }
            }
        });
    });
});