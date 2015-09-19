<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="peliculas.Formato"%>
<%@page import="java.util.Enumeration"%>
<%@page import="javax.servlet.ServletContext"%>
<%@page import="java.util.Vector"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<LINK rel="STYLESHEET" type="text/css" href="mult/tablas.css">
<SCRIPT language="JavaScript">
<!--
function continuar()
{
	document.formulario.submit();
}
function volver()
{
	document.formulario.action = "PeliculasServlet?accion=volverAltaPelicula";
	document.formulario.submit();
}
-->
</script><title></title>
</head>
<body>
<form name="formulario" method="post" action="PeliculasServlet?accion=altaPelicula">
<input type="hidden" name="referencia" value="<%=request.getParameter("referencia") %>">
<input type="hidden" name="titulo" value="<%=request.getParameter("titulo") %>">
<input type="hidden" name="fecha" value="<%=request.getParameter("fecha") %>">
<input type="hidden" name="num_CDs_DVDs" value="<%=request.getParameter("num_CDs_DVDs") %>">
<input type="hidden" name="origen" value="<%=request.getParameter("origen") %>">
<input type="hidden" name="ubicacion" value="<%=request.getParameter("ubicacion") %>">
<input type="hidden" name="prestado_a" value="<%=request.getParameter("prestado_a") %>">
<input type="hidden" name="formato" value="<%=request.getParameter("formato") %>">
<input type="hidden" name="id_CD" value="<%=request.getParameter("id_CD") %>">
<input type="hidden" name="id_DVD" value="<%=request.getParameter("id_DVD") %>">
<input type="hidden" name="orig" value="<%=request.getParameter("orig")%>">

<table border="0" cellpadding="0" cellspacing="0"  align="center">
     <tr>
       <td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
     <tr>
     	<!--  
     	<td width="50%" colspan="2"><img src="mult/dineroExpress.gif" border="0" alt="GIF de Dinero Express" ></td>
		-->
		<td class="fondotitular"><font class="texttitular">Nueva Película </font></td>
		
     </tr>
     <tr>
       	<td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
</table>

<br>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     <tr>
          <td class="cabeceratitulo" colspan="5"><p class="titulotabla">Datos Resumen Nueva Película</p></td>
     </tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de referencia</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("referencia") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Título</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("titulo") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Fecha</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("fecha") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de CDs ó DVDs</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("num_CDs_DVDs") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Origen</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("origen") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Ubicación</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("ubicacion") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Prestado a</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("prestado_a") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Formato</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("formato") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Id CD</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("id_CD") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Id DVD</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("id_DVD") %></p></td>
	</tr>
</table>
<br>
<center>
<input type="button" name="Volver" value="Volver" class="boton" onclick="volver()">
<input type="button" name="Aceptar" value="Dar de Alta" class="boton" onclick="continuar()">
</center>
</form>
</body>
</html>