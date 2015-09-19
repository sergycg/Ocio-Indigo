<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<div class="elementos_seccion" style="width:98%" id="divListadoCuentas" style="display : block;">
	
	<table class="table table-condensed" id="tablaCuentas" >
	    <thead>
	        <tr>
	        	<th></th>
				<th title='<spring:message code="title.lista.cuentas.id.cuenta"/>'><spring:message code="label.lista.cuentas.id.cuenta"/></th>
	            <th title='<spring:message code="title.lista.cuentas.nombre"/>'><spring:message code="label.lista.cuentas.nombre"/></th>
	            <th title='<spring:message code="title.lista.cuentas.apellidos"/>'><spring:message code="label.lista.cuentas.apellidos"/></th>
	            <th title='<spring:message code="title.lista.cuentas.observaciones"/>'><spring:message code="label.lista.cuentas.observaciones"/></th>
	            <th title='<spring:message code="title.lista.cuentas.estado"/>'><spring:message code="label.lista.cuentas.estado"/></th>
	        </tr>
	    </thead>
	    <tbody></tbody>
	</table>
	
</div>


