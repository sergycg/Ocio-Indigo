
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>  
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<form:form id="cuentaClienteForm" action="cuentaClienteForm.htm" method="post" modelAttribute="cuentaClienteForm">

	<form:hidden path="action"/>
	<form:hidden path="idCliente"/>
	<form:hidden path="idCuenta"/>

	<!-- PERMITE ACTIVAR LAS PESTAÑAS Y POSICIONAR, TRAS SUBMIT -->
	<form:hidden path="openTabs"/>
	<form:hidden path="activeTab"/>
	<!-- PERMITE POSICIONAR LA PESTAÑA QUE SE HA PINCHADO -->
	<input type="hidden" id="clickTab"/>

	<div class="contenido">
	
		<!-- TITULO DE LA PÁGINA -->	
		<h1><spring:message code="title.detalle.cuenta" /></h1>

		<div class="floatRight texto_pequeno transparent">
			<b><spring:message code="label.codigo.cuenta" />&nbsp;</b>	
			<span id="codigoCuenta"></span>
		</div>
		<div class="floatRight texto_pequeno transparent">
			<b><spring:message code="label.codigo.cliente" />&nbsp;</b>	
			<span id="codigoCliente"></span>
		</div>
		<div class="datosCuenta" id="datosCuenta">
			<div id="accordion">
				<tiles:insertDefinition name="datosGeneralesCuenta"/>
				<c:if test="${not empty cuentaClienteForm.idCliente && not empty cuentaClienteForm.idCuenta}">
					<tiles:insertDefinition name="datosCompras"/>				
<%-- 					<tiles:insertDefinition name="datosEntregas"/> --%>
				</c:if>				
			</div>
		</div>
		
	</div>		
</form:form>
