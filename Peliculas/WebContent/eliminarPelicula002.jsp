<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<LINK rel="STYLESHEET" type="text/css" href="mult/tablas.css">
<title></title>
</head>
<body>
<table border="0" cellpadding="0" cellspacing="0"  align="center">
     <tr>
       <td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
     <tr>
     	<!--  
     	<td width="50%" colspan="2"><img src="mult/dineroExpress.gif" border="0" alt="GIF de Dinero Express" ></td>
		-->
		<td width="100%" class="fondotitular"><font class="texttitular">Resultado</font></td>
		
     </tr>
     <tr>
       	<td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
</table>


<br>

<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     <tr>
          <td class="cabeceratitulo" colspan="5"><p class="titulotabla">Eliminar pel�cula</p></td>
     </tr>
	<tr>
		<td class="cabecera2" ><p class="textablacabecera">La pel�cula se ha eliminado corectamente.</p></td>
	</tr>
</table>
<%
if ((request.getParameter("orig")!=null) && (request.getParameter("orig").toString().equals("altaCD")))
{
%>
	<center>
	<input type="button" name="Continuar" value="Continuar" class="boton" onclick="location.href='CDServlet?accion=volverAltaCD&orig=altaCD'">
	</center>
<%
} 
else if (request.getParameter("orig").toString().equals("consultaCD"))
{
%>
	<center>
	<input type="button" name="Continuar" value="Continuar" class="boton" onclick="location.href='CDServlet?accion=volverModificarCD&orig=consultaCD'">
	</center>
<%
}
%>

</body>
</html>