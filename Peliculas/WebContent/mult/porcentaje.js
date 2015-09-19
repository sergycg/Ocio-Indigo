/* 
*   ARCHIVO JAVASCRIPT CON FUNCIONES VARIAS
*	*** ATENCION ***
*		Necesita que se incluya el util.js
*   CONTENIDO:
*
*	function CalculaPorcentaje(impt, impp); calcula el porcentaje entre el importe total y el parcial.
*	
*/

/* 
* FUNCION recibe un importe total y uno parcial.
* Valida si son correctos, si que el importe 
* parcial no sea mayor que el total y devuelve
* el porcentaje truncado a dos decimales
*/

function CalculaPorcentaje(impt, impp)
{

	var sept=Separador(impt);
	var sepp=Separador(impp);

	if (impt=="")
	{
		alert('Debe introducir el importe total');
		return false;
	}
	else
	{
		aux=isImporte(impt, sept);
		if (!aux=="")
		{
			alert('El campo importe total,'+aux);
			return false;
		}
	}

	if (impp=="")
	{
		alert('Debe introducir el importe parcial');
		return false;
	}
	else
	{
		aux=isImporte(impp, sepp);
		//aux=isImporte(impRedondeado, sepp);
		if (!aux=="")
		{
			alert('El campo importe parcial,'+aux);
			return false;
		}
		else
		{
			if (sept!=".")
				impt=CambiaSeparador(impt,".");
			if (sepp!=".")
				impp=CambiaSeparador(impp,".");			
			if (parseFloat(impp) > parseFloat(impt))
			{
				alert('El importe parcial no puede ser superior al importe total');
				return false;
			}
		}
	}
	if (sept!=".")
		impt=CambiaSeparador(impt,".");
	if (sepp!=".")
		impp=CambiaSeparador(impp,".");
   
	/*
	a=parseFloat(impp)*100;
	b=parseFloat(impt);
	c=a/b;
	alert(parseFloat(impp)+"#"+a+"/"+b+"="+c);
	*/
	

	return TruncaDecimales(((parseFloat(impp)*100)/parseFloat(impt))+"",2);
}
