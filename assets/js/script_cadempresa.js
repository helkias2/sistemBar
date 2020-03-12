$(function(){
    $("#cnpj").on('keyup', function(){
        
        var buscanrmatricula = $('#cnpj').val();
        //console.log(buscanrmatricula);   

        $.ajax({
            type:'POST',
            url:BASE_URL+'/ajaxEmpresa/valCnpjEmpresa/empresaAdd',
            data:{buscanrmatricula:buscanrmatricula},
            success:function(retorno){

                if (retorno == true) {

                    alert("ESTE CNPJ JÁ FOI CADASTRADO!");
                    console.log("esse cnpj já existe!");
                    
                }else{
                    //console.log("cnpj inexistente!");
                }

                //console.log(retorno);         
            }
        });
    });
});