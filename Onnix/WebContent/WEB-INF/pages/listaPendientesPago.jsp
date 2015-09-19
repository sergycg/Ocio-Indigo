<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<div class="elementos_seccion" style="width:98%" id="divListadoPendientesPago" style="display : block;">
	
	<table class="table table-condensed" id="tablaPendientesPago" >
	    <thead>
	        <tr>
				<th title='<spring:message code="title.lista.pendientes.id.cuenta"/>'><spring:message code="label.lista.pendientes.id.cuenta"/></th>
				<th title='<spring:message code="title.lista.pendientes.id.cliente"/>'><spring:message code="label.lista.pendientes.id.cliente"/></th>
	            <th title='<spring:message code="title.lista.pendientes.nombre"/>'><spring:message code="label.lista.pendientes.nombre"/></th>
	            <th title='<spring:message code="title.lista.pendientes.apellidos"/>'><spring:message code="label.lista.pendientes.apellidos"/></th>
	            <th title='<spring:message code="title.lista.pendientes.observaciones"/>'><spring:message code="label.lista.pendientes.observaciones"/></th>
	            <th title='<spring:message code="title.lista.balance.total.pendiente"/>'><spring:message code="label.lista.balance.total.pendiente"/></th>
	        </tr>
	    </thead>
	    <tbody></tbody>
	</table>
	
</div>


