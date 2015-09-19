/******************************************************************************* 

                                                        FUNCIONES DE VALIDACI&Oacute;N

********************************************************************************
cambiaComasPorPuntos(cadena)
calculoDigitoControlOK()
change(objFecha)

isNumeric(arg)

rellenoObligatorio(campo,numerico,nombre)

trim(argvalue)
today()

validateDecimal(cadena, decimales)
validateEmail(email)
validateNumero(valorNumero)
validateNIF(nif)
validateFecha(fecha) //Fecha con formato dd/mm/aaaa
validateNumLong(num, longitud, mensaje)
validateString(str, msg)
validateNum(num)
validatePtas(importe, campo)
validateEuros(importe, campo)
validateCreditCard(tarj)
seleccionarSelect(select, valor)// Selecciona el valor que se le indica en un select

isNumber (cadena); valida cadenas enteras.
isImporte (cadena); valida cadenas enteras. El decimal es la "," y sin ".".

*********************************************************************************/

function supFechaAct(dia, mes, anio)
{
        var date = new Date();
        var diaAct, mesAct, anioAct;

        //Fecha Actual
        diaAct = date.getDate();
        mesAct = (date.getMonth() + 1);   
        anioAct = date.getFullYear();

        //Comparamos las fechas
        if (anio > anioAct) return true;
        else if (anio < anioAct) return false;
        else if (mes > mesAct) return true;
        else if (mes < mesAct) return false;
        else if (dia > diaAct) return true;
        else if (dia < diaAct) return false;
        else return false;
}

function validateCreditCard(st)
{
        // Encoding only works on cards with less than 19 digits
        if (st.length > 19)
                return (false);

        sum = 0; mul = 1; l = st.length;
        for (i = 0; i < l; i++)
        {
                digit = st.substring(l-i-1,l-i);
                tproduct = parseInt(digit ,10)*mul;
                if (tproduct >= 10)
                        sum += (tproduct % 10) + 1;
                else
                        sum += tproduct;
                if (mul == 1)
                        mul++;
                else
                mul--;
        }

        if ((sum % 10) == 0)
                return (true);
        else
                return (false);
}

function validatePtas(importe, campo)
{
        var num = "";

        //No aceptamos parte decimal en un importe en Ptas.
        if(importe.indexOf(",") != -1)
        {
                alert("El campo " + campo + " no espera decimales"); 
                return false;
        }

        //Si hay puntos, comprobamos que sean separadores de miles, ...
        if(importe.indexOf(".") != -1)
        {
                var arrayElems = importe.split(".");
                var elems = arrayElems.length;

                //El primer elemento del array puede tener entre 1 y 3 d&iacute;gitos
                if(arrayElems[0].length > 3)
                {
                        alert("Revise los '.' de separación en " + campo + "");
                        return false;
                }
                else
                        num = num + arrayElems[0];

                for(i = 1; i < arrayElems.length; i++)
                {
                        if(arrayElems[i].length != 3)
                        {
                                alert("Revise los '.' de separación en " + campo + "");
                                return false;
                        }
                        else
                                num = num + arrayElems[i];
                }
        }
        else
                num = importe;
        
        //Comprobamos si se trata de un valor num&eacute;rico
        if(isNaN(num))
        {
                alert("El campo " + campo + " debe ser un número");
                return false;
        }
        
        if(num <= 0)
        {
                alert("El campo " + campo + " debe ser mayor que cero");
                return false;
        }

        return true;
}

function validateEnteroEuros(importe, campo)
{
        var num = "";

        //No aceptamos parte decimal en un importe en Ptas.
        if(importe.indexOf(",") != -1)
        {
                alert("El campo " + campo + " no espera decimales"); 
                return false;
        }

        //Si hay puntos, comprobamos que sean separadores de miles, ...
        if(importe.indexOf(".") != -1)
        {
                var arrayElems = importe.split(".");
                var elems = arrayElems.length;

                //El primer elemento del array puede tener entre 1 y 3 d&iacute;gitos
                if(arrayElems[0].length > 3)
                {
                        alert("Revise los '.' de separación en " + campo + "");
                        return false;
                }
                else
                        num = num + arrayElems[0];

                for(i = 1; i < arrayElems.length; i++)
                {
                        if(arrayElems[i].length != 3)
                        {
                                alert("Revise los '.' de separación en " + campo + "");
                                return false;
                        }
                        else
                                num = num + arrayElems[i];
                }
        }
        else
                num = importe;
        
        //Comprobamos si se trata de un valor num&eacute;rico
        if(isNaN(num))
        {
                alert("El campo " + campo + " debe ser un número");
                return false;
        }
        
        if(num < 0)
        {
                alert("El campo " + campo + " no puede ser negativo");
                return false;
        }

        return true;
}

function validateEuros(importe, campo)
{
        var sep = null;
        var importeAux = null;
	//si la separaci&oacute;n decimal es un punto le cambio por una coma

	var posicion = importe.indexOf(".");
	if (posicion != -1) 
	{
		a = importe.substring(0, posicion);
		b = importe.substring(posicion + 1);
		importe = a + "," + b;
	}
	

        if(importe.indexOf(",") != -1)
        {
                sep = importe.split(",");
                importeAux = sep[0]; //Nos quedamos con la parte entera

                //No puede haber m&aacute;s de una coma
                if(sep.length > 2)
                {
                        alert("Sólo puede haber una ',' como separador de decimales en " + campo + "");
                        return false;
                }

                //No aceptamos m&aacute;s de dos decimales
                if( (sep[1].length > 2) || (isNaN(sep[1])) )
                {
                        alert("La parte decimal de " + campo + " debe ser un numérico de 2 dígitos máx.");
                        return false;
                }
        }
        else
                importeAux = importe;
        
        if(! validateEnteroEuros(importeAux, campo))
                return false;

        return true;
}

function validateDecimal(cadena, decimales)
{
        function esDigito (caracter)
        {
                return (! (isNaN(caracter)));
    }
  
        //quitar espacios blancos al principio     
        i=0;   
        while ((i < cadena.length) && (cadena.charAt(i) == ' '))
                i= i+1;
   
        cadena= String(cadena).substring(i,cadena.length);
                        
        //quitar espacios blancos al final
        i = cadena.length;   
        while ((i > 0) && (cadena.charAt(i-1) == ' '))
                i= i-1;
  
        cadena= String(cadena).substring(0,i);
          
    //aqui cadena ya no contiene espacios blancos al principio y fin 
    valor = '';
    num = 0;

        cadena = cadena.replace(",", ".");
 
    //validar espacios en blanco interiores, puntos y comas
    for (i = num; i < cadena.length; i++)
    { 
                if (cadena.charAt(i) == ' ') 
                        return "Ha dejado algún espacio en blanco en el interior de un campo numérico"; //hay blanco interior
                        
        if ( (cadena.charAt(i) == '.') && (cadena.length-i > decimales + 1) ) 
                        return "Por favor, puntue únicamente los dígitos decimales (tan sólo se admiten " + decimales + " cifras decimales). "; //hay mas de decimales digitos tras el punto
        else valor  = valor + cadena.charAt(i);
    }              
        
    numPuntoDecimal = 0;
    for (i=num; i<valor.length; i++)
    {
                if (valor.charAt(i) != " ")
        {
                        if (! esDigito(valor.charAt(i)) && (numPuntoDecimal < 2))
            {
                                if ((valor.charAt(i)  == ".")) 
                                        numPuntoDecimal = numPuntoDecimal+1;
                else
                                        return "Ha introducido algún carácter no numérico en un campo numérico";                   
             }
         }
         else numPuntoDecimal=99; //numero erroneo
    }
         
    //validaciones auxiliares       
    i = valor.length - 1;
    if (numPuntoDecimal == 99 ) 
                return "Ha introducido algún carácter no numérico en un campo numérico"; //caracter no numerico
                        
    if ((numPuntoDecimal > 1) || (valor.charAt(i)== " ")) 
                return "Por favor, puntue únicamente los dígitos decimales (tan sólo se admiten dos cifras decimales)."; //mas de un punto o blanco al final
                        
    if ( numPuntoDecimal == valor.length ) 
                return "Ha introducido algún carácter no numérico en un campo numérico"; //un solo caracter, el punto
             
    if ((valor.length > 1) && (valor.charAt(0) == "." )) 
                valor = "0" + String(valor);

    if ((valor.substring(1,2) == "-.") && (valor.length > 3)) 
                valor = "-0." + valor.substring(3,valor.length -2);
              
    if (( valor != "" ) && (valor != "-") && (valor != "-.")) // && (valor.substring(0,2) != "0."))
        valor = parseFloat(valor);
        
    return valor;
}

//validar la direccion e-mail
function validateEmail(email)
{       
        if (email.length!=0)
        { 
                if (email.indexOf('@',0)==-1 
                    || email.indexOf(';',0) !=-1 
                    || email.indexOf('.',0) ==-1
                    || email.indexOf(' ',0) !=-1 || email.indexOf('/',0) !=-1
                    || email.indexOf(';',0) !=-1 || email.indexOf('<',0) !=-1 
                    || email.indexOf('>',0) !=-1 || email.indexOf('*',0) !=-1 
                    || email.indexOf('|',0) !=-1 || email.indexOf('`',0) !=-1 
                    || email.indexOf('&',0) !=-1 || email.indexOf('$',0) !=-1 
                    || email.indexOf('!',0) !=-1 || email.indexOf('"',0) !=-1
                    || email.indexOf(',',0) !=-1
                    || email.indexOf(':',0) !=-1)
        	{
       	 		alert('La DIRECCION E-MAIL no es correcta.');  
                        return 0;
        	}
        } 
        
        return 1;
}

function makeArray (n) 
{
        this.length=n;
        for (var i=1; i<=n; i++)
                this[i]=0; 
  
        return this;
}

function calcularPesos(campo, pesos)
{ 
        valor = campo.value;
        longitud=valor.length;
        suma = 0;

        for (var i=0; i<=longitud-1; i++) 
                suma = suma + (valor.substring(i,i+1) * pesos[i+1]);

        return suma;
}
//fin de las funciones que validan el digito de control de los datos bancarios


//funcion que valida los datos numericos introducidos, transformando los puntos (decimales) por comas,
//al mismo tiempo que elimina los puntos de millar, decenas de millar ...
function validateNumero(valorNumero)
{     
        num = cambiaComasPorPuntos(valorNumero);
   
        if(! isNaN(parseInt(num)))
                return(num);
        else  
        {
                alert(num);
                return false;
        }
 }

function cambiaComasPorPuntos(cadena)
{
        function esDigito (caracter)
    {
                return (! (isNaN(caracter)));
    }
  
        //quitar espacios blancos al principio     
        i = 0;   
        while ((i < cadena.length) && (cadena.charAt(i) == ' '))
                i= i+1;
   
        cadena = String(cadena).substring(i,cadena.length);
                         
        //quitar espacios blancos al final
        i = cadena.length;   
        while ((i > 0) && (cadena.charAt(i-1) == ' '))
                i= i-1;
  
        cadena = String(cadena).substring(0,i);
          
    //aqui cadena ya no contiene espacios blancos al principio y fin 
    valor = '';
    num = 0;
  
    //validar espacios en blanco interiores,puntos y comas
    for (i = num; i < cadena.length; i++)
    { 
                if (cadena.charAt(i) == ' ') 
                        return "Ha dejado algún espacio en blanco en el interior de un campo numérico";//hay blanco interior
                        
        if ( (cadena.charAt(i) == '.') && (cadena.length-i>3) ) 
                        return "Por favor, puntue únicamente los dígitos decimales (tan sólo se admiten dos cifras decimales). "; //hay mas de 2 digitos tras el punto

        if (cadena.charAt(i) == ',') //hay coma
            valor  = valor  + '.'; //lo sustituimos por punto
        else 
                        valor  = valor + cadena.charAt(i);
    }              

    numPuntoDecimal = 0;
    for (i=num; i<valor.length; i++)
    {
                if (valor.charAt(i) != " ")
        {
                        if (!esDigito(valor.charAt(i)) && (numPuntoDecimal < 2))
            {
                                if ((valor.charAt(i)  == ".")) 
                                        numPuntoDecimal = numPuntoDecimal+1;
                else
                                        return "Ha introducido algún carácter no numérico en un campo numérico";
            }
         }
         else numPuntoDecimal=99; //numero erroneo
    }
         
    //validaciones auxiliares       
    i = valor.length - 1;
    if (numPuntoDecimal == 99 ) 
                return "Ha introducido algún carácter no numérico"; //caracter no numerico
                        
    if ((numPuntoDecimal > 1) || (valor.charAt(i)== " ")) 
                return "Por favor, puntue únicamente los dígitos decimales (tan sólo se admiten dos cifras decimales)."; //mas de un punto o blanco al final
                        
    if ( numPuntoDecimal == valor.length ) 
                return "Ha introducido algún carácter no numérico en un campo numérico"; //un solo caracter, el punto
             
    if ((valor.length > 1) && (valor.charAt(0) == "." )) 
                valor = "0" + String(valor);
    if ((valor.substring(1,2) == "-.") && (valor.length > 3)) 
                valor = "-0." + valor.substring(3,valor.length -2);

              
    if (( valor != "" ) && (valor != "-") && (valor != "-.")) // && (valor.substring(0,2) != "0."))
        valor = parseFloat(valor);
        
    return valor;
} 

//Funci&oacute;n que elimina los caracteres blancos tanto por la derecha como
//por la izquierda
function trim(argvalue) 
{
  var tmpstr = ltrim(argvalue);

  return rtrim(tmpstr);
}

//Funci&oacute;n que elimina los caracteres blancos por la izquierda
function ltrim(argvalue) 
{
  while (1) 
  {
    if (argvalue.substring(0, 1) != " ")
      break;
    argvalue = argvalue.substring(1, argvalue.length);
  }

  return argvalue;
}

//Funci&oacute;n que elimina los caracteres blancos por la derecha
function rtrim(argvalue) 
{
  while (1) 
  {
    if (argvalue.substring(argvalue.length - 1, argvalue.length) != " ")
      break;
    argvalue = argvalue.substring(0, argvalue.length - 1);
  }

  return argvalue;
}

//Informa sobre si el argumento que le pasamos est&aacute; formado
//&uacute;nica y exclusivamente por d&iacute;gitos
function isNumeric(arg)
{
        var i, numeric;

        numeric = (trim(arg).length > 0); // 'true' como norma general
        for(i=0; i<arg.length; i++)
        {
                if(isNaN(parseInt(arg.substring(i, i + 1))))
                {
                        numeric = false;
                        break;
                }
        }

        return numeric;
}

//Devuelve la fecha actual del sistema con formato dd/mm/aaaa
function today()
{
  var dia, mes, ano, today;
  
  today = new Date();
  mes = today.getMonth();
  mes = mes + 1;
  ano = today.getFullYear();
  dia = today.getDate();
  if (dia < 10) 
        dia = "0" + dia;
  if (mes < 10) 
        mes = "0" + mes;
  
  today = dia + "/" + mes + "/" + ano;
  
  return(today);
}

// La mayor&iacute;a de las funciones est&aacute;n pensadas para devolver un mensaje
// de error y el valor 0, siempre que el proceso de validaci&oacute;n haya fracasado; en caso
// contrario devolver&aacute; 1.

//esta funcion es invocada en validateNIF
function Numerico(Valor,longitud) 
{
        if (longitud != 0)
        {
                var x=0;
                while ( x < longitud) 
                {
                        if  (Valor.substring(x,x+1)<"0" || Valor.substring(x,x+1)>"9")
                                return (false);
                        
                        x++;
                }
      
                return (true);
    }
    else
                return (false);
}

function validateTR(tarj)
{
        if((tarj.substring(0, 1)).toUpperCase() != "X")
        {
                alert("Revise la Tarjeta de Residente. Letra inicial incorrecta");
                return false;
        }

        var digitos = tarj.substring(1, 8);

        if(! validateNum(digitos))
        {
                alert("Revise la Tarjeta de Residente. Faltan dígitos");
                return false;
        }

        var nrodni = tarj.substring(1,8);
        var letradni = tarj.substring(8,9).toUpperCase();
        var cociente23 = 0;
        
        if (letradni.length==0 || letradni==null)
        {
                alert("Por favor, escriba la letra de la tarjeta");
                return false;
        }
        
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
                ((cociente23==22) && (letradni=="E"))) 
                                return true;
        else
        {
                alert("Tarjeta de Residente errónea");
                return false;
        }
}

function validateNIF(obj)
{
        var cerosquefaltan=0;
        var ceros="";
        var i;
        
        if (obj.length==0)
    {
      bien=1;
      return true;
    }
        cerosquefaltan=9-obj.length;

        for(i=1;i<=cerosquefaltan;i++) 
                ceros=ceros+"0";

        obj=ceros+obj;
        
        var nrodni = obj.substring(0,8);
        var letradni = obj.substring(8,9).toUpperCase();
        var cociente23 = 0;
        
        if (letradni.length==0 || letradni==null)
        {
                alert("Por favor, escriba la letra del NIF");
                return false;
        }
        
        if (Numerico(nrodni,nrodni.length))
        {
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
                        ((cociente23==22) && (letradni=="E"))) 
                {
                                bien=1;
                                return true;
                }
                
                alert("La letra del NIF es incorrecta");
                return false;
        }
        else  
        {
                alert("El NIF debe ser numérico");
                return false;
  }

}   // Fin de ValidaNIF

//Fecha con formato: dd/mm/aaaa
function validateFecha(fecha)
{
        if (fecha.length != 10)
        {
                alert("Introduzca la fecha completa dd/mm/aaaa");
                return 0;
        }
  
        dd = fecha.substring(0, 2);             // d&iacute;a
        s1 = fecha.substring(2, 3);             // '/'
        mm = fecha.substring(3, 5);             // mes
        s2 = fecha.substring(5, 6);             // '/'
        aaaa = fecha.substring(6, 10);  // a&ntilde;o

        if (isNaN(dd))
        {
                alert("El Dia debe ser un valor numérico entre 1 y 31");
                return 0;
        }
        if (isNaN(mm))
        {
                alert("El Mes debe ser un valor numérico entre 1 y 12");
                return 0;
        }
        if (isNaN(aaaa))
        {
                alert("El Año debe ser un valor numérico.");
                return 0;
        }

        //Errores b&aacute;sicos
        if (mm<1 || mm>12)
        {
                alert("Mes incorrecto");
                return 0;
        }
  
        if (s1 != '/')
        {
                alert("Separador incorrecto. Utilice / como separador."); 
                return 0;
        }
  
        if (dd<1 || dd>31)
        {
                alert("Día incorrecto");
                return 0;
        }

        if (s2 != '/')
        {
                alert("Separador incorrecto. Utilice / como separador.");
                return 0;
        }

        if (aaaa<0 || aaaa>3000)
        {
                alert("Año incorrecto");
                return 0;
        }
    
        // Errores avanzados
        // Meses con 30 d&iacute;as
        if (mm==4 || mm==6 || mm==9 || mm==11)
        {
                if (dd==31)
                {
                        alert("Día incorrecto. El mes " + m + " solo tiene 30 días");
                        return 0;
                }
        }

        // Febrero, a&ntilde;o bisiesto
        if (mm==2)
        {
                var aux = parseInt(aaaa/4, 10);

                if (isNaN(aux))
                {
                        alert("Día incorrecto");
                        return 0;
                }

                if (dd>29)
                {
                        alert("Día incorrecto. Año bisiesto.");
                        return 0;
                }

                if (dd==29 && ((aaaa/4)!=parseInt(aaaa/4, 10)))
                {
                        alert("Día incorrecto");
                        return 0;
                }
        }

        return 1;
}

function validateNumLong(num, longitud, campo)
{
        if( (trim(num).length != longitud) || (! isNumeric(num)) ) {
                alert ("El campo "+campo+" debe tener una longitud de "+longitud+" caracteres");
                return 0;
        }

        return 1;
}

function validateNum(num)
{
        if (! isNumeric(num)) 
                return 0;

        return 1;
}

function validateString(str)
{
        if(trim(str).length == 0)
                return 0;

        return 1;
}

//Avanza de campo a medida que introducimos una fecha
function change(obj)
{
        if((obj.name).indexOf("dia") != -1)
        {       
                if((obj.value).length == 2)
                {
                        nelem = (obj.name).replace("dia", "mes");
                        eval("document.datos." +  nelem + ".focus()");
                }
        }

        if((obj.name).indexOf("mes") != -1)
        {       
                if((obj.value).length == 2)
                {
                        nelem = (obj.name).replace("mes", "anio");
                        eval("document.datos." +  nelem + ".focus()");
                }
        }
}

function isEmpty(campo) {
        var blanco = false;
        micampo = campo.value;
        if      (micampo.length == 0)   {
                blanco = true;
        }

        return blanco;
}

function isNumber (cadena)
{
    var i;
    var numero = true;
        if(cadena=="") {
                return false;
        }
    for (i=0; (i<cadena.length && numero) ;i++)
    {        
        if (!( ('0'<=cadena.charAt(i)) && (cadena.charAt(i)<='9')) )        
                        numero = false;     
        }
        return numero;
}

function rellenoObligatorio(campo,numerico,nombre){

        if(numerico){
                
                if((isEmpty(campo)) || (!isNumber(campo.value)))
                {
                        alert("El campo " + nombre + " esta vacío o no es un valor numérico");
                        return false; 
                }               
        return true;
        }//if
        else{
                if(isEmpty(campo))
                {
                        alert("El relleno del campo " + nombre + " es obligatorio para completar el formulario, por favor rellene el dato ");
                        return false;
                }
        return true;
        }//else
}

// Selecciona el valor que se le indica en un select
function seleccionarSelect(select, valor)
{
  	var bEncontrado = false;
	
	for(var i = 0; i < select.options.length && !bEncontrado; i++)
	{
		bEncontrado = (select.options[i].value == valor);
	}
	
	if(bEncontrado)
	{
		select.options[--i].selected = true;
	}
}

/*
* FUNCION que se le pasa un numero y devuelve true si
* es entero sin signo
*/
function isNumber (cadena)
{
    var i;
    var numero = true;
	if(cadena=="")
    {
		return false;
	}
    for (i=0; (i<cadena.length && numero) ;i++)
    {
        if (!( ('0'<=cadena.charAt(i)) && (cadena.charAt(i)<='9')) )
		{
			numero = false;
		}
	}
	return numero;
}

/*
* FUNCION que se le pasa un importe y el separador
* de decimales y comprueba que solo tenga uno y dos decimales.
* Devuelve "" si es correcto o una cadena de error
* que debemos concatenar al nombre del campo
*/
function isImporte (cadena, sep)
{
	var entera=0;
	var decimal=0;
	var aux="";

    if(cadena.indexOf(sep)!=-1)
	{
		aux=cadena.substring(cadena.indexOf(sep)+1,cadena.length);
		if (aux.indexOf(sep)!=-1)
		{
			return " solo puede tener una coma";
		}
	}

	if  (cadena.indexOf(sep)!=-1)
	{

		entera=cadena.substring(0,cadena.indexOf(sep));
		decimal=cadena.substring(cadena.indexOf(sep)+1,cadena.length);


		if (entera=="")
		{
			return " si tiene coma debe tener parte entera";
		}

		if (decimal=="")
		{
			return " si tiene coma debe tener parte decimal";
		}

		if (!isNumber(entera))
		{
			return " tiene que ser numérico";
		}
		else
		{
			if (!isNumber(decimal))
			{
				return " tiene que ser numérico";
			}
			else
		    {
			 if (decimal.length > 2)
			 {
				 return " no puede tener más de dos decimales";
			 }
			 else
					return "";
			}
		}
	}
	else
	{

		if (!isNumber(cadena))
		{
			return " tiene que ser numérico";
		}
		else
		{
			return "";
		}
	}

}