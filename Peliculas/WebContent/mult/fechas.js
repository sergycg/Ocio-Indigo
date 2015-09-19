
/* 
*   ARCHIVO JAVASCRIPT CON FUNCIONES PARA VALIDAR FECHAS
*       
*   CONTENIDO:
*   function validarFecha(fecha); valida fechas con formato 'dd/mm/aaaa' o 'dd-mm-aaaa'
*       function validarSeparadores(cadena); utilizada en validarFecha
*       function getSeparador(cadena); utilizada en validarFecha
*       function isNumber (cadena); valida cadenas enteras,  utilizada en validarFecha 
*       function fechaValida (dia, mes, ano); valida fechas por encima de 1900,  utilizada en validarFecha
*       function esBisiesto(anyo_i); valida si un año es bisiesto
*       function fechaRestaDias(dia_f, mes_f, anyo_f, resta_dias)
*       function rangofechas(dia_f, mes_f ,año_f, resta, dia_i, mes_i, año_i)
*       function comparaFechas (desde_dia, desde_mes, desde_ano, hasta_dia, hasta_mes, hasta_ano)
*       function comprobacion(fecha)
*       function trocea (fecha)
*       function componeFecha(dia, mes, anio) 
*       function numerico(dia, mes, anio)
*       function compruebaSeparador (fec)
*   function rellenoObligatorio(campo,numerico,nombre) -> Descripcion en la propia funcion.
*/



/* 
* FUNCION que se le pasa una fecha 
* y comprueba que estos esten dentro de los rangos
* numericos de una fecha
* llamadas a otras funciones:
*   - validarSeparadores(fecha)
*   - getSeparador(fecha)
*   - isNumber(dia)
*   - fechaValida(dia, mes, ano)
*/

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

                if ((dia.length != 2) || (mes.length != 2) || (ano.length != 4)) return false;

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


/* 
* FUNCION que se le pasa una cadena que contiene una fecha con
* separadores '/' o '-' y se comprueba que tenga 2 o mas 
*/
function validarSeparadores(cadena)
{
   if ( (cadena.indexOf('/') < cadena.lastIndexOf('/')) || (cadena.indexOf('-') < cadena.lastIndexOf('-')) )
       return true;
   else
       return false;

}


/* 
* FUNCION que se le pasa una cadena que contiene una fecha con
* separadores '/' o '-' y devuelve el separador 
*/
function getSeparador(cadena)
{
        if (cadena.indexOf('/')>=0)
                return "/";
        else
                return "-";
}       


/* 
* FUNCION que se le pasa un numero y devuelve true si 
* es entero sin signo
*/
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


/* 
* FUNCION que se le pasa un dia, mes y un año 
* y comprueba que estos esten dentro de los rangos
* numericos de una fecha
* año >1900 y 4 digitos
* 0 < mes < 12
* 0 < dia < 31
*/
function fechaValida (dia_s, mes_s, ano_s)
{
    var formatoCorrecto = (ano_s.length < 5 && mes_s.length < 3 && dia_s.length <3)

        if ((mes_s > 12) || (mes_s < 1) || (ano_s < 1900) || (dia_s < 1) || (dia_s >31))            
                return false;                           
        else {
                if ((mes_s == 4) || (mes_s == 6) || (mes_s == 9) || (mes_s == 11)) {                    
                        return ((dia_s < 31) && formatoCorrecto);
                } else {
                        if (mes_s == 2) {
                                if (esBisiesto(ano_s)) {
                                        return (dia_s<30 && formatoCorrecto);
                                } else {
                                        return (dia_s<29 && formatoCorrecto);
                                }
                        } else {
                                return (dia_s < 32 && formatoCorrecto);
                        }
                }
        }
}


/* 
* FUNCION que devuelve si es bisiesto o no un año dado
*/
function esBisiesto(anyo_i) {
        var anyo = parseInt(anyo_i , 10);
        
        if(((anyo % 4 == 0) && (anyo % 100 != 0)) || (anyo % 400 == 0)) {
                return true;
        } else {
                return false;
        }
}


/* 
* FUNCION que se le pasa un dia, mes y un año (fecha) y una resta (dias hasta fecha 'hasta')
* y devuelve un entero de 8 digitos que contiene la fecha 'desde' que cumple el intervalo resta.
* La funcion tiene en cuenta los años bisiestos.
* El entero que devuelve cumple el formato:
*  aaaammdd  (anyo+*10000)+(mes*100)+dia
*/
function fechaRestaDias(dia_f, mes_f, anyo_f, resta_dias) {
        var diasMes = new Array();
        diasMes[0] = 31;
        diasMes[1] = 28;
        diasMes[2] = 31;
        diasMes[3] = 30;
        diasMes[4] = 31;
        diasMes[5] = 30;
        diasMes[6] = 31;
        diasMes[7] = 31;
        diasMes[8] = 30;
        diasMes[9] = 31;
        diasMes[10] = 30;
        diasMes[11] = 31;
        
        var dia = parseInt(dia_f , 10);
        var mes = parseInt(mes_f , 10); 
        var anyo = parseInt(anyo_f , 10);       
        var resta = parseInt(resta_dias , 10);  

        if (resta >= dia) {
                while (resta >= dia) {
                        resta -= dia;
                        mes = mes - 1;
                        // si estábamos en Enero pasamos a Diciembre del año anterior
                        if (mes==0) {
                                mes = 12;
                                anyo = anyo - 1;
                                // Si el año es bisisesto entonces Febrero tiene 29 días
                                if(((anyo % 4 == 0) && (anyo % 100 != 0)) || (anyo % 400 == 0)) {
                                        diasMes[1] = 29;
                                } else {
                                        diasMes[1] = 28;
                                }
                        }
                        dia = diasMes[mes - 1];
                }
        } else {
                dia -= resta;
                return ( (anyo*10000) + (mes*100) + dia );
        }

        // si la resta coincide con el día entonces establecemos a resta el nº de días del més
        if (resta == 0) {
                resta = diasMes[mes - 1];
        }
        return  ( (anyo*10000) + (mes*100) + (dia - resta) ) ;
}


/* 
* FUNCION que se le pasan los parametros:
 - dia_f, mes_f y año_f (fecha 'hasta')
 - resta (dias hasta fecha 'hasta')
 - dia_i, mes_i y año_i (fecha 'desde')
*  
* Comprueba que la diferencia de dias entre las dos fechas no excede de resta
*/
function rangofechas(dia_f, mes_f ,ano_f, resta, dia_i, mes_i, ano_i) {
        var fecha_i_real = fechaRestaDias( parseInt(dia_f , 10), parseInt(mes_f , 10), parseInt(ano_f , 10), parseInt(resta , 10));
        var fecha_i_comp = (parseInt(ano_i , 10)*10000) + (parseInt(mes_i , 10)*100) + parseInt(dia_i , 10);
        if (fecha_i_real <= fecha_i_comp) 
                return true;
                else
                        return false;
}

/* 
* FUNCION que se le pasan los parametros:
 - desde_dia, desde_mes y desde_ano (fecha 'desde')
 - hasta_dia, hasta_mes y hasta_ano (fecha 'hasta')
*  
*       El dia y el mes deben tener una longitud de dos. Ej: 01,02,03...
*
* Comprueba que la fecha 'desde' es menor o igual que la fecha 'hasta'.
*/

function comparaFechas (desde_dia, desde_mes, desde_ano, hasta_dia, hasta_mes, hasta_ano)
{
        if (desde_ano>hasta_ano){
                return false;                           
        }
        else
        {
            if ((desde_ano==hasta_ano) && (desde_mes>hasta_mes)){           
                        return false;                           
                }
                else    
                {
                    if ((desde_ano==hasta_ano) && (desde_mes==hasta_mes) && (desde_dia>hasta_dia)){
                                return false;                           
                        }
                }
        }
        return true;
}

/*
* Grupo fi. Ultima modificacion 13-06-2000, 11:00 h. 
* Comprueba que la fecha dd-mm-aaaa tenga como separador guion, que el año tenga 4 digitos,
* que sea numerica y que sea valida. Devuelve la fecha en formato aaaa-mm-dd.
*/

function comprobacion(fecha){
        if(!compruebaSeparador(fecha))
        {
                return "mal";
        }
        else
        {
                var arrayFechaDet = new Array(3);
                arrayFechaDet = trocea(fecha);
                var diaDet=arrayFechaDet[0];
                var mesDet=arrayFechaDet[1];
                var anioDet=arrayFechaDet[2];
                if (anioDet.length != 4)
                {
                        window.alert("Debe introducir un año correcto");
                        return "mal";
                }
                else
                {
                        if (!numerico(diaDet, mesDet, anioDet))
                        {
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

/*
* Grupo fi. Ultima modificacion 13-06-2000, 11:00 h. 
* Trocea la fecha introducida con guion como separador, separando el dia, el mes y el año.
* Devuelve un Array con el dia, mes y año.
*/

function trocea (fecha)
{
        var miArray = new Array(3);
        miArray = fecha.split("-");
        
        if (miArray[0].length == 1)
        {
                miArray[0] = "0" + miArray[0];
        }       
        if (miArray[1].length == 1)
        {
                miArray[1] = "0" + miArray[1];
        }       
        
        return miArray; 
}

/* 
* Grupo fi. Ultima modificacion 13-06-2000, 11:00 h.
* Se le pasa dd, mm y aaaa y devuelve aaaa-mm-dd.
*/

function componeFecha(dia, mes, anio) {
        var fecha=anio+"-"+mes+"-"+dia;
        return fecha;
}

/* 
* Grupo fi. Ultima modificacion 13-06-2000, 11:00 h.
* Comprueba que el dia, el mes y el año sean numericos. En caso contrario lanza alert.
*/

function numerico(dia, mes, anio) {
        var statusNumer = true;
        if (!(isNumber(dia)))
        {
                window.alert("El dia debe ser numerico");
                statusNumer = false;
        }
        else
        {
                if (!(isNumber(mes)))
                {
                        window.alert("El mes debe ser numerico");
                        statusNumer = false;
                }
                else
                {
                        if (!(isNumber(anio)))
                        {
                                window.alert("El año debe ser numerico");
                                statusNumer = false;
                        }
                }       
        }
        
        return statusNumer;
}

/* 
* Grupo fi. Ultima modificacion 13-06-2000, 11:00 h.
* Comprueba que el separador de la fecha sea un guion.
*/

function compruebaSeparador (fec)
{
        var fecStatus = true;
        if (!((fec.indexOf('-')==2 && fec.indexOf('-',3)==5) 
                                || (fec.indexOf('-')==1 && fec.indexOf('-',2)==3)
                                || (fec.indexOf('-')==1 && fec.indexOf('-',2)==4)
                                || (fec.indexOf('-')==2 && fec.indexOf('-',3)==4)))
        {
                window.alert("Introduzca fecha correcta separada por un guion (-)");
                fecStatus = false;
        }       
        return fecStatus;
}
/*Valida que la cadena no este vacia.
 Recibe como parametro el campo que queramos validar ejemplo; document.nombre_formulario.nombre_del_campo.value .
**/
function isEmpty(campo) {
        var blanco = false;
        micampo = campo.value;
        if      (micampo.length == 0)   {
                blanco = true;
        }

        return blanco;
}

/* La funcion rellenoObligatorio, desarrollada por el grupo funcional
*  ccp, se encarga de comprobar si un campo a rellenar por el usuario 
*  esta vacio apoyandose en la funcion isEmpty() (grupo ccr), tambien puede comprobar si el campo a parte de vacio 
*  pudiera contener datos no numericos siendo estos necesarios, apoyandose 
*  en la funcion isNumber() (generica de BBVA).
*  Recibe tres parametros los cuales describimos a continuacion:
*                               - campo-> el nombre de la variable para utilizarla 
*                                                 en las comprobaciones.
*                               - numerico-> valor boolean, si viene a true, se realizara comprobacion numerica
*                                                    sobre el campo, si viene a false, no se realizara comprobacion numerica.
*                               - nombre-> valor literal del nombre del campo que el usuario leera
*                                                  en el mensaje alert.
*/
function rellenoObligatorio(campo,numerico,nombre){

        if(numerico){
                //alert(campo.length+","+campo.value)
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
/*  Validamos que la fecha de Nacimiento es correcta que la persona es mayor de 18 anios.
 *  Los parametros que enviamos son;
 *                      - el dia de Nacimiento.
 *                      - el mes de Nacimiento 
 *                      - el Anio de Nacimiento.
 *  Se utiliza el grupo funcional de Contratacion Credito Consumo, para validar que el interviniente es
 *  mayor de 18 anios para poder solicitar un credito.
**/
function capacidadJuridica(diaNacimiento,mesNacimiento,anioNacimiento) {        
        var c = true;
        var diaNac = parseInt(diaNacimiento,10);
        var mesNac = parseInt(mesNacimiento,10);
        var anioNac = parseInt(anioNacimiento,10);
        var fecha = new Date();
        var dia = fecha.getDate();
        var mes = fecha.getMonth() + 1 ;
        var anio = fecha.getYear();
        var bisiesto = ((anio%4==0) && (anio%100!=0));
        difer = anio - anioNac;
        if (difer == 18)  {
                if (mes > mesNac){
                        c = true;
                } else if (mes == mesNac){
                        if (mes == 2){
                                if (anio%400 == 0) {
                                        bisiesto = true;
                                }
                                if ((!bisiesto) && (dia==28) && (diaNac == 29)){
                                        c = true;
                                } else if ( (bisiesto) && (diaNac > dia) ){
                                        c= false;
                                }
                        
                        } else if (diaNac > dia){
                                c= false;
                        }       
                }
        } else if (difer < 18){
                c = false;
        }
        return c;
}

// Funcion para abrir una ventana desde otra
function openWin(html,name,w,h){
    myWin= open(html, name, "width="+w+",height="+h+",status=no,titlebar=yes,toolbar=no,left=200,top=100,menubar=no,scrollbars=yes");
}

// Funcion para referenciar una ventana con otra
function eligeOpcion(nombre1,valor1,nombre2,valor2,nombre3,valor3,nombre4,valor4){
   minombre1=eval("window.opener.document.forms[0]."+nombre1);
   minombre1.value=valor1;
   
 if (nombre2 == undefined || valor2== undefined){
   nombre2=nombre1;
   valor2=valor1;
 }
 
 if (nombre3 == undefined){
   nombre3=nombre1;
   valor3=valor1;
 
 }
 
 if (nombre4 == undefined){
   nombre4=nombre1;
   valor4=valor1;
 
 }
 
  minombre3=eval("window.opener.document.forms[0]."+nombre3);
  minombre3.value=valor3;
  minombre2=eval("window.opener.document.forms[0]."+nombre2);
  minombre2.value=valor2;
  minombre4=eval("window.opener.document.forms[0]."+nombre4);
  minombre4.value=valor4;
 
 window.close();
}

// Funcion para abrir la ventana de Condiciones de Contratacion
function abrirVentana(html,name)
{
   ventana=window.open(html, name, "width=400,height=250,status=no,titlebar=yes,toolbar=no,menubar=no,left=280,top=180,scrollbars=yes");         
}
/* 
* FUNCION que se le pasan los parametros:
 - desde_dia, desde_mes y desde_ano (fecha 'desde')
 - hasta_dia, hasta_mes y hasta_ano (fecha 'hasta')
*
* Comprueba que la fecha 'desde' es menor que la fecha 'hasta'.
*/

function comparasFechas (desde_anio, desde_mes, desde_dia, hasta_anio, hasta_mes, hasta_dia)
{

        if (desde_mes.length== 1){
                desde_mes = "0"+desde_mes;                              
        }
        if (hasta_mes.length== 1){
                hasta_mes = "0"+hasta_mes;                              
        }
        if (desde_dia.length== 1){
                desde_dia = "0"+desde_dia;                              
        }
        if (hasta_dia.length== 1){
                hasta_dia = "0"+hasta_dia;                              
        }
        return (desde_anio+desde_mes+desde_dia<hasta_anio+hasta_mes+hasta_dia);
}

function validaHora(horaLimite,minutosLimite)
{

	var horaActual = new Date();	
	var resultado = true;
		
        var hora = horaActual.getHours();       
        	
        var  minutos=horaActual.getMinutes();	
		
	if(hora >horaLimite)
	{		
		resultado=false;
		
	}else if(hora == horaLimite){
		if(minutos > minutosLimite)
		{		 
		   resultado=false; 
		}		
	}		
	
	return resultado;
	
}



