/*
*   ARCHIVO JAVASCRIPT CON FUNCIONES VARIAS
*
*   CONTENIDO:
*
*	function isNumber (cadena); valida cadenas enteras.
*	function isImporte (cadena); valida cadenas enteras. El decimal es la "," y sin ".".
*   funcion Separador (cadena); Devuelve un string con el separador utilizado para los decimales de cadena.
*	function CambiaSeparador (cadena, sepf); Cambia el separador de decimales par el que recibe.
*	function TruncaDecimales(cadena, numdec); Trunca el número de decimales al numero que recibe.
*
*/

/*
* Capturar pulsacion de teclado para no permitir caractes no numericos, solo deja numeros, borrar y punto
*
*/


function manejaPulsacionNet(evento)
{
  var c=String.fromCharCode(evento.which);


  if ( ((c<'0' )  || (c>'9') )  && (evento.which!=8) && (c!='.'))
  {
    return false;
  }

}

function Pulsacion()
{
  return manejaPulsacionIE(window.event.keyCode);
}

function manejaPulsacionIE(keyCode)
{
  var c=String.fromCharCode(keyCode);
  if ( ((c<'0')  || (c>'9') ) && (keyCode!=8) && (c!='.'))
  {
    return false;
  }

}

function manejaPulsacionNet2(evento)
{
  var c=String.fromCharCode(evento.which);


  if ( ((c<'0' )  || (c>'9') )  && (evento.which!=8) )
  {
    return false;
  }

}

function Pulsacion2()
{
  return manejaPulsacionIE2(window.event.keyCode);
}

function manejaPulsacionIE2(keyCode)
{
  var c=String.fromCharCode(keyCode);
  if ( ((c<'0')  || (c>'9') ) && (keyCode!=8) )
  {
    return false;
  }

}

function capturaTecla()
{
	if (navigator.appName == 'Netscape')
	{
		document.captureEvents(Event.KEYPRESS);
		document.onkeypress=manejaPulsacionNet;
	}
	else
	{
		onkeypress=document.onkeypress;
		document.onkeypress=Pulsacion;
	}
}

function liberaTecla()
{
	if (navigator.appName == 'Netscape')
	{
		document.releaseEvents(Event.KEYPRESS)
	}
	else
	{
		document.onkeypress=onkeypress;
	}
}

function capturaTecla2()
{
	if (navigator.appName == 'Netscape')
	{
		document.captureEvents(Event.KEYPRESS);
		document.onkeypress=manejaPulsacionNet2;
	}
	else
	{
		onkeypress=document.onkeypress;
		document.onkeypress=Pulsacion2;
	}
}

function liberaTecla2()
{
	if (navigator.appName == 'Netscape')
	{
		document.releaseEvents(Event.KEYPRESS)
	}
	else
	{
		document.onkeypress=onkeypress;
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

		//alert("2@"+cadena+"> "+entera+"<"+decimal);


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

/*
* FUNCION que se le pasa un importe y comprueba
* cual es su separador de decimales.
*/
function Separador (cadena)
{
	if(cadena.indexOf(",")==-1)
		if(cadena.indexOf(".")==-1)
			return " "
		else
			return "."
	else
		return ","
}

/*
* FUNCION recibe el importe y el separador final.
* Devuelve el importe con el separador cambiado.
*/
function CambiaSeparador (cadena, sepf)
{
	var sep=Separador(cadena);
	if(cadena.indexOf(sep)!=-1)
	{
		entera=cadena.substring(0,cadena.indexOf(sep));
		decimal=cadena.substring(cadena.indexOf(sep)+1,cadena.length);
		return entera+sepf+decimal;
	}
	else
		return cadena;
}

/*
* FUNCION recibe el importe y el numero de decimales.
* Devuelve el importe con el número de decimales recibido.
*/
function TruncaDecimales(cadena, numdec)
{
	var sep=Separador(cadena);
	if(cadena.indexOf(sep)!=-1)
	{
		entera=cadena.substring(0,cadena.indexOf(sep));
		decimal=cadena.substring(cadena.indexOf(sep)+1,cadena.length);
		if (decimal.length>numdec)
			decimal=decimal.substring(0,numdec);

		return entera+sep+decimal;
	}
	else
		return cadena
}

function reemplazarimporte(objeto)
	{
        		objeto=objeto.replace(',','.');
        		return objeto;
	}
