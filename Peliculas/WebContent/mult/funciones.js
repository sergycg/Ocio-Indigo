function comparacion(fechaIn, fechaFi){
        var diaIn=fechaIn.substring(0,fechaIn.indexOf('-'));
        var tempmesIn=fechaIn.substring(fechaIn.indexOf('-')+1);
        var mesIn=tempmesIn.substring(0,tempmesIn.indexOf('-'));
        var anioIn=tempmesIn.substring(tempmesIn.indexOf('-')+1);

        var diaFi=fechaFi.substring(0,fechaFi.indexOf('-'));
        var tempmesFi=fechaFi.substring(fechaFi.indexOf('-')+1);
        var mesFi=tempmesFi.substring(0,tempmesFi.indexOf('-'));
        var anioFi=tempmesFi.substring(tempmesFi.indexOf('-')+1);
        
        if (diaIn.length == 1)
        {
                diaIn = "0" + diaIn;
        }
        if (mesIn.length == 1)
        {
                mesIn = "0" + mesIn;
        }
        if (diaFi.length == 1)
        {
                diaFi = "0" + diaFi;
        }
        if (mesFi.length == 1)
        {
                mesFi = "0" + mesFi;
        }

        if (!(isNumber(diaIn)))
        {
        window.alert("El dia debe ser numerico");
        return "fallo"; 
        }
        else
        {       
                if (!(isNumber(mesIn)))
                {
                        window.alert("El mes debe ser numerico");
                        return "fallo";
                }
                else
                {
                        if (!(isNumber(anioIn)))
                        {
                                window.alert("El año debe ser numerico");
                                return "fallo";
                        }
                        else
                        {       
                                if (!(isNumber(diaFi)))
                                {
                                        window.alert("El dia debe ser numerico");
                                        return "fallo";
                                }
                                else
                                {       
                                        if (!(isNumber(mesFi)))
                                        {
                                        window.alert("El mes debe ser numerico");
                                        return "fallo";
                                        }
                                        else
                                        {
                                                if (!(isNumber(anioFi)))
                                                {
                                                        window.alert("El año debe ser numerico");
                                                        return "fallo";
                                                }
                                                else
                                                {
                                                        if (anioFi < anioIn)
                                                        {
                                                                return "mal";
                                                        }
                                                        else
                                                        {
                                                                if (anioIn == anioFi && mesFi < mesIn)
                                                                {
                                                                        return "mal";
                                                                }
                                                                else
                                                                {
                                                                        if (anioIn == anioFi && mesIn == mesFi && diaFi < diaIn)
                                                                        {
                                                                                return "mal";
                                                                        }
                                                                        else
                                                                        {
                                                                                return "bien";
                                                                        }       
                                                                }
                                                        }               
                                                }
                                        }
                                }
                        }
                }
        }
}
function comprobacion(fecha){
        if (!((fecha.indexOf('-')==2 && fecha.indexOf('-',3)==5) 
                                || (fecha.indexOf('-')==1 && fecha.indexOf('-',2)==3)
                                || (fecha.indexOf('-')==1 && fecha.indexOf('-',2)==4)
                                || (fecha.indexOf('-')==2 && fecha.indexOf('-',3)==4)))
                {
                        window.alert("Introduzca fecha correcta separada por un guion (-)");
                        return "mal";
                }
                else
                {
                        var diaDet=fecha.substring(0,fecha.indexOf('-'));
                        var temporalmes=fecha.substring(fecha.indexOf('-')+1);
                        var mesDet=temporalmes.substring(0,temporalmes.indexOf('-'));
                        var anioDet=temporalmes.substring(temporalmes.indexOf('-')+1);
                        if (diaDet.length == 1)
                        {
                                diaDet = "0" + diaDet;
                        }       
                        if (mesDet.length == 1)
                        {
                                mesDet = "0" + mesDet;
                        }       
                        if (anioDet.length != 4)
                        {
                                window.alert("Debe introducir un año correcto");
                                return "mal";
                        }
                        else
                        {
                                if (!(isNumber(diaDet)))
                                {
                                        window.alert("El dia debe ser numerico");
                                        return "mal";
                                }
                                else
                                {
                                        if (!(isNumber(mesDet)))
                                        {
                                                window.alert("El mes debe ser numerico");
                                                return "mal";
                                        }
                                        else
                                        {
                                                if (!(isNumber(anioDet)))
                                                {
                                                        window.alert("El año debe ser numerico");
                                                        return "mal";
                                                }
                                                else
                                                {
                                                        if (!(fechaValida(diaDet, mesDet, anioDet)))
                                                        {
                                                                window.alert("Debe introducir una fecha correcta");
                                                                return "mal";
                                                        }
                                                        else
                                                        {
                                                                var fechaResultado=componeFecha(diaDet, mesDet, anioDet);
                                                                return fechaResultado;
                                                        }
                                                }
                                        }
                                }
                        }       
                }
}

function componeFecha(dia, mes, anio){
        var fecha=anio+"-"+mes+"-"+dia;
        return fecha;
}

function fechaValida(dia, mes, ano)
{
        if ((mes > 12) || (mes < 0) || (dia < 0) || (dia >31)||(ano<1900))
                return false;                           
        else
        {
                if ((mes == 4) || (mes == 6) || (mes == 9) || (mes == 11))                      
                {
                        return (dia < 31);
                }
                else if (mes == 2)
                {
                        if((ano%400==0)||((ano%4==0)&&(ano%100!=0)))
                        {
                                return (dia<30);
                        }
                        else
                        {
                        return (dia<29);
                        }
                }
                else            
                {
                        return (dia < 32);                                      
                }
        }
}

function isNumber(cadena)
{
    var i;
    var numero = (cadena.length > 0);
    for (i=0; (i<cadena.length && numero) ;i++)
    {        
        if (!(('0'<=cadena.charAt(i)) && (cadena.charAt(i)<='9')))        
                        numero = false;     
        }
        return numero;
}
