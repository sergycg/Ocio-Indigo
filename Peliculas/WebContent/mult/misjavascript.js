/* 
*   ARCHIVO JAVASCRIPT CON FUNCIONES DE DISTINTOS FORMULARIOSS
*       
*   CONTENIDO:
*               function openWin(html,name,w,h).
*               function eligeOpcion().
*               function validaNif(minif).
*               function validaEmail(email): valida que el formato del email sea correcto.
*               function isNumber (cadena); valida que la cadena sea numerico.
*               function isEmpty(campo); valida que la cadena no se encuentra vacia.
*               function rellenoObligatorio(campo,numerico,nombre); valida que la cadena no este vacia, numerico y mensaje.
*               function validarVacio(f); valida que los campos  los formularios de CreditoConsumo.
*               function seleccion(combo,valor); selecciona una combo con el valor que recibe.
*               function inicializarChequed(check,variable);Selecciona un checkBox segun el valor que recibe.
*               function rellenoObligatorios(campo,numerico);valida la cadena sin mensaje.
*               function ingresosCorrectos(fijos,variables);valida que hay coherencia entre ingresos.
*               function cambioValor(valor,objeto); cambia el valor de un texto Oculto.
*               function comaXPunto(valor); cambiar las comas decimales por puntos.
*/


// Valida el nif con la letra correspondiente
// Hay que pasarle como parámetro el valor del nif
// Devuelve un mensaje de error, mensajeNif, si algo ha ido mal y
// nada si todo ha ido bien

function validaNif(minif){
  var longMax = 9;
  var cerosquefaltan = 0;
  var ceros = "";
  var convertir_nif = true;
  var hayLetra = true;
  var valido = 0;
  var mensajeNif = "";

  if (minif.length == 0)
    return; 

  if (minif.charAt(minif.length-1)< "0" || minif.charAt(minif.length-1)> "9"){
    cerosquefaltan=longMax-minif.length;
    for(var i = 1; i<=cerosquefaltan;i++) {
      ceros = ceros + "0";
    }
  }

  minif = ceros + minif;
  
  var nrodni    = minif.substring(0,longMax-1);
  var letradni  = minif.substring(longMax-1,longMax).toUpperCase();
  var cociente23        = 0;

  // comprueba que el nif sea numerico
  for (var i=0; i< nrodni.length; i++){
    var ch = nrodni.substring(i,i+1);
    if (ch < "0" || ch > "9"){
      convertir_nif = false;
        }  
  }

  if (letradni.length == 0 || letradni == null){
    //alert( "Por favor, escriba la letra del NIF" );
    mensajeNif = "Por favor, escriba la letra del NIF";
    hayLetra = false;
    //obj.focus();
    return mensajeNif;
  }

  if (convertir_nif && hayLetra){
    cociente23  = nrodni % 23;
    if (((cociente23==0) && (letradni=="T")) ||
        ((cociente23==1) && (letradni=="R")) ||
        ((cociente23==2) && (letradni=="W")) ||
        ((cociente23==3) && (letradni=="A")) ||
        ((cociente23==4) && (letradni=="G")) ||
        ((cociente23==5) && (letradni=="M")) ||
        ((cociente23==6) && (letradni=="Y")) ||
        ((cociente23==7) && (letradni=="F")) ||
        ((cociente23==8) && (letradni=="P")) ||
        ((cociente23==9) && (letradni=="D")) ||
        ((cociente23==10) && (letradni=="X")) ||
        ((cociente23==11) && (letradni=="B")) ||
        ((cociente23==12) && (letradni=="N")) ||
        ((cociente23==13) && (letradni=="J")) ||
        ((cociente23==14) && (letradni=="Z")) ||
        ((cociente23==15) && (letradni=="S")) ||
        ((cociente23==16) && (letradni=="Q")) ||
        ((cociente23==17) && (letradni=="V")) ||
        ((cociente23==18) && (letradni=="H")) ||
        ((cociente23==19) && (letradni=="L")) ||
        ((cociente23==20) && (letradni=="C")) ||
        ((cociente23==21) && (letradni=="K")) ||
        ((cociente23==22) && (letradni=="E"))){
      valido=1
    }else{
      //alert( "La letra del NIF es incorrecta" );
      mensajeNif+= " La letra del NIF es incorrecta";
      //obj.focus();
      return mensajeNif;
    }
  } else 
  if (!convertir_nif) {
    //alert("El NIF debe ser numérico");
    mensajeNif+= " El NIF debe ser numérico";
    //obj.value="";
    //obj.focus();
  }
   return mensajeNif;
}   // Fin de validaNif
