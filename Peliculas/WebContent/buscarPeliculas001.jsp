<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
		alert("Se debe rellenar el título o parte de título de la película.");
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
<form name="formulario" method="post" action="PeliculasServlet?accion=buscarPeliculas" onsubmit="validar()" >
<table border="0" cellpadding="0" cellspacing="0"  align="center">
     <tr>
       <td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
     <tr>
     	<!--  
     	<td width="50%" colspan="2"><img src="mult/dineroExpress.gif" border="0" alt="GIF de Dinero Express" ></td>
		-->
		<td width="100%" class="fondotitular"><font class="texttitular">Búsqueda</font></td>
		
     </tr>
     <tr>
       	<td colspan="5" width="501"><img src="mult/linea1.gif" border="0"></td>
     </tr>
</table>


<br>

<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
     <tr>
          <td class="cabeceratitulo" colspan="5"><p class="titulotabla">Buscar película</p></td>
     </tr>
	<tr>
		<td class="cabecera2" colspan="2"><p class="textablacabecera">Título o parte del título</p></td>
		<td class="fila" colspan="3"><p class="dato"><input type="text" name="tituloBusqueda" maxlength="50" size="30"></p></td>
	</tr>
</table>
<center>
<input type="submit" name="Aceptar" value="Aceptar" class="boton" >
</center>
</form>
</body>
</html>