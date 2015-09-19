
//Calcula el digito de control de una cuenta bancaria
//formato: banco (4) sucursal (4) dig.control(2) cuenta(10)
function calculoDigitoControlOK (banco, sucursal, cuenta, digcontrol)
{
		alert(banco.value);
		alert(sucursal.value);
		alert(cuenta.value);
		alert(digcontrol.value);
		//Comprobamos que ninguno de los campos nos llege vacío
		if( (trim(banco.value).length == 0) || (trim(sucursal.value).length == 0) ||
			(trim(cuenta.value).length == 0) || (trim(digcontrol.value).length == 0) )
		{
				alert("Rellene la cuenta a utilizar.");
				return false;
		}

		//Verificamos que los datos sean numéricos
		if(! validateNum(banco.value) || ! validateNum(sucursal.value) || ! validateNum(cuenta.value) || ! validateNum(digcontrol.value))
		{
			alert("La cuenta debe ser un campo numérico");
			return false;
		}

        //asignacion de pesos
        pesosbanco = new makeArray(4);
        pesosbanco[1] = 4;
        pesosbanco[2] = 8;
        pesosbanco[3] = 5;
        pesosbanco[4] = 10;
        sumabanco = calcularPesos(banco,pesosbanco);

        pesossucursal = new makeArray(4);
        pesossucursal[1] = 9;
        pesossucursal[2] = 7;
        pesossucursal[3] = 3;
        pesossucursal[4] = 6;
        sumasucursal = calcularPesos(sucursal,pesossucursal);

        pesoscuenta = new makeArray(10);
        pesoscuenta[1] = 1;
        pesoscuenta[2] = 2;
        pesoscuenta[3] = 4;
        pesoscuenta[4] = 8;
        pesoscuenta[5] = 5;
        pesoscuenta[6] = 10;
        pesoscuenta[7] = 9;
        pesoscuenta[8] = 7;
        pesoscuenta[9] = 3;
        pesoscuenta[10] = 6;

        ceros = 10-cuenta.length; //numero de ceros de relleno si cuenta <10 numeros
        concatenar = "";

        for (i=1;i<=ceros;i++) 
                concatenar=concatenar+"0";

		cuenta.value = concatenar + cuenta.value;
	    //aqui cuenta ya tiene 10 digitos incluyendo 0 de relleno
  
        sumacuenta = calcularPesos(cuenta,pesoscuenta);
        cdg1 = 11 - calcularMOD11(sumabanco + sumasucursal);
		cdg2 = 11 - calcularMOD11(sumacuenta);

        fdc = digcontrol.value;

        if (cdg1 != fdc.substring (0,1)) //primer digito incorrecto
    {            
      alert ('El dígito de control no es correcto. Revise la cuenta introducida.');
      return false;
    }
        else  //primer digito ok
        {
                if (cdg2 != fdc.substring (1,2)) //segundo digito incorrecto
                {
                        alert('El dígito de control no es correcto. Revise la cuenta introducida.');
                        return false;
                }
    }

        return true; //digitos ok
}

 function calcularMOD11(valor) //calcula modulo 11 y excepciones
    {
      if ( (valor % 11) == 0)  //si es multiplo de 11 devuelve 11
        {
          return 11;
        }
      else 
        {
          if ((valor % 11) == 1) //si es multiplo de 11 +1 (12,23,34,...) devuelve 10
            {
              return 10;
            }
        }
      return (valor % 11); //casos normales
    } //fin funcion


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
	longitud = valor.length;
	suma = 0;

	for (var i=0; i<=longitud-1; i++) 
		suma = suma + (valor.substring(i,i+1) * pesos[i+1]);

	return suma;
}
//fin de las funciones que validan el digito de control de los datos bancarios


//Función que elimina los caracteres blancos tanto por la derecha como
//por la izquierda
function trim(argvalue) 
{
  var tmpstr = ltrim(argvalue);

  return rtrim(tmpstr);
}

//Función que elimina los caracteres blancos por la izquierda
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

//Función que elimina los caracteres blancos por la derecha
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

function validateNum(num)
{
	if (! isNumeric(num)) 
		return false;

	return true;
}

//Informa sobre si el argumento que le pasamos está formado
//única y exclusivamente por dígitos
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

