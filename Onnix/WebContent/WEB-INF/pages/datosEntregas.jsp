
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>  
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<h3 div="datosEntregas">
	<span id="barraEntregas" ><spring:message code="submenu.cuenta.entregas"/></span>&nbsp;&nbsp;&nbsp;
	<div class="floatRight">
		<form:button value="${textNuevaEntrega}" name="botonNuevaEntrega" class="btn btn-warning btn-mini">
			<i class="icon-white icon-plus-sign position-icon-button-new"></i>
			<spring:message code='button.nuevo'/>
		</form:button>					
	</div>
</h3>
<div>
		<div class="elementos_seccion" style="width:20%; " id="divListadoEntregas" style="display : block;">
			
			<table class="table table-condensed" id="tablaEntregas" style="background-color: rgba(250, 191, 152, 0.28);">
			    <thead>
			        <tr>
<%-- 			            <th><spring:message code="label.entrega.id"/></th> --%>
			            <th><spring:message code="label.entrega.fecha"/></th>
			            <th><spring:message code="label.entrega.cantidad"/></th>
			            <th align="center" 	width="1%" ></th>
			        </tr>
			    </thead>
			    <tbody></tbody>
			</table>
			
		</div>
</div>
<!-- Formulario para la creacion de una nueva entrega -->
<div id="form_crearEntrega" style="display: none">
	<form:hidden path="entregaForm.codigoEntrega" id="codigoEntrega"/>
	
	
	<div class="campo_110">
		<label for="entregaForm.fecha">
			<spring:message code="label.entrega.fecha" />
			<spring:message code="required" />	
		</label>
		<form:input cssClass="input-mini required" id="fechaEntrega" path="entregaForm.fecha" readonly="readonly" placeholder="DD/MM/YY" />
		<img onclick="clearDatepicker('fechaEntrega')" src="./img/NOK.png" />
	</div>
	<div class="campo_75">
		<label for="entregaForm.cantidad">
			<spring:message code="label.entrega.cantidad" />
			<spring:message code="required" />
		</label>
		<form:input path="entregaForm.cantidad" id="cantidad" cssClass="input-mini required"/>
	</div>
</div>
