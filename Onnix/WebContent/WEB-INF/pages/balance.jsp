
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>  
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

	<div class="contenido">
		<!-- TITULO DE LA PÁGINA -->	
		<h1><spring:message code="title.balance" /></h1>
		
		<!-- LISTADO DE RESULTADOS -->
		
		<div id="resultados"  class="elementos_seccion">
			<div class="elementos_seccion" style="width:98%" id="divListadoBalance" style="display : block;">
				
				<table class="table table-condensed" id="tablaBalance" >
				    <thead>
				        <tr>
							<th title='<spring:message code="title.lista.balance.id.cuenta"/>'><spring:message code="label.lista.balance.id.cuenta"/></th>
							<th title='<spring:message code="title.lista.balance.id.cliente"/>'><spring:message code="label.lista.balance.id.cliente"/></th>
				            <th title='<spring:message code="title.lista.balance.nombre"/>'><spring:message code="label.lista.balance.nombre"/></th>
				            <th title='<spring:message code="title.lista.balance.apellidos"/>'><spring:message code="label.lista.balance.apellidos"/></th>
				            <th title='<spring:message code="title.lista.balance.observaciones"/>'><spring:message code="label.lista.balance.observaciones"/></th>
				            <th title='<spring:message code="title.lista.balance.total.compras"/>'><spring:message code="label.lista.balance.total.compras"/></th>
				            <th title='<spring:message code="title.lista.balance.total.entregado"/>'><spring:message code="label.lista.balance.total.entregado"/></th>
				            <th title='<spring:message code="title.lista.balance.total.pendiente"/>'><spring:message code="label.lista.balance.total.pendiente"/></th>
				        </tr>
				    </thead>
				    <tbody></tbody>
				</table>
				
			</div>
		</div>
		
	</div>		
