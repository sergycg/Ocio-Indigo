
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>  
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>

<h3 div="datosGeneralesCuenta" style="margin-top: 20px;">
	<span id="barraDatosGenerales" ><spring:message code="submenu.cuenta.datos.generales"/></span>&nbsp;&nbsp;&nbsp;
	<div class="floatRight green" style="display:none;" id="infoOperacion">
		<spring:message code="label.operacion.correcta"/>
	</div>
	
</h3>
<div>
	<div id="datosGeneralesCuenta" class="datosGenerales" >
		<div class="fin_float"></div>
		<div class="campo_150 margenTop10menos">
			<label><spring:message code="label.cliente.nombre" /></label>
			<form:input path="nombre" cssStyle="text-transform: uppercase;" maxlength="100"  cssClass="input-medium"/>							
		</div>
		<div class="campo_210 margenTop10menos">
			<label><spring:message code="label.cliente.apellidos" /></label>
			<form:input path="apellidos" cssStyle="text-transform: uppercase;" cssClass="input-large" maxlength="100"/>							
		</div>
		
		<div class="campo_60 margenTop10menos">
			<label><spring:message code="label.cliente.telefono" /></label>
			<form:input path="telefono" cssStyle="text-transform: uppercase;" maxlength="9"  cssClass="input-mini"/>
		</div>
		<div class="campo_60 margenTop10menos">
			<label><spring:message code="label.cliente.movil" /></label>
			<form:input path="movil" cssStyle="text-transform: uppercase;" maxlength="9"  cssClass="input-mini"/>
		</div>
		<div class="campo_110 margenTop10menos">
			<label><spring:message code="label.cliente.otroTelefono" /></label>
			<form:input path="otroTelefono" cssStyle="text-transform: uppercase;" maxlength="9"  cssClass="input-mini"/>
		</div>
		<div class="campo_275 margenTop10menos">
			<label><spring:message code="label.cliente.direccion" /></label>
			<form:input path="direccion" cssStyle="text-transform: uppercase;" maxlength="100"  cssClass="input-xlarge"/>							
		</div>
		<div class="campo_105 margenTop10menos">
			<label><spring:message code="label.cliente.codigo.postal" /></label>
			<form:input path="codigoPostal" cssStyle="text-transform: uppercase;" maxlength="5"  cssClass="input-mini"/>							
		</div>
		<div class="fin_float"></div>
		<div class="campo_gigante margenDerecho0 margenTop10menos">
			<label for="observaciones"><spring:message code="label.cuenta.observaciones"/></label>
			<form:textarea path="observaciones" rows="1" maxlength="2000" cssStyle="width: 500px;"/>
		</div>
		<div class="campo_110 margenTop10menos">
			<label><spring:message code="label.cuenta.activa" /></label>
			<form:checkbox path="activo" id="activo" name="activo" value="1" /><div id="divInfoCuentaCancelada" style="display:none"><label class="infoCuentaCancelada"><spring:message code="label.info.cuenta.cancelada" /></label></div>
		</div>
		<div class="cajaResumen">
			<div class="campo_100 top0">
				<label><b><spring:message code="label.cuenta.comprado" /></b></label>
				<span><b>100</b></span>
			</div>
			<div class="campo_100 top0">
				<label><b><spring:message code="label.cuenta.entregado" /></b></label>
				<span><b>100</b></span>
			</div>
			<div class="campo_40 margenDerecho0 top0">
				<label><b><spring:message code="label.cuenta.resto" /></b></label>
				<span><b>100</b></span>
			</div>
		</div>
		<div class="fin_float"></div>
		
	</div>
		<!-- BOTONERA -->
			<div id="botoneraCuentasClientes" class="barra_botones">
				<form:button value="save" name="save" class="btn btn-primary">
					<spring:message code='button.save'/>
				</form:button>		
				<input type="submit" class="cancel btn" id="cancel" name="cancel" value="Volver"/>
<%-- 				<form:button value="borrar" name="borrar" id="btnBorrarCuenta" class="btn btn-danger"> --%>
<%-- 					<spring:message code='button.borrar'/> --%>
<%-- 				</form:button>		 --%>
			</div>
		<!--  FIN BOTONERA -->
</div>