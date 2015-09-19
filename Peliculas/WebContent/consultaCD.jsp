<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="peliculas.Pelicula"%>
<%@page import="peliculas.CD"%>
<%@page import="java.util.Enumeration"%>
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
<%             
//RequestDispatcher view = request.getRequestDispatcher("CDServlet?accion=listarCDsTodos");            
//view.forward(request, response);        
%>
}

-->
</script><title></title>
</head>
<body>
<form name="formulario" method="post" action="CDServlet?accion=listarCDsTodos">
<table border="0" cellpadding="0" cellspacing="0"  align="center">
     <tr>
       <td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
     <tr>
     	<!--  
     	<td width="50%" colspan="2"><img src="mult/dineroExpress.gif" border="0" alt="GIF de Dinero Express" ></td>
		-->
		<td class="fondotitular"><font class="texttitular">Consulta CD </font></td>
		
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
<%	
	CD cd = (CD) request.getAttribute("detalleCD");
	//CD cd = (CD) request.getSession().getAttribute("detalleCD");
%>
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
          <td class="cabeceratitulo2" colspan="5"><p class="titulotabla" align="center">Peliculas asociadas al CD</p></td>
     </tr>


<%	
	Vector v = (Vector) request.getAttribute("detallePeliculas");
	//Vector v = (Vector) request.getSession().getAttribute("detallePeliculas");

	if (v.size()==0)	
	{
%>
	<tr>
		<td class="cabecera2" ><p class="textablacabecera">No existen películas o no se encuentran en base de datos.</p></td>
	</tr>
<%
	}
	else
	{
		Pelicula p = null;
		Enumeration e = v.elements();
		int i=0;
		String fila = "fila";
		while (e.hasMoreElements())
		{
			p = (Pelicula)e.nextElement();
			if (i%2==0)
				fila = "fila";
			else
				fila = "fila2";

%>
	<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     	<tr>
        	<td class="cabeceratitulo" colspan="5"><p class="titulotabla">Pelicula <%=i+1 %></p></td>
     	</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de referencia</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getNumero() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Título</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getTitulo() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Fecha</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getFecha() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Número de CDs ó DVDs</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getNum_CDs_DVDs() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Origen</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getOrigen() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Ubicación</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getUbicacion() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Prestado a</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getPrestado_a() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Formato</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getFormato() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Id CD</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getId_CD() %></p></td>
		</tr>
		<tr>
			<td class="cabecera2" colspan="1"><p class="textablacabecera">Id DVD</p></td>
			<td class="<%=fila %>" colspan="4"><p class="dato"><%=p.getId_DVD() %></p></td>
		</tr>
	</table>
<%
			i++;
		}
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