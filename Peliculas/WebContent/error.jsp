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
<br>
<br>
<br>
<br>
<br>
<table border="0" cellpadding="2" cellspacing="1" width="500" align="center">
	<tr>
		<td class="cabeceratitulo" ><p class="titulotabla">Mensaje de Error</p></td>
	</tr>
	<tr>
		<td class="fila" ><p class="dato"><%=request.getParameter("mensaje")%></p></td>
	</tr>
</table>

</body>
</html> 