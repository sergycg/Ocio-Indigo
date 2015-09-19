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
function validar()
{
	if (document.formulario.titulo.value=="")
	{
		alert("Se debe rellenar al menos el título de la película.");
		return false;
	}
	else
		document.formulario.submit();
}
-->
</script>
<title></title>
</head>
<body>
<form name="formulario" method="post" action="altaPelicula002.jsp">
<input type="hidden" name="referencia" value="<%=request.getParameter("referencia") %>">
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
          <td class="cabeceratitulo" colspan="5"><p class="titulotabla">Datos Nueva Película</p></td>
     </tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de referencia</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=request.getParameter("referencia") %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Título</p></td>
		<td class="fila" colspan="4"><p class="dato"><input type="text" name="titulo" value="<%=request.getParameter("titulo") %>" maxlength="50" size="50"></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Fecha</p></td>
		<td class="fila" colspan="4"><p class="dato"><input type="text" name="fecha" value="<%=request.getParameter("fecha") %>" maxlength="10" size="10"></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de CDs ó DVDs</p></td>
		<td class="fila" colspan="4"><p class="dato"><input type="text" name="num_CDs_DVDs" value="<%=request.getParameter("num_CDs_DVDs") %>" maxlength="2" size="2"></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Origen</p></td>
		<td class="fila" colspan="4"><p class="dato"><input type="text" name="origen" value="<%=request.getParameter("origen") %>" maxlength="50" size="25"></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Ubicación</p></td>
		<td class="fila" colspan="4"><p class="dato"><input type="text" name="ubicacion" value="<%=request.getParameter("ubicacion") %>" maxlength="50" size="20"></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Prestado a</p></td>
		<td class="fila" colspan="4"><p class="dato"><input type="text" name="prestado_a" value="<%=request.getParameter("prestado_a") %>" maxlength="50" size="20"></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Formato</p></td>
		<td class="fila" colspan="4">
		<select name="formato" >
			<option value=""></option> 
		<% 
			//ServletContext context = getServletContext();
			//Vector lista_formatos = (Vector) context.getAttribute("listaFormatos");
			Vector lista_formatos = (Vector) request.getAttribute("listaFormatos");
			Formato formato = null;
			Enumeration e = lista_formatos.elements();
			for(int i=0;e.hasMoreElements();i++)
			{
				formato = (Formato)e.nextElement();
		%>
			<option value="<%=formato.getFormato()%>"><%=formato.getFormato()%></option> 
		<%
			}
		%>
		</select>
		</td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Id CD</p></td>
		<td class="fila" colspan="4"><p class="dato"><input type="text" name="id_CD" value="<%=request.getParameter("id_CD") %>" maxlength="4" size="4">&nbsp;&nbsp;&nbsp;Siguiente referencia de CD <%=request.getAttribute("ultRefCD")%></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Id DVD</p></td>
		<td class="fila" colspan="4"><p class="dato"><input type="text" name="id_DVD" value="<%=request.getParameter("id_DVD") %>" maxlength="4" size="4">&nbsp;&nbsp;&nbsp;Siguiente referencia de DVD <%=request.getAttribute("ultRefDVD")%></p></td>
	</tr>
</table>
<br>
<center>
<input type="button" name="Aceptar" value="Aceptar" class="boton" onclick="validar()">
</center>
</form>
</body>
</html>