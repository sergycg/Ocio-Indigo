<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="peliculas.Pelicula"%>
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
	var origen = "<%=request.getParameter("orig")%>";
	if (origen=="buscar")
		document.formulario.action="PeliculasServlet?accion=buscarPeliculas";
	
	document.formulario.submit();
}

-->
</script><title></title>
</head>
<body>
<form name="formulario" method="post" action="PeliculasServlet?accion=listarPeliculasTodas">
<input type="hidden" name="orig" value="<%=request.getParameter("orig")%>">
<input type="hidden" name="tituloBusqueda" value="<%=request.getParameter("tituloBusqueda")%>">
<table border="0" cellpadding="0" cellspacing="0"  align="center">
     <tr>
       <td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
     <tr>
     	<!--  
     	<td width="50%" colspan="2"><img src="mult/dineroExpress.gif" border="0" alt="GIF de Dinero Express" ></td>
		-->
		<td class="fondotitular"><font class="texttitular">Consulta Película </font></td>
		
     </tr>
     <tr>
       	<td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
</table>

<br>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     <tr>
          <td class="cabeceratitulo" colspan="5"><p class="titulotabla">Detalle de la película</p></td>
     </tr>
<%	
	//ServletContext context = getServletContext();
	Pelicula p = (Pelicula) request.getAttribute("detallePelicula");

	if (p==null)	
	{
%>
		<tr>
			<td class="cabecera2" ><p class="textablacabecera">La película no existe o no se encuentra en base de datos.</p></td>
		</tr>
<%
	}
	else
	{
%>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de referencia</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getNumero() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Título</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getTitulo() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Fecha</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getFecha() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de CDs ó DVDs</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getNum_CDs_DVDs() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Origen</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getOrigen() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Ubicación</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getUbicacion() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Prestado a</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getPrestado_a() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Formato</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getFormato() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Id CD</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getId_CD() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Id DVD</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=p.getId_DVD() %></p></td>
	</tr>
<%
	}
%>
</table>
<br>
<center>
<input type="button" name="Aceptar" value="Aceptar" class="boton" onclick="continuar()">
</center>
</form>
</body>
</html>