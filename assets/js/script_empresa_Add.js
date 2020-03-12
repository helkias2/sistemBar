/*	$("input[name=cep_Funcionario]").on("blur", function () {
    let cep = $(this).val();

    $.ajax({
        url:'http://api.postmon.com.br/v1/cep/'+cep,
        type:'GET',
        dataType:'json',
        success:function (json) {
            if(typeof json.logradouro != 'undefined'){
                $("input[name=endereco]").val(json.logradouro);
                $("input[name=bairro]").val(json.bairro);
                $("input[name=cidade_Funcionario]").val(json.cidade);
                //$("input[name=uf]").val(json.estado);
                //$("input[name=endereco]").val(json.logradouro)
            }
            $("input[name=numero]").focus();
        }
    });
});*/

//------------------------Buscar CNAE  ------------------------------//
    $(document).ready(function(){
    $("#modalRelatorioCenae").on('keyup',function(){        
        var   busca = $("#buscaCnaeModal").val();
        if(busca != ''){
            $.ajax({
                url:BASE_URL+'/ajax/buscaCnae',
                type: 'POST',
                datatype: 'json',
                async: false,
                data:{ busca: busca},
                success: function(data){
                    json = data.replace(/(\r\n|\n|\r)/gm,"");
                    var json = $.parseJSON(json);
                    console.log(json);
                    var html = '';
                    for( var i = 0; i < json.length && json != ''; ++i) {
                        html += '  <tr id="trtr"> <td id="codcnae">'+json[i].codcnae
                        +'</td> <td id="desccnae">'+json[i].desccnae
                        +'</td></tr>';
                    }
                $('#tabelamodalcnae').html(html);
                $('#tabelamodalcnae').show();
                },
            });
        return false;
    }
    });

    $("input[name=modalCnae]").keyup(function(){ //pega o css da tabela 

        var tabela = $(this).attr('alt');
        if( $(this).val() != ""){
            $("."+tabela+" tbody>tr").hide();
            $("."+tabela+" td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        } else{
            $("."+tabela+" tbody>tr").show();
        }
    });
    var vl ='';
    $.extend($.expr[":"], {
        "contains-ci": function(elem, i, match, array) {
            return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });
    pegarvlores();
    function pegarvlores(){ 
    $(document).ready(function(){
        $("#tabelamodalcnae").on('click', 'tr', function (e) {
            e.preventDefault();
            $(this).toggleClass('ativo');
            $(this).siblings().removeClass('ativo');

            //var valcod = $(" #tiporisco option:selected").text();
            var codcnae = $(this).find('td[id=codcnae]').text();
            var desccnae = $(this).find('td[id=desccnae]').text();
            jsoncnae = {'cdcnae':codcnae, 'dscnae':desccnae};
            pegarvlaso(jsoncnae);
        });
    });
    }

    // ------------- PEGAR VALORES CNAE -------------------//
    function pegarvlaso(jsoncnae){   
        $("#enviacnae").on('click', function (e) {
            e.preventDefault();     
            if( jsoncnae != ''){ 
                    //'<tr style="background-color: #fff">'+
                    $("#codempcnae").val(jsoncnae.cdcnae);
                    $("#descempcnae").val(jsoncnae.dscnae);
                }
                $("#tabelamodalcnae tr").remove();

        });
    // return false;
    }
    $("#enviacnae").on('click', function(){
        $("#tabelamodalcnae tr").remove();
    });
    $("#fechacnae").on('click', function(){
        $("#tabelamodalcnae tr").remove();
    });

})