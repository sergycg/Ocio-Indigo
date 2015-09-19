<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<div class="header">
	<div id="infoUsuario" class="alignRight">
		<span id="nombreUsuario" ></span>				
		<span id="loginUsuario"></span> 
	</div>

	<div id="version" class="alignRight"><spring:message code="title.version" /></div> 		
</div>

<input type="hidden" id="popupOpen" value="N"/>

<!-- Imagen que indica que se está cargando la pantalla -->
<div id="div_carga">
	<img id="cargador" src="./img/indicatorBig.gif"/>
</div>

<!-- Almacena los errores devueltos por los Controllers en hidden, para que sean mostrados por dialogs -->
<c:if test="${not empty message}"><input type="hidden" value="${message}" id="message"/></c:if>
<c:if test="${not empty messageWarning}"><input type="hidden" value="${messageWarning}" id="messageWarning"/></c:if>
<c:if test="${not empty messageError}"><input type="hidden" value="${messageError}" id="messageError"/></c:if>
<c:if test="${not empty messageInfo}"><input type="hidden" value="${messageInfo}" id="messageInfo"/></c:if>
<c:if test="${not empty messageTittle}"><input type="hidden" value="${messageTittle}" id="messageTittle"/></c:if>