<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<div class="menu">
	<ul id="jMenu">
		<!-- jMenu: Do not forget the "fNiv" class for the first level links !! -->
<%-- 		<sec:authorize ifAllGranted="AUTH_DERECHOS"> --%>
			<li>
				<a class="fNiv" href="initMenuCuentas.htm">
					<spring:message code="menu.listado.cuentas" />
				</a>
			</li>
<%-- 		</sec:authorize> --%>
<%-- 		<sec:authorize ifAnyGranted="AUTH_ADM_CONTRATOS,AUTH_ADM_CONTRATOS_CONS"> --%>
			<li>
				<a class="fNiv"><spring:message code="menu.informes" /></a>
				<ul>
					<li class="arrow"></li>
<%-- 					<sec:authorize ifAnyGranted="AUTH_ADM_TERRITORIOS,AUTH_ADM_TERRITORIOS_CONS"> --%>
					<li>
						<a href="initMenuPendientesPago.htm">
							<spring:message code="menu.informes.pendientesPago" />
						</a>
					</li>
					<li>
						<a href="initMenuBalance.htm">
							<spring:message code="menu.informes.balance" />
						</a>
					</li>
<%-- 					<li>
						<a href="initMenuVentaArticulos.htm">
							<spring:message code="menu.informes.ventaArticulos" />
						</a>
					</li> --%>
				</ul>				
			</li>
<%-- 		</sec:authorize> --%>
<%-- 		<sec:authorize ifAllGranted="AUTH_ADMINISTRACION"> --%>
<%-- 			<li>
				<a class="fNiv"><spring:message code="menu.administracion" /></a>
				<ul>
					<li class="arrow"></li>
 					<sec:authorize ifAnyGranted="AUTH_ADM_TERRITORIOS,AUTH_ADM_TERRITORIOS_CONS"> --%>
<%--  						<li>
							<a href="initFindTerritorios.htm">
								<spring:message code="menu.administracion.territorios" />
							</a>
						</li>
 --%>
 <%-- 					</sec:authorize> --%>
<%-- 					<sec:authorize ifAnyGranted="AUTH_ADM_SISTEMAS,AUTH_ADM_SISTEMAS_CONS"> --%>
<%-- 						<li>
							<a href="initFindSistemaTransmision.htm">
								<spring:message code="menu.administracion.sistemas.transmision" />
							</a>
						</li>
 --%>
 <%-- 					</sec:authorize> --%>
					
<%-- 					<sec:authorize ifAnyGranted="AUTH_ADM_MODOS,AUTH_ADM_MODOS_CONS"> --%>
<%-- 						<li>
							<a href="initFindModoDifusion.htm">
								<spring:message code="menu.administracion.modos.difusion" />
							</a>
						</li>
 --%>
 <%-- 					</sec:authorize> --%>
<%-- 					<sec:authorize ifAnyGranted="AUTH_ADM_SISTEMAS,AUTH_ADM_SISTEMAS_CONS"> --%>
<%-- 						<li>
							<a href="initFindAgrupacion.htm">
								<spring:message code="menu.administracion.agrupacion" />
							</a>
						</li>
 --%>
 <%-- 					</sec:authorize> --%>
<%-- 					<sec:authorize ifAnyGranted="AUTH_ADM_PLANTILLAS,AUTH_ADM_PLANTILLAS_CONS"> --%>
<%-- 						<li>
							<a href="initFindPlantillas.htm">
								<spring:message code="menu.administracion.plantillas" />
							</a>
						</li>
 --%>
 <%-- 					</sec:authorize> --%>
<%-- 					<sec:authorize ifAnyGranted="AUTH_ADM_PROVEEDORES,AUTH_ADM_PROVEEDORES_CONS"> --%>
<%-- 						<li>
							<a href="initBusquedaProveedores.htm">
								<spring:message code="menu.administracion.proveedores" />
							</a>
						</li>
 --%>
 <%-- 					</sec:authorize> --%>
<%-- 					<li>
						<a href="initFindAuditoria.htm">
							<spring:message code="menu.administracion.auditoria" />
						</a>
					</li>
 
 				</ul>
			</li>
--%>			
<%-- 		</sec:authorize> --%>
<%-- 		<li>
			<a href="<c:url value="/j_spring_security_logout"/>">
				<spring:message code="menu.salir" />
			</a>
		</li>
 --%>	
 	</ul>
</div>