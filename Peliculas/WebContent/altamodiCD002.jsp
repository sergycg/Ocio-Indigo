<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="peliculas.Pelicula"%>
<%@page import="peliculas.CD"%>
<%@page import="java.util.Enumeration"%>
<%@page import="java.util.Vector"%>
<html>
<head>
<%	
	CD cd = (CD) request.getSession().getAttribute("detalleCD");
%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<LINK rel="STYLESHEET" type="text/css" href="mult/tablas.css">
<SCRIPT language="JavaScript">
<!--
function cancelar()
{
	document.location.href="CDServlet?accion=cancelarAltaCD";
}
function continuar()
{
	document.formulario.submit();
}

function volver()
{
	document.formulario.action="altamodiCD001.jsp";
	document.formulario.submit();
}
function nuevaPelicula()
{
	document.formulario.action="PeliculasServlet?accion=nueva&id_CD=<%=cd.getId_CD()%>&orig=<%=request.getParameter("orig")%>";
	document.formulario.submit();
}
function anadirPeliculaExistente()
{
	document.formulario.action="CDServlet?accion=listarPeliculasExistentes&id_CD=<%=cd.getId_CD()%>&orig=<%=request.getParameter("orig")%>";
	document.formulario.submit();
}
-->
</script><title></title>
</head>
<body>
<form name="formulario" method="post" action="altamodiCD003.jsp">
<input type="hidden" name="orig" value="<%=request.getParameter("orig")%>">
<table border="0" cellpadding="0" cellspacing="0"  align="center">
     <tr>
       <td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
     <tr>
     	<!--  
     	<td width="50%" colspan="2"><img src="mult/dineroExpress.gif" border="0" alt="GIF de Dinero Express" ></td>
		-->
<%
if ((request.getParameter("orig")!=null) && (request.getParameter("orig").toString().equals("consultaCD")))
{
%>
		<td class="fondotitular"><font class="texttitular">Modificación CD </font></td>
<%
}
else
{
%>		
		<td class="fondotitular"><font class="texttitular">Alta CD </font></td>
<%
}
%>
		
     </tr>
     <tr>
       	<td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
</table>

<br>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     <tr>
          <td class="cabeceratitulo" colspan="5"><p class="titulotabla">Detalle del CD</p></td>
     </tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de CD</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=cd.getId_CD() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Título</p></td>
		<td class="fila2" colspan="4"><p class="dato"><%=cd.getTitulo() %></p></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Categoría</p></td>
		<td class="fila" colspan="4"><p class="dato"><%=cd.getCategoria() %></p></td>
	</tr>
</table>
<br>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     <tr>
          <td class="cabeceratitulo2" colspan="6"><p class="titulotabla" align="center">Peliculas asociadas al CD</p></td>
     </tr>


<%	
int i=0;
Vector v = (Vector) request.getSession().getAttribute("listaPeliculasCD");
if (v.size()==0)
{
%>
	<tr>
		<td class="cabecera2" ><p class="textablacabecera">No hay películas asociadas.</p></td>
	</tr>
<%
}
else
{
%>
	<tr>
		<td class="cabeceratitulo" ><p class="titulotabla">Num</p></td>
		<td class="cabeceratitulo" ><p class="titulotabla">Titulo</p></td>
		<td class="cabeceratitulo" ><p class="titulotabla">Formato</p></td>
		<td class="cabeceratitulo" ><p class="titulotabla">Id CD</p></td>
		<td class="cabeceratitulo" ><p class="titulotabla"></p></td>
		<td class="cabeceratitulo" ><p class="titulotabla"></p></td>
	</tr>
<%	

	Pelicula p = null;
	Enumeration e = v.elements();
	String fila = "fila";
	while (e.hasMoreElements())
	{
		p = (Pelicula)e.nextElement();
		if (i%2==0)
			fila = "fila";
		else
			fila = "fila2";

%>
	<tr>
		<td class="<%=fila%>" ><p class="dato"><%=p.getNumero() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><%=p.getTitulo() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><%=p.getFormato() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><%=p.getId_CD() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><a href="PeliculasServlet?accion=modificarPelicula&num=<%=p.getNumero() %>&orig=<%=request.getParameter("orig")%>"><img src="mult/modificar.gif" border="0" alt="Modificar"></a></p></td>
		<td class="<%=fila%>" ><p class="dato"><a href="PeliculasServlet?accion=eliminarPelicula&num=<%=p.getNumero() %>&orig=<%=request.getParameter("orig")%>"><img src="mult/eliminar.gif" border="0" alt="Eliminar"></a></p></td>
   	</tr>
<%			
		i++;
	}
}
%>



</table>

<center>
<br>
<input type="button" name="Nueva" value="Añadir Película Nueva" class="boton" onclick="nuevaPelicula()">
<input type="button" name="Existente" value="Añadir Película Existente" class="boton" onclick="anadirPeliculaExistente()">
<br>
<br>
<br>
<br>
<input type="button" name="Aceptar" value="Aceptar" class="boton" onclick="continuar()">
<input type="button" name="Volver" value="Volver" class="boton" onclick="volver()">
<input type="button" name="Cancelar" value="Cancelar" class="boton" onclick="cancelar()">
</center>
</form>
</body>
</html>