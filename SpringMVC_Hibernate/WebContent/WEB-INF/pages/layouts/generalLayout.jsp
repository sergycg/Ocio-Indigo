<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<%@ page isErrorPage="false" errorPage="../tiles/error.jsp" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>  
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<tiles:importAttribute />
<html>
	<head>
		<meta http-equiv="Content-Style-Type" content="text/css" />
		<title><spring:message code="title.principal"/></title>
		<style type="text/css" media="all">
			<tiles:importAttribute name="cssGlobal"/>
			<c:forEach var="css" items="${cssGlobal}">
				<c:url value="${css}" var="url" />
				@import url("${url}");
			</c:forEach>
			<tiles:importAttribute name="cssLocal"/>
			<c:forEach var="css" items="${cssLocal}">
			    <c:url value="${css}" var="url" />
				@import url("${url}");
			</c:forEach>
		</style>
		<tiles:importAttribute name="jsGlobal"/>
		<c:forEach var="js" items="${jsGlobal}">
			<c:url value="${js}" var="url" />
		    <script type="text/javascript" src="${url}"></script>
		</c:forEach>
 		<tiles:importAttribute name="jsLocal"/>
		<c:forEach var="js" items="${jsLocal}">
		    <c:url value="${js}" var="url" />
		    <script type="text/javascript" src="${url}"></script>
		</c:forEach>
	</head>

	<body id="body">
		<div id="fondo_gris"></div>
		<div id="mensaje" title="click para salir"></div>

 		<tiles:insertAttribute name="header"/>
		<tiles:insertAttribute name="menu"/>
			<tiles:insertAttribute name="contenido"/>
 		<tiles:insertAttribute name="footer"/>
	</body>
</html>
