function Numerico(objeto, longitud){
  cadena=objeto.value
  var convertir=true

  if (longitud != 0 && cadena.length != longitud && cadena.length != 0){
      convertir = false  

  }else {
    for (var i=0; i< cadena.length; i++){
      var ch= cadena.substring(i,i+1)
      if (ch < "0" || ch > "9"){
        convertir=false
      }
    }
  } 


  if (!convertir){
    mensajeNum="$$Introduzca$$"
    if (longitud != 0){
      mensajeNum+=longitud
    }
    mensajeNum+="$$caracteres numéricos$$"
    alert(mensajeNum)
    objeto.value=""
    objeto.focus();
  }
}

function NumericoSinAlert(cadena, longitud){
        var correcto = true;

  if (longitud != 0 && cadena.length != longitud && cadena.length != 0){
      correcto = false;
  }else {
    for (var i=0; i< cadena.length; i++){
      var ch= cadena.substring(i,i+1)
      if (ch < "0" || ch > "9"){

        return false;
      }
    }
  } 
  return correcto;
}

/*function importeCorrecto(importe, moneda){
        var importeCorrecto = true;
        if ((importe =="")|| esCero(importe)) {
                importeCorrecto=false;
        } 
        if (moneda == "EUR"){
                if (isNaN(importe)) {
                        ocurrencias = 0;
                        coma = 0;
                        for ( i = 0 ; (i < importe.length) && (i >= 0) ;) {
                                i = importe.indexOf("," , i+1);
                                if (i!=-1) {
                                        ocurrencias++;
                                        coma=i;
                                }
                        }
                        if ( !(ocurrencias == 1 && isNumber(importe.substring(0 , importe.indexOf(",",0))) && isNumber(importe.substring(coma+1 , importe.length-1))) ) {
                                importeCorrecto=false;
                        }
                }
        } else {
                if (!isNumber(importe)) {
                        importeCorrecto=false;
                }
        }
        return importeCorrecto;
}*/


function importeCorrecto(importe, num_dec){
        var importeCorrecto = true;
        if ((importe.value =="")|| esCero(importe)) {
                importeCorrecto=false;
        }
        else{
                var cadena_patron = "[0-9]{1,}";
                
                if (num_dec > 0)
                {
                        cadena_patron += "[.|,][0-9]{1,"+ num_dec +"}";
                }

                patron = eval("/^" + cadena_patron + "$/");
                patron_sin_dec = eval("/^[0-9]+$/");
                
                importeCorrecto = patron.test(importe.value) || patron_sin_dec.test(importe.value);
                
                importe.value = cambiarDec(importe.value);
        }
                
        return importeCorrecto;
}

function cambiarDec(importe) 
{
  var aux=importe.indexOf(".");
  if (aux!=-1)
        importe=importe.replace(".",",");       
  return(importe)
  
}

function esCero(importe){
        cero=true;
        for(i=0;((cero)&& (i< (((String)(importe.value)).length))); i++)
        {
                if ( (((String)(importe.value)).charAt(i)!="0")&&
                         (((String)(importe.value)).charAt(i)!="."))
                {
                        cero=false;
                }
        }
        return cero;

}