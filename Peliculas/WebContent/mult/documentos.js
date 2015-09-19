/* Funcciones de validación de los documentos
*
* Valida el nif con la letra correspondiente
*  Hay que pasarle como parámetro el valor del nif
*  Devuelve un mensaje de error, mensajeNif, si algo ha ido mal y
*  nada si todo ha ido bien
*/
function validaNif(minif){
  var longMax = 9;
  var cerosquefaltan = 0;
  var ceros = "";
  var convertir_nif = true;
  var hayLetra = true;
  var valido = 0;
  var mensajeNif = ""; 

  if (minif.length == 0){
    mensajeNif = "Por favor, rellene el campo NIF";
    return mensajeNif; 
  }
  
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
  if (!convertir_nif) {
    mensajeNif+= " El NIF debe ser numérico";
    return mensajeNif;
  }
  if (letradni.length == 0 || letradni == null){
    mensajeNif = "Por favor, escriba la letra del NIF";
    hayLetra = false;
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
      mensajeNif+= " La letra del NIF es incorrecta";
      return mensajeNif;
    }
  } 
   return mensajeNif;
}   

// Valida la tarjeta de residente con la letra correspondiente
// Hay que pasarle como parámetro la tarjeta de residente
// Devuelve un mensaje de error, mensajeTarjeta, si algo ha ido mal y
// nada si todo ha ido bien


function validaTarjeta(mitarjeta){
  var longMax = 10;
  var cerosquefaltan = 0;
  var ceros = "";
  var convertir_tarjeta = true;
  var hayLetraIni = true;
  var hayLetraFin = true;
  var valido = 0;
  var mensajeTarjeta = "";
	
  if (mitarjeta.length == 0)
  {
  	mensajeTarjeta = "Por favor, rellene el número de Tarjeta";
    return mensajeTarjeta; 
   }

  if (mitarjeta.charAt(mitarjeta.length-1)< "0" || mitarjeta.charAt(mitarjeta.length-1)> "9"){
    cerosquefaltan=longMax-mitarjeta.length;
    for(var i = 1; i<=cerosquefaltan;i++) {
      ceros = ceros + "0";
    }
  }
  
  var letraprimera = mitarjeta.substring(0,1).toUpperCase();
  var nrotarjeta    = mitarjeta.substring(1,mitarjeta.length-1);
  var letratarjeta  = mitarjeta.substring(mitarjeta.length-1,mitarjeta.length).toUpperCase();
  var cociente23        = 0;

  nrotarjeta = ceros + nrotarjeta;
  mitarjeta = letraprimera + nrotarjeta + letratarjeta;

  if (mitarjeta.length != 10) {
	mensajeTarjeta = "Número de tarjeta incompleto";
	return mensajeTarjeta;
  }
  // comprueba que la tarjeta sea numerica
  for (var i=0; i< nrotarjeta.length; i++){
    var ch = nrotarjeta.substring(i,i+1);
    if (ch < "0" || ch > "9"){
      convertir_tarjeta = false;
	}  
  }

  if (letratarjeta.length == 0 || letratarjeta == null){
    mensajeTarjeta = "Por favor, escriba la última letra de la Tarjeta de Residente";
    hayLetraFin = false;
    return mensajeTarjeta;
  }

  if (letraprimera.length == 0 || letraprimera == null){
    mensajeTarjeta = "Por favor, escriba la primera letra de la Tarjeta de Residente";
    hayLetraIni = false;
    return mensajeTarjeta;
  }


  if (convertir_tarjeta && hayLetraIni && hayLetraFin){    
    cociente23  = nrotarjeta % 23;
	if ((letraprimera!="X")) 
	//	(letraprimera!="J") &&
	//	(letraprimera!="L") &&
	//	(letraprimera!="K") &&
	//	(letraprimera!="M") &&
	//	(letraprimera!="R"))
	{
      mensajeTarjeta= " La primera letra de la Tarjeta de Residente es incorrecta";
      return mensajeTarjeta;
	}
    if (((cociente23==0) && (letratarjeta=="T")) ||
        ((cociente23==1) && (letratarjeta=="R")) ||
        ((cociente23==2) && (letratarjeta=="W")) ||
        ((cociente23==3) && (letratarjeta=="A")) ||
        ((cociente23==4) && (letratarjeta=="G")) ||
        ((cociente23==5) && (letratarjeta=="M")) ||
        ((cociente23==6) && (letratarjeta=="Y")) ||
        ((cociente23==7) && (letratarjeta=="F")) ||
        ((cociente23==8) && (letratarjeta=="P")) ||
        ((cociente23==9) && (letratarjeta=="D")) ||
        ((cociente23==10) && (letratarjeta=="X")) ||
        ((cociente23==11) && (letratarjeta=="B")) ||
        ((cociente23==12) && (letratarjeta=="N")) ||
        ((cociente23==13) && (letratarjeta=="J")) ||
        ((cociente23==14) && (letratarjeta=="Z")) ||
        ((cociente23==15) && (letratarjeta=="S")) ||
        ((cociente23==16) && (letratarjeta=="Q")) ||
        ((cociente23==17) && (letratarjeta=="V")) ||
        ((cociente23==18) && (letratarjeta=="H")) ||
        ((cociente23==19) && (letratarjeta=="L")) ||
        ((cociente23==20) && (letratarjeta=="C")) ||
        ((cociente23==21) && (letratarjeta=="K")) ||
        ((cociente23==22) && (letratarjeta=="E"))){
      valido=1
    }else{
      mensajeTarjeta= " La letra de la Tarjeta de Residente es incorrecta";
      return mensajeTarjeta;
    }
  } else 
  if (!convertir_tarjeta) {
    mensajeTarjeta= " La Tarjeta de Residente debe ser numérica";
  }
   return mensajeTarjeta;
}   // Fin de validaTarjeta
 

/* Valida el cif con la letra correspondiente
*  Hay que pasarle como parámetro el valor del cif
*  Devuelve un mensaje de error, mensajeCif, si algo ha ido mal y
*  nada si todo ha ido bien
*/
function validaCif(micif){
  var longMax = 9;
  var cerosquefaltan = 0;
  var nCual = 0;
  var ceros = "";
  var convertir_cif = true;
  var hayLetra = true;
  var valido = 0;
  var iTipoCIF = "";
  var mensajeCif = ""; 
  var sAux = "";
  var nSuma = 0;
  var CADENA_CIF_EXTRANJERO = "ABCDEFGHIJ";  
  
  
  if (micif.length == 0){
    mensajeCif = "Por favor, rellene el campo CIF";
    return mensajeCif; 
  }
  if (micif.length != 9){
    mensajeCif = "El CIF debe tener 9 dígitos";
    return mensajeCif; 
  }  
 
  var nrocif    = micif.substring(1,longMax-1);
  var letracif  = micif.substring(0,1).toUpperCase();
  var lastpos   = micif.substring(longMax-1,longMax).toUpperCase();  

  //  comprueba que empiece por letra
  
  if (letracif >= "0" && letracif <= "9"){
     mensajeCif = "Por favor, introduzca la letra del CIF";
     return mensajeCif; 
   }

  // comprueba que el cif sea numerico
  for (var i=0; i< nrocif.length; i++){
    var ch = nrocif.substring(i,i+1);
    if (ch < "0" || ch > "9"){
      convertir_cif = false;
        }  
  }
  if (!convertir_cif) {
    mensajeCif+= " El CIF debe ser numérico";
    return mensajeCif;
  }
  if (letracif == null || letracif.length == 0){
    mensajeCif = "Por favor, escriba la letra del CIF";
    hayLetra = false;
    return mensajeCif;
  }
  if (!isNaN ( parseFloat(lastpos) ) ) 
  {
	iTipoCIF = 1;                                   
  }
  else
  {
	iTipoCIF = 2;                   
  }  

  for (x = 1; x<=7; x++)
  {
	nCual = parseFloat(micif.charAt(x));
	sAux = String(nCual * 2)
	if ((x % 2) != 0)
	{
		if ((nCual * 2) > 9)
		{
			nSuma = nSuma + (parseFloat(sAux.charAt(0)) + parseFloat(sAux.charAt(sAux.length-1)));
		}
		else
		{
			nSuma = nSuma + (nCual * 2);
		}
	}
	else
	{
		if ((nCual * 1) > 9)
		{
			nSuma = nSuma + (parseFloat(sAux.charAt(0)) + parseFloat(sAux.charAt(sAux.length-1)));
		}
		else
		{
			nSuma = nSuma + (nCual * 1);
		}
	}
  }

  sAux=String(nSuma);

  nAux = 10 - parseFloat(sAux.charAt(sAux.length-1));

  switch (iTipoCIF)
  {
	case 1:
		sAux=String(nAux);

		if ((micif.charAt( micif.length - 1 )) != sAux.charAt( sAux.length - 1 ))
		{
			mensajeCif = "CIF Incorrecto";
		}
		break;

	case 2:
		if ((lastpos) != CADENA_CIF_EXTRANJERO.charAt(nAux-1))
		{
			mensajeCif = "CIF Incorrecto";
		}
		break;
  }  

   return mensajeCif;
}   