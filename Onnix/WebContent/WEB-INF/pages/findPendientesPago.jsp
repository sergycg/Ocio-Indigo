
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>  
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<form:form id="pendientesPago" action="pendientesPago.htm" method="post" modelAttribute="pendientesPagoForm">
	<div class="contenido">
		<form:hidden path="action"/>
		<!-- TITULO DE LA PÁGINA -->	
		<h1><spring:message code="title.pendientes.pago" /></h1>

		<h2><spring:message code="label.criterios.criterioSeleccion" /></h2>
		<div class="seccion" >
			<div class="campo_225">
				<label><spring:message code="label.pendientes.pago.mes" /></label>
				<form:input path="mes" cssStyle="text-transform: uppercase;" maxlength="100"  cssClass="input-mini"/>							
			</div>
			<div class="campo_545">
				<label><spring:message code="label.pendientes.pago.anio" /></label>
				<form:input path="anio" cssStyle="text-transform: uppercase;" maxlength="100"  cssClass="input-mini"/>							
			</div>
			<div class="fin_float"></div>			
		</div>
		
		<!-- BOTONERA -->
			<div id="botoneraFindPendientesPago" class="barra_botones">
				<form:button id="btnBuscar" class="btn btn-primary">
					<spring:message code='button.buscar'/>
				</form:button>				
				<form:button id="btnLimpiarCriterios" class="btn">
					<spring:message code='button.criterios.limpiar'/>
				</form:button>
			</div>
		<!--  FIN BOTONERA -->
			
		<!-- LISTADO DE RESULTADOS -->
		
		<div id="resultados"  class="elementos_seccion">
			<tiles:insertDefinition name="listaPendientesPago" />
		</div>
		
	</div>		
</form:form>
