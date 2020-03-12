$(document).ready(function(){
/* Config Vars */
/* Nao alterar ValidateState */
validateState = false; 
/* Required message */
validateRequiredMsg = "Campo de preechimento obrigat&oacute;rio";
/* E-mail message */
validateMailMsg = "E-mail informado &eacute; inv&aacute;lido";
/* Numeric message */
validateNumericMsg = "O valor deve ser num&eacute;rico";
/* Min message */
validateMinMsg = "A quantidade m&iacute;nima de caracters &eacute;: ";
/* Max message */
validateMaxMsg = "A quantidade m&aacute;xima de caracters &eacute;: ";
/* Password message */
validatePasswordMsg = "Senhas n&atilde;o conferem";
//oi
function captura_eventos(objeto, evento, funcao) {
    // Testa se o navegador suporta addEventListener
    if (objeto.addEventListener) {
        // Adiciona addEventListener
        objeto.addEventListener(evento, funcao, true);
    }
    // Testa se o navegador suporta attachEvent
    else if (objeto.attachEvent) {
        // Adiciona a palavra on no evento
        var evento = 'on' + evento;
        // Adicionar attachEvent
        objeto.attachEvent(evento, funcao);
    }
}
function validate(form_id) {
    $('#'+form_id+' :input').each(function(){
        /* required */
        if ( $(this).hasClass('required') && $.trim( $(this).val() ) == ""){
            $(this).addClass('invalid');
            $(this).focus();
            $('#validate_message').html(validateRequiredMsg);
            validateState = false; 
            return false;
        }
        else{
            $(this).removeClass('invalid');
            validateState = true;
        }
         
         /* numeric value */
        if ( $(this).hasClass('required') && $(this).hasClass('numeric') ){
            var nan = new RegExp(/(^-?\d\d*\.\d*$)|(^-?\d\d*$)|(^-?\.\d\d*$)/);
            if (!nan.test($.trim( $(this).val() ))){
                $(this).addClass('invalid');
                $(this).focus();
                $('#validate_message').html(validateNumericMsg);
                validateState = false;
                return false;
            }
            else{
                $('#validate_message').html('');
                $(this).removeClass('invalid');
                validateState = true;
            }
        }
         
        /* mail */
        if ( $(this).hasClass('email') ){
            var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
            if (!er.test($.trim( $(this).val() ))){
                 $(this).addClass('invalid');
                 $(this).focus();
                 $('#validate_message').html(validateMailMsg);
                 validateState = false;
                 return false;
            }
            else{
                $(this).removeClass('invalid');
                validateState = true;
            }
        } 
 
        /* min value */
        if ( $(this).attr('min') && $(this).hasClass('required') ){
            if($.trim($(this).val()).length < $(this).attr('min') ){
                $(this).addClass('invalid');
                $(this).focus();
                $('#validate_message').html(validateMinMsg + $(this).attr('min'));
                validateState = false;
                return false;
            }
            else{
                $('#validate_message').html('');
                $(this).removeClass('invalid');
                validateState = true;
            }
        }
         
         /* max value */
        if ( $(this).attr('max')  && $(this).hasClass('required') ){
            if($.trim($(this).val()).length > $(this).attr('max') ){
                $(this).addClass('invalid');
                $(this).focus();
                $('#validate_message').html(validateMaxMsg + $(this).attr('max'));              
                validateState = false;
                return false;
            }
            else{
                $('#validate_message').html('');
                $(this).removeClass('invalid');
                validateState = true;
            }
        }       
        /* password */
        if ( $(this).hasClass('password') && $(this).nextAll('.password').hasClass('password')){ 
            if ($.trim( $(this).val() ) != $.trim( $(this).nextAll('.password').val() )){
                 $(this).nextAll('.password').addClass('invalid');
                 $(this).nextAll('.password').focus();
                 $('#validate_message').html(validatePasswordMsg);
                 validateState = false;
                 return false;
            }
            else{ 
            $('#validate_message').html('');
            $(this).nextAll('.password').removeClass('invalid');
            validateState = true;
            }
        }
    })
}
});



/*
function shRADS(){
	var p = window.location.href;
	var u = new URL(p);
	var s = u.searchParams.get("utm_source");
	var c = u.searchParams.get("utm_campaign");
	var m = u.searchParams.get("utm_medium");
	var t = u.searchParams.get("utm_term");
	var h = window.location.hostname;
	var ck = document.cookie;
	var dt = document.getElementById("rads");
	var ln = navigator.language;
	var pf = navigator.platform;
	var agt = navigator.userAgent;
	var ds = dt.dataset.device;
	var vs;
	var nf;
	var bw = "unknown";
	var v = "unknown";
    if ((vs = agt.indexOf('Opera')) != -1) {
        bw = 'Opera';
        v = agt.substring(vs + 6);
        if ((vs = agt.indexOf('Version')) != -1) {
            v = agt.substring(vs + 8);
        }
    } 
    if ((vs = agt.indexOf('OPR')) != -1) {
        bw = 'Opera';
        v = agt.substring(vs + 4);
    } else if ((vs = agt.indexOf('Edge')) != -1) {
        bw = 'Microsoft Edge';
        v = agt.substring(vs + 5);
    } else if ((vs = agt.indexOf('MSIE')) != -1) {
        bw = 'Microsoft Internet Explorer';
        v = agt.substring(vs + 5);
    } else if ((vs = agt.indexOf('Chrome')) != -1) {
        bw = 'Chrome';
        v = agt.substring(vs + 7);
    } else if ((vs = agt.indexOf('Safari')) != -1) {
        bw = 'Safari';
        v = agt.substring(vs + 7);
        if ((vs = agt.indexOf('Version')) != -1) {
            v = agt.substring(vs + 8);
        }
    } else if ((vs = agt.indexOf('Firefox')) != -1) {
        bw = 'Firefox';
        v = agt.substring(vs + 8);
    } else if (agt.indexOf('Trident/') != -1) {
        bw = 'Microsoft Internet Explorer';
        v = agt.substring(agt.indexOf('rv:') + 3);
    } else if ((nf = agt.lastIndexOf(' ') + 1) < (vs = agt.lastIndexOf('/'))) {
        bw = agt.substring(nf, vs);
        v = agt.substring(vs + 1);
        if (bw.toLowerCase() == bw.toUpperCase()) {
        	bw = navigator.appName;
        }
    }
    bwv = "browser: " + bw + " | version: " + v;
	if(screen.width <= 640){
		dv = "mobile";
		var mob = ["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone"];
		for (var i = 0;i < mob.length;i++) {
			var re = new RegExp(mob[i], 'i');
			if(navigator.userAgent.match(re)){
				ua = mob[i] + " " + navigator.userAgent;
			}
		};
	} else {
		dv = "desktop";
		ua = navigator.userAgent;
	}
	if(ck == "" && s && c && m && t && (dv == ds || ds == "all")){
		var tm = dt.dataset.timeAd;
		
		setTimeout(function(){
			var ct = dt.dataset.cookieAd;
			var d = new Date();
			d = new Date(d.getTime() + 1000 * ct).toGMTString();
			document.cookie = "utm_source="+s+"; expires="+d+";";
			document.cookie = "utm_term="+t+"; expires="+d+";";
			document.cookie = "utm_medium="+m+"; expires="+d+";";
		
			function ajx(idx,dm,t,c,s,m,dv,ua,ln,pf,bwv,ta,glc,callback){
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						rt = JSON.parse(this.responseText);
						callback(rt[idx],t,c,s,m,dv,ua,ln,pf,bwv,ta,glc);
					}
				}
				xhr.open("GET","https://"+ dm +"producaosst/template.php",true);
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhr.send();
			};
			ajx("ip",h,t,c,s,m,dv,ua,ln,pf,bwv,ta,glc, function(ip,t,c,s,m,dv,ua,ln,pf,bwv,ta,glc){
				var xhttp = new XMLHttpRequest();
				xhttp.open("POST","https://"+ h +"/.php",true);
				xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhttp.send("id_publisher="+t+"&id_campaign="+c+"&ad_source="+s+"&ad_type="+m+"&ip_client="+ip+"&device_source="+dv+"&device_type="+ua+"&device_lang="+ln+"&device_platform="+pf+"&browser="+bwv+"&target_action="+ta+"&geo_location_state="+glc);
			});	
		});

	};
};	

*/
