<%@ include file ="includecbtf.jsp" %>
<html>
<head>
     <title>Solicitud Tarjeta de Crédito del BBVA</title>
     <LINK rel="STYLESHEET" type="text/css" href="mult/tablas.css">
     <SCRIPT LANGUAGE='JavaScript1.1' SRC='mult/impresion.js'></SCRIPT>
<script language="JavaScript">
function mostrarAlerta(form)
{
	var codigo_producto = "<%=datos.get("codProducto")%>";
	if ((codigo_producto=="2197") || (codigo_producto=="5787") || (codigo_producto=="8198") || (codigo_producto=="6709"))
	{
		alert('Se le puede conceder una <%= datos.get("producto") %> con un límite de <%=datos.get("limiteCredito")%> €');
	}
}
	

</script>
</head>

<body class="pag-contenido" link="#660099" onload="mostrarAlerta()">


<center>

<table border="0" cellpadding="0" cellspacing="0"  align="center">
     <tr>
       <td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
     <tr>
     	<td width="50%" colspan="2"><img src="mult/dineroExpress.gif" border="0" alt="GIF de Dinero Express" ></td>
	<td width="50%" class="fondotitular"><font class="texttitular">Solicitud <%= datos.get("producto") %></font></td>
     </tr>
     <tr>
       <td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
    </table>


<br>
<form method="post" action="<%=urls.get("finalizar")%>" name="formulario">

<table align=center>
<%
     	java.text.SimpleDateFormat fma = new java.text.SimpleDateFormat("ddMMyyyy");
	String fechaActual = fma.format(new java.util.Date());
	String fechaHoy = fechaActual.substring(0,2) + "-" +  fechaActual.substring(2,4) + "-" +  fechaActual.substring(4,8);
%>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     <tr>
          <td class="cabeceratitulo" colspan="4"><p class="titulotabla">Datos Contrataci&oacute;n</p>
          </td>
     </tr>
     <tr>
       <td class="cabecera2"><p class="textablacabecera">Producto a Contratar</p></td>
       <td class="fila"><p class="dato"><%=datos.get("producto")%></p></td>
     </tr>
      <tr>
       <td class="cabecera2"><p class="textablacabecera">Cuenta de Cargo</p></td>
       <td class="fila"><p class="dato"><%=datos.get("cuentaExpress")%></p></td>
     </tr>
     <tr>
       <td class="cabecera2"><p class="textablacabecera">Limite de crédito</p></td>
       <td class="fila"><p class="dato"><%=datos.get("limiteCredito")%> €</p></td>
     </tr>
     <tr>
       <td class="cabecera2"><p class="textablacabecera">Fecha de Solicitud</p></td>
       <td class="fila"><p class="dato"><%=fechaHoy%></p></td>
     </tr>
     <tr>
       <td class="cabecera2"><p class="textablacabecera">Código Agente</p></td>
       <td class="fila"><p class="dato"><%=datos.get("s_cod_logon")%></p></td>
     </tr>
     <tr>
          <td class="cabecera" colspan="2"><img src="mult/1x1.gif" width=1 height=1 border="0"></td>
     </tr>
     </table>

    <BR>

	<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
	<tr>
          	<td class="cabeceratitulo" colspan="4"><p class="titulotabla">Datos de Identificaci&oacute;n del Titular</p></td>
	</tr>
     
	<tr>
               	<td class="cabecera2" width="140"><p class="textablacabecera">Tipo de participaci&oacute;n</p></td>
               	<td class="cabecera2" width="140"><p class="textablacabecera">Identificador</p></td>
               	<td class="cabecera2" width="220" colspan="2"><p class="textablacabecera">N&uacute;m. Identificativo</p></td>
	</tr>
	<tr>
               	<td class="fila"><p class="dato">Titular</p></td>
               	<td class="fila"><p class="dato"><%=datos.get("tipoDocumento")%></p></td>
               	<td class="fila" colspan="2"><p class="dato"><%=datos.get("nif")%></p></td>
	</tr>
	<tr>
               	<td class="cabecera2"><p class="textablacabecera">Nombre</p></td>
               	<td class="cabecera2"><p class="textablacabecera">Primer Apellido</p></td>
               	<td class="cabecera2" colspan="2"><p class="textablacabecera">Segundo Apellido</p></td>
	</tr>
        <tr>
               	<td class="fila"><p class="dato"><%=datos.get("nombre")%></p></td>
               	<td class="fila"><p class="dato"><%=datos.get("apellido1")%></p></td>
               	<td class="fila" colspan="2"><p class="dato"><%=datos.get("apellido2")%></p></td>
        </tr>
        <tr>
               	<td class="cabecera2"><p class="textablacabecera">Fecha de Nacimiento</p></td>
               	<td class="cabecera2"><p class="textablacabecera">Sexo</p></td>
               	<td class="cabecera2" colspan="2"><p class="textablacabecera">Actividad</p></td>
        </tr>
        <tr>
          
               	<td class="fila"><p class="dato"><%=datos.get("fechaNacimiento")%></p></td>
               	<td class="fila"><p class="dato"><%=datos.get("sexo")%></p></td>
		<td class="fila" colspan="2"><p class="dato"><%=datos.get("actividad")%></p></td>
        </tr>
        <tr>
               <td class="cabecera2"><p class="textablacabecera">Lugar Nacimiento</p></td>
               <td class="cabecera2"><p class="textablacabecera">Provincia Nacimiento</p></td>
               <td class="cabecera2" colspan="2"><p class="textablacabecera">Pa&iacute;s Nacimiento</p></td>
        </tr>
        <tr>
               <td class="fila"><p class="dato"><%=datos.get("lugarNacimiento")%></p></td>
               <td class="fila"><p class="dato"><%=datos.get("provNacimiento")%></p></td>
               <td class="fila" colspan="2"><p class="dato"><%=datos.get("paisNacimiento")%></p></td>
          </tr>
          <tr>
               <td class="cabecera2"><p class="textablacabecera">Tratamiento</p></td>
               <td class="cabecera2"><p class="textablacabecera">Estado Civil</p></td>
               <td class="cabecera2" colspan="2"><p class="textablacabecera">Reg. Matrimonial</p></td>
          </tr>
          <tr>
             	<td class="fila"><p class="dato"><%=datos.get("tratamiento")%></p></td>          		
		<td class="fila"><p class="dato"><%=datos.get("estCivil")%></p></td>
		<td class="fila" colspan="2"><p class="dato"><%=datos.get("regimenMatr")%></p></td>
				
          </tr>
          <tr>
        <td class="cabecera" colspan="4"><img src="mult/1x1.gif" width=1 height=1 border="0"></td>
     </tr>
          <tr>
          <td class="cabeceratitulo" colspan="4">
          <p class="titulotabla">Datos del Domicilio Fiscal</p>
          </td>
     </tr>
     <tr>
          <td class="cabecera2"><p class="textablacabecera">Pa&iacute;s</p></td>
          <td class="cabecera2" colspan="3"><p class="textablacabecera">Domicilio</p></td>
     </tr>
     <tr>
          <td class="fila"><p class="dato"><%=datos.get("paisFiscal")%></p></td>
          <td class="fila" colspan="3"><p class="dato"><%=datos.get("domiFiscal")%></p></td>
     </tr>
     <tr>
          <td class="cabecera2" colspan="2"><p class="textablacabecera">Poblaci&oacute;n</p></td>
          <td class="cabecera2" colspan="2"><p class="textablacabecera">Provincia</p></td>
     </tr>
     <tr>
          <td class="fila" colspan="2"><p class="dato"><%=datos.get("plazaFiscal")%></p></td>
          <td class="fila" colspan="2"><p class="dato"><%=datos.get("provFiscal")%></p></td>
     </tr>
     <tr>
       <td class="cabecera2"><p class="textablacabecera">C&oacute;digo Postal</p></td>
          <td class="cabecera2"><p class="textablacabecera">Tel&eacute;fono</p></td>
          <td class="cabecera2" colspan="2"><p class="textablacabecera">E-mail</p></td>
     </tr>
     <tr>
          <td class="fila"><p class="dato"><%=datos.get("codPostFiscal")%></p></td>
          <td class="fila"><p class="dato"><%=datos.get("tfno")%></p></td>
          <td class="fila" colspan="2"><p class="dato"><%=datos.get("email")%></p></td>
     </tr>
     <tr>
        <td class="cabecera" colspan="4"><img src="mult/1x1.gif" width=1 height=1 border="0"></td>
     </tr>
     
	<tr>
		<td class="cabeceratitulo" colspan="2"><p class="titulotabla">Datos profesionales y económicos</p></td>
		<td class="cabeceratitulo" colspan="2"><div align="right"><p class="titulotabla">Moneda: Euros</p></div></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="2"><p class="textablacabecera">Tipo Empleo</p></td>
		<td class="cabecera2"><p class="textablacabecera">N&ordm; A&ntilde;os antig&uuml;edad</p></td>
		<td class="cabecera2"><p class="textablacabecera">Fecha Alta en Seg. Soc.</p></td>
	</tr>
	<tr>
		<%
		String tipoTrab = datos.get("tipoTrabajo").toString();
		if (tipoTrab.equals("1"))
			tipoTrab = "Fijo";
		else if (tipoTrab.equals("2"))
			tipoTrab = "Temporal";
		else if (tipoTrab.equals("4"))
			tipoTrab = "Autónomo";
		else
			tipoTrab = "Otros";
		%>
		<td class="fila" colspan="2"><p class="dato"><%=tipoTrab%></td>
		<td class="fila"><p class="dato"><%=datos.get("antiguedadEmpresa")%></td>
		<td class="fila"><p class="dato"><%=datos.get("fechaAltaSS")%></td>
	</tr>

	<%
	if (!datos.get("desact").equals(""))
	{
	%>
	<tr>
		<td class="cabecera2" colspan="4"><p class="textablacabecera">Profesión</p></td>               
	</tr>
	<tr>                                          
		<td class="fila" colspan="4"><p class="dato""><%=datos.get("desact")%></p></td>
	</tr>
	<%
	}
	%>


	<%
	if (!datos.get("desactCNAE").equals(""))
	{
	%>
	<tr>
		<td class="cabecera2" colspan="4"><p class="textablacabecera">Actividad Económica de la Empresa</p></td>               
	</tr>
	<tr>                                          
		<td class="fila" colspan="4"><p class="dato""><%=datos.get("desactCNAE")%></p></td>
	</tr>
	<%
	}
	%>
<%
if ((datos.get("tipoTarjResidencia")!=null) && (datos.get("tipoTarjResidencia")!=""))
{
	String tipoTJResi = datos.get("tipoTarjResidencia").toString().trim();

	if (tipoTJResi.equals("1"))
	{
		tipoTJResi = "T.R.Temp. sin renovar";
	}
	else if (tipoTJResi.equals("2"))
	{
		tipoTJResi = "T.R.Temp. 1ª renovación";
	}
	else if (tipoTJResi.equals("3"))
	{
		tipoTJResi = "T.R.Temp. 2ª renovación";
	}
	else if (tipoTJResi.equals("4"))
	{
		tipoTJResi = "T.R.Permanente";
	}

%>
	
	<tr>
		<td class="cabecera2"><p class="textablacabecera">Ingresos Fijos (nóminas líquidas)</p></td>
		<td class="cabecera2"><p class="textablacabecera">Ingresos Mensuales Variables</p></td>
		<td class="cabecera2"><p class="textablacabecera">Tipo de Documento</p></td>
		<td class="cabecera2"><p class="textablacabecera">Antig&uuml;edad Residencia (meses)</p></td>
	</tr>
	<tr>
		<td class="fila"><p class="dato"><%=datos.get("nominasLiquidas")%></td>
		<td class="fila"><p class="dato"><%=datos.get("ingrMensVariables")%></td>
		<td class="fila"><p class="dato"><%=tipoTJResi%></td>
		<td class="fila"><p class="dato"><%=datos.get("antiguedadResidencia")%></td>
	</tr>
<%
}
else
{
%>
	<tr>
		<td class="cabecera2" colspan="2"><p class="textablacabecera">Ingresos Fijos (nóminas líquidas)</p></td>
		<td class="cabecera2"><p class="textablacabecera">Ingresos Mensuales Variables</p></td>
		<td class="cabecera2"><p class="textablacabecera">Antig&uuml;edad Residencia (meses)</p></td>
	</tr>
	<tr>
		<td class="fila" colspan="2"><p class="dato"><%=datos.get("nominasLiquidas")%></td>
		<td class="fila"><p class="dato"><%=datos.get("ingrMensVariables")%></td>
		<td class="fila"><p class="dato"><%=datos.get("antiguedadResidencia")%></td>
	</tr>
<%
}
%>
	<tr>
		<td class="cabecera2" width="25%"><p class="textablacabecera">Vivienda Habitual</p></td>
		<td class="cabecera2" width="15%"><p class="textablacabecera">Nº de hijos a su cargo</p></td>
		<td class="cabecera2"><p class="textablacabecera">Nº de adultos a su cargo</p></td>
		<td class="cabecera2"><p class="textablacabecera">Estructura Hogar en Espa&ntilde;a</p></td>
	</tr>

	<tr>
		<%
		String VivHabitual = datos.get("viviendaHabitual").toString();
		String EstructHogar = datos.get("estructuraHogar").toString();
		
		if (VivHabitual.equals("1"))
			VivHabitual = "Propia";
		else if (VivHabitual.equals("3"))
			VivHabitual = "Alquiler";
		else if (VivHabitual.equals("4"))
			VivHabitual = "Padres";
		else
			VivHabitual = "Otros";


		if (EstructHogar.equals("1"))
			EstructHogar = "Familia";
		else if (EstructHogar.equals("3"))
			EstructHogar = "Familia no propia";
		else
			EstructHogar = "Otros";
			
		%>
		
		<td class="fila"><p class="dato"><%=VivHabitual%></td>
		<td class="fila"><p class="dato"><%=datos.get("numHijosCargo")%></td>
		<td class="fila"><p class="dato"><%=datos.get("numAdultosCargo")%></td>
		<td class="fila"><p class="dato"><%=EstructHogar%></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="2"><p class="textablacabecera">&iquest;Has enviado dinero a tu pa&iacute;s los 6 &uacute;ltimos meses a trav&eacute;s de otras entidades?</p></td>
		<td class="cabecera2"><p class="textablacabecera">N&ordm; remesas a trav&eacute;s de otras entidades en 6 &uacute;ltimos meses</p></td>
		<td class="cabecera2"><p class="textablacabecera">Importe remesas a trav&eacute;s de otras entidades en 6 &uacute;ltimos meses</p></td>
	</tr>
	<tr>
		<td class="fila" colspan="2"><p class="dato"><%=datos.get("enviadoDinero")%></td>
		<td class="fila"><p class="dato"><%=datos.get("numeroRemesas")%></td>
		<td class="fila"><p class="dato"><p class="dato"><%=datos.get("importeRemesas")%></p></td>
	</tr>
     
     <tr>
          <td class="cabecera" colspan="5"><img src="mult/1x1.gif" width=1 height=1 border="0"></td>
     </tr>

</table>
<% 
	java.util.Vector v = (java.util.Vector)(datos.get("listaIntervinientes"));

	java.util.Hashtable elem;
	java.util.Enumeration e = v.elements();
        int i=1;
        
        String idFiscal = "";
	String nombre = "";
        String apellido1 = "";
        String apellido2 = "";
        String tipInt = "";
        String fechaNacimiento = "";
        String tipoDocumento="";
        String parentesco="";
                
        while (e.hasMoreElements()) 
        {
		elem = (java.util.Hashtable)(e.nextElement());
		
		idFiscal = (String)elem.get("codIdentificacion");
                nombre = (String)elem.get("nombre");
                apellido1 = (String)elem.get("apellido1");
                apellido2 = (String)elem.get("apellido2");   
                fechaNacimiento =  (String)elem.get("fechaNacimiento");    
                tipoDocumento =  (String)elem.get("tipoDocumento");    
                parentesco =  (String)elem.get("parentesco");    
%>
<br>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     <tr>
          <td class="cabeceratitulo" colspan="4"><p class="titulotabla">Datos de Identificaci&oacute;n del BENEFICIARIO</p>
          </td>
     </tr>
          <tr>
          <td class="cabecera2"><p class="textablacabecera">Tipo: </p></td>
          <td class="cabecera2" colspan=2><p class="textablacabecera">N&uacute;mero Documento</p></td>
          </tr>
          <tr>
          <td class="fila">
               <p class="dato"><%=tipoDocumento%></p></td>
          </td>

           <td class="fila" colspan=2>
               <p class="dato"><%=idFiscal%></p></td>
          </td>
          </tr>
          <tr>
               <td class="cabecera2"><p class="textablacabecera">Nombre</p></td>
               <td class="cabecera2"><p class="textablacabecera">Primer Apellido</p></td>
               <td class="cabecera2"><p class="textablacabecera">Segundo Apellido</p></td>
          </tr>
          <tr>
               <td class="fila"><p class="dato"><%=nombre%></p></td>
               <td class="fila"><p class="dato"><%=apellido1%></p></td>
               <td class="fila"><p class="dato"><%=apellido2%></p></td>
               
          </tr>
          <tr>
               <td class="cabecera2"><p class="textablacabecera">Fecha de Nacimiento</p></td>
               <td class="cabecera2" colspan=2><p class="textablacabecera">Parentesco</p></td>

          </tr>
          <tr>
               <td class="fila"><p class="dato"><%=fechaNacimiento%></p></td>
               <td class="fila" colspan=2><p class="dato"><%=parentesco%></p></td>
          </tr>

     <tr>
          <td class="cabecera" colspan="4"><img src="mult/1x1.gif" width=1 height=1 border="0"></td>
     </tr>

</table>

<%
i++;
}
%>
<br>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     
     <tr>
          <td class="cabeceratitulo" colspan="4">
          <p class="titulotabla">Datos del Domicilio Postal asociado al producto</p>
          </td>
     </tr>
     <tr>
          <td class="cabecera2"><p class="textablacabecera">Pa&iacute;s</p></td>
          <td class="cabecera2" colspan="3"><p class="textablacabecera">Domicilio</p></td>
     </tr>
     <tr>
          <td class="fila"><p class="dato">ESPAÑA</p></td>
          <td class="fila" colspan="3"><p class="dato"><%=(datos.get("direccion") + " " + datos.get("numero"))%></p></td>
     </tr>
     <tr>
          <td class="cabecera2" colspan="2"><p class="textablacabecera">Poblaci&oacute;n</p></td>
          <td class="cabecera2"><p class="textablacabecera">Provincia</p></td>
          <td class="cabecera2"><p class="textablacabecera">C&oacute;digo Postal</p></td>
     </tr>
     <tr>
          <td class="fila" colspan="2"><p class="dato"><%=datos.get("plazaPostal")%></p></td>
          <td class="fila" ><p class="dato"><%=datos.get("provinciaPostal")%></p></td>
           <td class="fila"><p class="dato"><%=datos.get("codigoPostal")%></p></td>
     </tr>
     <tr>
     </tr>

     <tr>
          <td class="cabecera" colspan="5"><img src="mult/1x1.gif" width=1 height=1 border="0"></td>
     </tr>

</table>
<br>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
<tr>
  <td class="cabeceratitulo"><p class="titulotabla">TRATAMIENTO AUTOMATIZADO DE DATOS PERSONALES</p>
          </td>
</tr>
<tr>
<td class="fila2">
<p class="nota">
Los datos personales del interviniente/s facilitados por éste/os al Banco, ahora o en el futuro e
incluyendo también los resultantes de procesos informáticos derivados de los registrados,
serán registrados en sus ficheros automatizados con la finalidad de su utilización por el propio
Banco o, en su caso, por otros terceros, de conformidad con lo prevenido en esta cláusula.
<br><br>
El Banco utilizará dichos datos para la gestión de la relación contractual Banco-Cliente y
prestación de los servicios relacionados con la misma, incluyendo la posibilidad de remisión,
por parte del Banco o de otros terceros por cuenta del Banco, de cualesquiera informaciones o
prospecciones, personalizadas o no, sobre productos o servicios bancarios o de terceros, y
para cualesquiera otras finalidades no incompatibles con las específicas anteriores. Los datos
podrán ser conservados en los ficheros del Banco incluso una vez finalizada toda relación
realización de las prospecciones anteriormente previstas y, en todo caso, durante los plazos
legalmente establecidos, a disposición de autoridades administrativas o judiciales.
<br><br>
El interviniente/s autoriza al Banco a comunicar o interconectar dichos datos a terceros
(empresas financieras, de seguros, de comercio electrónico, de servicios, de distribución,
gestoras de fondos y planes de pensiones, sociedades de valores, renting) que formen parte
del Grupo de empresas del Banco, para su utilización en cualquiera de las finalidades
indicadas en el párrafo anterior, (Entidades bancarias y de seguros BBVA en España : Unoe
Bank, Capitán Haya, 1 - Madrid ;Finanzia Banco de Crédito, c/ María de Molina, 54 - Madrid; Banco de Crédito Local de España, Plaza Santa Bárbara 1 - Madrid; BBVA Seguros, Alcalá, 17 - Madrid; BBVA Broker, Gran Vía, 1, Bilbao y Entidades del Grupo de cualesquiera de ellas), considerándose el interviniente/s informado de esta cesión a dichos cesionarios en virtud de la presente cláusula, así como a otros terceros (grandes empresas financieras, comerciales, de distribución, de servicios), con idénticas finalidades a las indicadas. Este consentimiento para comunicación de datos a terceros tiene carácter revocable en todo momento.
<br><br>
El responsable del tratamiento es Banco Bilbao Vizcaya Argentaria, S.A. con domicilio en Pl. S.
Nicolás, 4 - Bilbao, si bien el interviniente/s podrá ejercitar gratuitamente, no solo en dicho
domicilio sino en cualquiera de las oficinas del Banco, los derechos de acceso, rectificación,
cancelación de datos y oposición (en este último caso, exclusivamente en los supuestos
prevenidos por la ley y salvo para la gestión de la relación contractual Banco - Cliente).


</p>
</td>
</tr>
<tr>
          <td class="cabecera"><img src="mult/1x1.gif" width=1 height=1 border="0"></td>
     </tr>

</table>
<br>

<table border="0" width="500" >
     <tr>
          <td class="cabeceratitulo"><p class="titulotabla">Nombre y Firma: </p></td>
     </tr>
          
     <tr>
          <td class="fila">
		<table border="1" bgcolor="white" height="100" cellpadding="0" width="500" cellspacing="0" align="center">
		     <tr>
		     	<td rowspan="1">&nbsp;</td>
		     </tr>		     		     	     		     		     		     		     
		</table>
          </td>
     </tr>
     <tr>
          <td class="cabecera"<img src="mult/1x1.gif" width=1 height=1 border="0"></td>
     </tr>
</table>
<center>
<DIV ID="form_imprimir" style="visibility:visible;width:200;">
<table border="0">
<tr>

     <td valign="top" align="center" ><input type="submit" class="boton" name="aceptar" value="Finalizar" align="center"></td>
     <td valign="top"><target="web"><input type="button" class="boton" value="Atr&aacute;s" onClick="javaScript:window.location.href='<%=urls.get("volverDO")%>';"></td>
     <!--<td valign="top"><input type="button" class="boton" name='imprimir' value='Imprimir'  onclick='javascript:Imprimir_Pantalla("form_imprimir")'></td>-->
     <td valign="top"><input type="button" class="boton" value="Cancelar" onClick="javascript:window.location.href='/tlex/OperacionCBTFServlet?proceso=TLEXPrContTarjCredito&operacion=TLEXOpContTarjCredito&accion=cancelar'"></td>
</tr>
</table>
</div>
</center>
</form>

</body>
</html>

