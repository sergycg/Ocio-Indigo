
function getSeparador(cadena)
{
        if (cadena.indexOf('/')>=0)
                return "/";
        else
                return "-";
}       
function validarSeparadores(cadena)
{
   var f = document.forms[0];
   
   if ((cadena.indexOf('/') < cadena.lastIndexOf('/')) ||
         (cadena.indexOf('-') < cadena.lastIndexOf('-')))
       return true;
   else
       return false;
}    
function fechaValida (dia, mes, ano)
{
    var formatoCorrecto = (ano.length < 5 && mes.length < 3 && dia.length <3)
    if ((mes > 12) || (mes < 1) || (ano < 1900) || (dia < 1) || (dia >31))          
                return false;                           
        else
        {
                if ((mes == 4) || (mes == 6) || (mes == 9) || (mes == 11))                      
                        return ((dia < 31) && formatoCorrecto);
                else if (mes == 2)
                        return (dia<30 && formatoCorrecto)
                else            
                        return (dia < 32 && formatoCorrecto);                                   
        }
}
function validarFecha(fecha)
{            
    var dia = "";
    var mes = "";
    var ano = "";
    var sep = "";
    if (fecha.length == 0)              
                return true;                    
    if (validarSeparadores(fecha))    
    {
        sep = getSeparador(fecha);
                dia = fecha.substring (0,fecha.indexOf(sep));
                mes = fecha.substring (fecha.indexOf(sep)+1,fecha.lastIndexOf(sep));
                ano = fecha.substring (fecha.lastIndexOf(sep)+1,fecha.length);          
                if (isNumber(dia) && isNumber(mes) && isNumber(ano))
                {                       
                        if (fechaValida(dia, mes, ano))
                                return true;            
                        else                    
                                return false;                                                   
        
                }
                else                            
                        return false;           
        }
        else    
                return false;   
}       

function isNumber (cadena)
{
    var i;
    var numero = true;
    for (i=0; (i<cadena.length && numero) ;i++)
    {        
        if (!( (('0'<=cadena.charAt(i)) && (cadena.charAt(i)<='9')) ) )        
                        numero = false;     
        }
        return numero;
}

function mensaje(control)
{
     window.alert ("el campo " + control.name + " es obligatorio");
     control.focus();     
}
function enviar()
{
    var otraEleccion = 3;
    f=document.forms[0];
    
    if (f.cuantia[otraEleccion].checked)
        f.cuantia[otraEleccion].value = f.otraCuantia.value;
        
    if (f.duracion[otraEleccion].checked)
        f.duracion[otraEleccion].value = f.otraDuracion.value;        
                
    f.submit();
}
function valido (control)
{
    var ok = true;
    if (control.value.length == 0)
    {
                mensaje (control);
                ok = false;
    }
        return ok;
}
        
function ComprobarDatosBancarios()
{
    var controles2 = new Array(21,22,23,24,25,26,27);    
    var ok2 = true;
    var f = document.forms[0];    
        for (i = 0;i<controles2.length && ok2;i++)            
    if (f.elements[controles2[i]].value.length == 0)
    {
                mensaje (f.elements[controles2[i]]);
                ok2 = false;
    }
        return ok2;
}

function comprobar()
{     
    var controles = new Array(0,1,2,3,4,6);    
    var otraEleccion = 3;
    var ok = true;
    var f = document.forms[0];    

          for (i = 0;i<controles.length && ok;i++)            
          {
                if (!valido(f.elements[controles[i]]))
                        ok = false;     
                if (f.cuantia[otraEleccion].checked && ok)
                {
                        if (f.otraCuantia.value.length == 0)
                        {
                                window.alert ("Si selecciona la opcion de otra cuantia debe especificarla.");
                                f.otraCuantia.focus();
                                ok = false;
                        }
                        else
                        {
                                if (!isNumber(f.otraCuantia.value))
                                {
                                        window.alert ("El campo 'Otra Cantidad' ha de contener valores numericos.");
                                        f.otraCuantia.select();
                                        f.otraCuantia.focus();
                                        ok = false;                 
                                }
//                                else
//                                      if (document.fcontratacion.otraCuantia.value < 5000) 
        //                              {
                //                              alert("El campo 'Otra cantidad' debe de ser mayor de 5.000 ptas");
                        //                      f.otraCuantia.select();
                                //              f.otraCuantia.focus();
                                        //}
                        }
                }               
        }               
                if (f.duracion[otraEleccion].checked && ok)
                {
                        if (f.otraDuracion.value.length == 0)
                        {
                                window.alert ("Si selecciona la opcion de otra duracion debe especificarla.");
                                f.otraDuracion.focus();
                                ok = false;
                        }       
                        else
                        {
                                if (!isNumber(f.otraDuracion.value))
                                {
                                        window.alert ("El otra duracion ha de contener valores numericos.");
                                        f.otraDuracion.select();
                                        f.otraDuracion.focus();
                                        ok = false;                 
                                }
                        }
                }                   
                if (!isNumber(f.telefono.value) && ok)
                {
                        window.alert ("El campo n£mero de tel‚fono ha de contener valores num‚ricos.");
                        f.telefono.select();
                        f.telefono.focus();
                        ok = false;
                }        
                if (!isNumber(f.cp.value) && ok)
                {
                        window.alert ("El campo C¢digo Postal ha de contener valores num‚ricos.");
                        f.cp.select();
                        f.cp.focus();
                        ok = false;
                }               
                if (!validarFecha(f.fechaNacimiento.value) && ok)
                {
                        window.alert ("Debe introducir una fecha v lida con formato: dd/mm/aaaa.");
                        f.fechaNacimiento.select();
                        f.fechaNacimiento.focus();
                        ok = false;
                }       

if (f.clave.value == 'contratar')
        {//Si el boton pulsado es 'Deseo contratar' tambi‚n son obligatorios los datos bancarios
        if (ok)
      if(ComprobarDatosBancarios())
                return true;
          else
                return false;
        }
else
        return ok;

}

function validarCuantia(caja)
{
if (caja == 1)
{
   if (document.fcontratacion.otraCuantia.value != "0")
   {
      document.fcontratacion.cuantia["otro"].checked = true;
          if(document.fcontratacion.otraCuantia.value < 5000)
                        {
                                 alert("El valor de 'otra cuantia del ahorro mensual' debe de ser mayor de 5.000 ptas");
                                 document.fcontratacion.otraCuantia.focus();
                        }
        }
   else
      document.fcontratacion.cuantia["cinco"].checked = true;
            
}
else
{
   if (document.fcontratacion.aportacion.value != "0")
      if (document.fcontratacion.aportacion.value < 50000) 
      {
         alert("El valor de la 'Aportaci¢n extraordinaria inicial' debe de ser mayor de 50.000 ptas");
         document.fcontratacion.aportacion.focus();
      }
   }
}


function validarAnyo()
{
        if (document.fcontratacion.otraDuracion.value != "0")
        {
                    document.fcontratacion.duracion["otro"].checked = true;
                        if(document.fcontratacion.otraDuracion.value < 12)
                                {
                                         alert("El valor de 'otra duraci¢n del ahorro' debe de ser mayor de 12 a¤os");
                                         document.fcontratacion.otraDuracion.focus();
                                }
        }
        else
        {
                    document.fcontratacion.duracion["doce"].checked = true;
        }

}


