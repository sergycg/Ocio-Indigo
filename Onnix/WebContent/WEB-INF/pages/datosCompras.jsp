
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>  
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<h3 div="datosCompras">
	<span id="barraCompras" ><spring:message code="submenu.cuenta.compras"/></span>&nbsp;&nbsp;&nbsp;
<!-- 	<div class="floatRight"> -->
<%-- 		<form:button value="${textNuevaCompra}" name="botonNuevaCompra" class="btn btn-warning btn-mini"> --%>
<!-- 			<i class="icon-white icon-plus-sign position-icon-button-new"></i> -->
<%-- 			<spring:message code='button.nuevo'/> --%>
<%-- 		</form:button>					 --%>
<!-- 	</div> -->
</h3>
<div>
	<div id="datosComprasEntregas" class="datosComprasEntregas" >
		<div class="elementos_seccion" style="width:60%;float:left;" id="divListadoCompras" style="display : block;">
		<div>
			<form:button value="${textNuevaCompra}" name="botonNuevaCompra" class="btn btn-warning btn-mini">
				<i class="icon-white icon-plus-sign position-icon-button-new"></i>
				<spring:message code='button.nuevo'/>
			</form:button>					
		</div>			
			<table class="table table-condensed" id="tablaCompras" style="background-color: rgba(250, 191, 152, 0.28);">
			    <thead>
			        <tr>
<%-- 						<th><spring:message code="label.compra.id"/></th> --%>
						<th><spring:message code="label.compra.objeto"/></th>
			            <th><spring:message code="label.compra.fecha"/></th>
			            <th><spring:message code="label.compra.precio"/></th>
			            <th align="center" 	width="1%" ></th>
			        </tr>
			    </thead>
			    <tbody></tbody>
			</table>
			<div style="margin-top: -20px;">Total:</div>
		</div>

		<div class="elementos_seccion" style="width:30%;float:right; " id="divListadoEntregas" style="display : block;">
			<div>
				<form:button value="${textNuevaEntrega}" name="botonNuevaEntrega" class="btn btn-warning btn-mini">
					<i class="icon-white icon-plus-sign position-icon-button-new"></i>
					<spring:message code='button.nuevo'/>
				</form:button>					
			</div>
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
			<div style="margin-top: -20px;">Total:</div>
			
		</div>
	
	</div>
</div>
	
<!-- Formulario para la creacion de una nueva compra -->
<div id="form_crearCompra" style="display: none">
	<form:hidden path="compraForm.codigoCompra" id="codigoCompra"/>
	<div class="campo_225">
		<label for="compraForm.descObjeto">
			<spring:message code="label.compra.objeto" />
			<spring:message code="required" />
		</label>
		<form:input path="compraForm.descObjeto" id="descObjeto" cssClass="required"/>
	</div>
	<div class="fin_float"></div>
	
	<div class="campo_110">
		<label for="compraForm.fecha">
			<spring:message code="label.compra.fecha" />
			<spring:message code="required" />	
		</label>
		<form:input cssClass="input-mini required" id="fechaCompra" path="compraForm.fecha" readonly="readonly" placeholder="DD/MM/YY" />
		<img onclick="clearDatepicker('fechaCompra')" src="./img/NOK.png" />
	</div>
	
	<div class="campo_75">
		<label for="compraForm.precio">
			<spring:message code="label.compra.precio" />
			<spring:message code="required" />
		</label>
		<form:input path="compraForm.precio" id="precio" cssClass="input-mini required" />
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
