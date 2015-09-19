<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="peliculas.Pelicula"%>
<%@page import="peliculas.CD"%>
<%@page import="peliculas.Categoria"%>
<%@page import="java.util.Enumeration"%>
<%@page import="java.util.Vector"%>
<html>
<head>
<%	
	CD cd = (CD) request.getSession().getAttribute("detalleCD");
	if (cd==null)
	{
		int i = Integer.valueOf(request.getSession().getAttribute("ultimaRefCD").toString()).intValue();
		cd = new CD();
		cd.setId_CD(i);
		cd.setTitulo("");
		cd.setCategoria("");
	}
	
%>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<LINK rel="STYLESHEET" type="text/css" href="mult/tablas.css">
<SCRIPT language="JavaScript">
<!--
function continuar()
{
	var origen = "<%=request.getParameter("orig")%>";
	if (origen=="consultaCD")
	{
		document.formulario.action="CDServlet?accion=continuarModificarCD";
	}
	document.formulario.submit();
}

-->
</script><title></title>
</head>
<body>
<form name="formulario" method="post" action="CDServlet?accion=continuarNuevoCD">
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
		<td class="fila" colspan="4"><input type="text" name="idCD" value="<%=cd.getId_CD() %>"></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Título</p></td>
		<td class="fila2" colspan="4"><input type="text" name="titulo" value="<%=cd.getTitulo() %>"></td>
	</tr>
	<tr>
		<td class="cabecera2" colspan="1"><p class="textablacabecera">Categoría</p></td>
		<td class="fila" colspan="4">
		<select name="categoria" >
			<option value=""></option> 
		<% 
			Vector lista_categorias = (Vector) request.getSession().getAttribute("listaCategorias");
			Categoria categoria = null;
			Enumeration e = lista_categorias.elements();
			for(int i=0;e.hasMoreElements();i++)
			{
				categoria = (Categoria)e.nextElement();
				if ((cd.getCategoria()!=null) && (cd.getCategoria().equals(categoria.getCategoria())))
				{
				%>
					<option value="<%=categoria.getCategoria()%>" selected><%=categoria.getCategoria()%></option> 
				<%
				}
				else
				{
				%>
					<option value="<%=categoria.getCategoria()%>"><%=categoria.getCategoria()%></option> 
				<%
				}
			}
		%>
		</select>
	</tr>
</table>
<br>
<br>
<center>
<input type="button" name="Aceptar" value="Continuar" class="boton" onclick="continuar()">
</center>
</form>
</body>
</html>