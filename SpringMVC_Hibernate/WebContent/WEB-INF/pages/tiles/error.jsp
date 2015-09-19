<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<div class="contenido">
	<c:set var="url">
		<c:out value="${pageContext.request.scheme}" />://<c:out value="${pageContext.request.serverName}" />:<c:out value="${pageContext.request.serverPort}" /><c:out value="${pageContext.request.contextPath}"/>
	</c:set>
	<h1>Error en la aplicación</h1>
	<p>Se ha producido un error en la aplicación. Vuelva a logarse de nuevo.</p>
	<div class="barra_botones">
		<a href="${url}">
			<input type="button" id="btnVolver" class="btn-primary" value="<spring:message code='errors.exceptionMensaje'/>" />
		</a>
	</div>
</div>
