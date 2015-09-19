
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>  
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<form:form id="findCuentasClientes" action="findCuentasClientes.htm" method="post" modelAttribute="findCuentasClientesForm">
	<div class="contenido">
		<form:hidden path="action"/>
		<form:hidden path="idCuenta_hidden"/>
		<form:hidden path="idCliente_hidden"/>
		<!-- TITULO DE LA PÁGINA -->	
		<h1><spring:message code="title.busqueda.clientes" /></h1>

		<h2><spring:message code="label.criterios.criterioSeleccion" /></h2>
		<div class="seccion" >
			<div class="campo_225">
				<label><spring:message code="label.cliente.nombre" /></label>
				<form:input path="nombre" cssStyle="text-transform: uppercase;" maxlength="100"  cssClass="input-large"/>							
			</div>
			<div class="campo_545">
				<label><spring:message code="label.cliente.apellidos" /></label>
				<form:input path="apellidos" cssStyle="text-transform: uppercase;" maxlength="100"  cssClass="input-xxlarge"/>							
			</div>
			
			<div class="campo_105">
				<label><spring:message code="label.cliente.telefono" /></label>
				<form:input path="telefono" cssStyle="text-transform: uppercase;" maxlength="9"  cssClass="input-small"/>
			</div>
			<div class="campo_105">
				<label><spring:message code="label.cliente.codigo.postal" /></label>
				<form:input path="codigoPostal" cssStyle="text-transform: uppercase;" maxlength="5"  cssClass="input-mini"/>							
			</div>
			<div class="campo_105">
				<label><spring:message code="label.cuenta.activa" /></label>
				<form:checkbox path="indActiva" id="indActiva" value="1"/>							
			</div>
			<div class="fin_float"></div>
		</div>
		
		<!-- BOTONERA -->
			<div id="botoneraFindCuentasClientes" class="barra_botones">
				<form:button id="btnBuscar" class="btn btn-primary">
					<spring:message code='button.buscar'/>
				</form:button>				
				<form:button id="btnLimpiarCriterios" class="btn">
					<spring:message code='button.criterios.limpiar'/>
				</form:button>
				<a href="newCliente.htm" class="btn floatRight">
					<spring:message code='button.nuevo.cliente'/>
				</a>
			</div>
		<!--  FIN BOTONERA -->
			
		<!-- LISTADO DE RESULTADOS -->
		
		<div id="resultados"  class="elementos_seccion">
			<tiles:insertDefinition name="listaCuentas" />
		</div>
		
	</div>		
</form:form>
