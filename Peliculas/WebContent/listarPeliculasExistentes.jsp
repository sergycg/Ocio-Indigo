<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="java.util.Enumeration"%>
<%@page import="peliculas.Pelicula"%>
<%@page import="javax.servlet.ServletContext"%>
<%@page import="java.util.Vector"%>
<html>
<head>
     <LINK rel="STYLESHEET" type="text/css" href="mult/tablas.css">
     <SCRIPT LANGUAGE='JavaScript1.1' SRC='mult/impresion.js'></SCRIPT>
<script language="JavaScript">
	

</script>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
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
		<td width="100%" class="fondotitular"><font class="texttitular">Listado de películas </font></td>
     </tr>
     <tr>
       	<td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
</table>


<br>

<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
<%

//ServletContext context = getServletContext();
//Vector lista_peliculas = (Vector) context.getAttribute("listaPeliculas");
Vector lista_peliculas = (Vector) request.getAttribute("listaPeliculas");

if (lista_peliculas.size()==0)
{
%>
     <tr>
          <td class="cabeceratitulo" colspan="5"><p class="titulotabla">Resultado de la búsqueda</p></td>
     </tr>
	<tr>
		<td class="cabecera2" ><p class="textablacabecera">No hay resultado para la búsqueda.</p></td>
	</tr>
<%
}
else
{
%>
	<tr>
		<td class="cabeceratitulo" ><a href="PeliculasServlet?accion=listarPeliculasTodas&id_CD=<%=request.getParameter("id_CD")%>"><p class="titulotabla">Num</p></a></td>
		<td class="cabeceratitulo" ><a href="PeliculasServlet?accion=listarPeliculasTodas&orden=titulo&id_CD=<%=request.getParameter("id_CD")%>"><p class="titulotabla">Titulo</p></a></td>
		<td class="cabeceratitulo" ><a href="PeliculasServlet?accion=listarPeliculasTodas&orden=formato&id_CD=<%=request.getParameter("id_CD")%>"><p class="titulotabla">Formato</p></a></td>
		<td class="cabeceratitulo" ><a href="PeliculasServlet?accion=listarPeliculasTodas&orden=idcd&id_CD=<%=request.getParameter("id_CD")%>"><p class="titulotabla">Id CD</p></a></td>
		<td class="cabeceratitulo" ><a href="PeliculasServlet?accion=listarPeliculasTodas&orden=iddvd&id_CD=<%=request.getParameter("id_CD")%>"><p class="titulotabla">Id DVD</p></a></td>
		<td class="cabeceratitulo" ><p class="titulotabla"></p></td>
	</tr>
<%	
	Pelicula peli = null;
	Enumeration e = lista_peliculas.elements();
	int i=0;
	String fila = "fila";
	while (e.hasMoreElements())
	{
		peli = (Pelicula)e.nextElement();
		if (i%2==0)
			fila = "fila";
		else
			fila = "fila2";
%>
	<tr>
		<td class="<%=fila%>" ><p class="dato"><%=peli.getNumero() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><%=peli.getTitulo() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><%=peli.getFormato() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><%=peli.getId_CD() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><%=peli.getId_DVD() %></p></td>
		<td class="<%=fila%>" ><p class="dato"><a href="CDServlet?accion=anadirPeliculaExistente&num=<%=peli.getNumero() %>&orig=<%=request.getParameter("orig") %>&id_CD=<%=request.getParameter("id_CD")%>&id_DVD=<%=request.getParameter("id_DVD")%>">Añadir</a></p></td>
   	</tr>
<%
		i++;
	}

}

%>
	<tr>
		<td class="cabecera" colspan="6"><img src="mult/1x1.gif" width=1 height=1 border="0"></td>
    </tr>
</table>
</body>
</html>