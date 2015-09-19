package com.onnix.business.constants;



public class ConstantKeys {
	
	// Autenticación
	
	// Tipo de autenticación
	// 1.- BD
	// 2.- LDAP
	public static final String PK_TIPO_AUTENTICACION = "TIPO.CLIENTE.SECURITY";
	public static final int TIPO_AUTENTICACION_BD = 1;
	public static final int TIPO_AUTENTICACION_LDAP = 2;
	// Fin Autenticación
	
	public static final String TOKEN_KEY = "_synchronizerToken";
	
	// ACTIVO O INACTIVO
	public static final Integer TIPO_ACTIVO	= new Integer(1);
	public static final Integer TIPO_INACTIVO = new Integer(0);
	
	// VALORES
	public static int VALUE_0 = 0;
	public static int VALUE_1 = 1;
	
	// SI - NO
	public static final String SI = "Sí";
	public static final String NO = "No";
	public static final String SI_CORTO = "S";
	public static final String NO_CORTO = "N";
	
	
	public static String ACCION_SAVE = "S";
    public static String ACCION_DELETE = "D";
    
    public static String ACCION_DESC_SAVE = "Modificado";
    public static String ACCION_DESC_DELETE = "Borrado";
	
	// TIPO DE ACCIONES
	public static int INSERTAR = 0;
	public static int MODIFICAR = 1;
	public static int ELIMINAR = 2;
	
	
	// MENSAJES DE ERROR
//	public static final String MESSAGE_ERROR_APLICATION = "messages.error";
//	public static final String MESSAGE_ERROR_CONSULTA_PROGRAMAS = "messages.error.consulta.programas";
//	public static final String MESSAGE_ERROR_CONSULTA_PROGRAMAS_NODATA = "messages.error.consulta.programas.nodata";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_TITULO = "messages.error.eliminar.derecho.titulo";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_CPI = "messages.error.eliminar.derecho.cpi";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_HIJOS_HEREDADOS = "messages.error.eliminar.derecho.hijos.heredados";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_CARACTERISTICAS = "messages.error.eliminar.derecho.caracteristicas";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_PASES = "messages.error.eliminar.derecho.pases";
//	public static final String MESSAGE_ERROR_RESTAURAR_DERECHO_PASES = "messages.error.eliminar.derecho.restaura.pases";
//	public static final String MESSAGE_ERROR_PASES_MODIFICAR = "messages.error.pase.modificar";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_PASES_NO_LIBRE = "messages.error.eliminar.derecho.pases.no.libre";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_PASES_SUBDERECHO_NO_LIBRE = "messages.error.eliminar.derecho.pases.subderechos.no.libre";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_VENTANAS_NO_VIG = "messages.error.eliminar.derecho.ventanaNoVig";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_LIMITACIONES = "messages.error.eliminar.derecho.limitaciones";
//	public static final String MESSAGE_ERROR_ELIMINAR_DERECHO_IMPORTE_CAPITULOS = "messages.error.eliminar.derecho.importe.capitulos";
//	public static final String MESSAGE_ERROR_FECHAS_VIGENCIA_DERECHO_FUERA_PROGRAMA = "messages.error.fechas.vigencia.derecho.fuera.programa";
//	public static final String MESSAGE_ERROR_DERECHO_VIGENCIA_VENTANA = "messages.error.derecho.ventanas.vigencia";
//	public static final String MESSAGE_ERROR_PROGRAMA_VIGENCIA_VENTANA = "messages.error.programa.ventanas.vigencia";
//	public static final String MESSAGE_ERROR_FECHAS_VIGENCIA_DERECHO_VNV_PROGRAMA = "messages.error.fechas.vigencia.derecho.ventanasNoVigencia.programa";
//	public static final String MESSAGE_ERROR_DERECHO_VENTANA_PROGRAMA_DUPLICADA = "messages.error.derecho.ventana.programa.duplicada";
//	public static final String MESSAGE_ERROR_DERECHO_VENTANA_DUPLICADA = "messages.error.derecho.ventanas.duplicada";
//	public static final String MESSAGE_ERROR_DERECHO_VENTANA_MODIFICAR = "messages.error.derecho.ventanas.modificar";
//	public static final String MESSAGE_ERROR_DERECHO_VENTANA_NUEVA = "messages.error.derecho.ventanas.nueva";
//	public static final String MESSAGE_ERROR_DERECHO_PASES_FUERA_RANGO = "messages.error.derecho.pases.fuera.rango";
//	public static final String MESSAGE_ERROR_DERECHOS_EXISTENTES_FECHAS_VIGENCIA = "messages.error.derechos.fechas.vigencia";
//	public static final String MESSAGE_ERROR_DERECHO_ELIMINAR_VENTANA = "messages.error.derecho.eliminar.ventana";
//	public static final String MESSAGE_ERROR_DERECHO_ELIMINAR_TERRITORIO = "messages.error.derecho.eliminar.territorio";
//	public static final String MESSAGE_ERROR_DERECHO_ELIMINAR_SISTEMA= "messages.error.derecho.eliminar.sistema";
//	public static final String MESSAGE_ERROR_DERECHO_ELIMINAR_MODO= "messages.error.derecho.eliminar.modo";
//	public static final String MESSAGE_ERROR_DERECHO_CREAR_PASE= "messages.error.derecho.crear.pase";
//	public static final String MESSAGE_ERROR_DERECHO_ELIMINAR_PASE= "messages.error.derecho.eliminar.pase";
//	public static final String MESSAGE_ERROR_DERECHO_ELIMINAR_PASE_NO_LIBRE = "messages.error.derecho.eliminar.pase.no.libre";
//	public static final String MESSAGE_ERROR_LIMITACION_ELIMINAR_PASE_NO_LIBRE = "messages.error.limitacion.eliminar.pase.no.libre";
//	public static final String MESSAGE_ERROR_DERECHO_ELIMINAR_PASE_SUBDERECHO_NO_LIBRE = "messages.error.derecho.eliminar.pase.subderecho.no.libre";
//	public static final String MESSAGE_ERROR_CONSULTA_DERECHOS = "messages.error.consulta.derechos";
//	public static final String MESSAGE_ERROR_CONSULTA_FICHA_TECNICA = "messages.error.consulta.ficha.tecnica";
//	public static final String MESSAGE_ERROR_CONSULTA_CABECERA_COMERCIAL = "messages.error.consulta.cabecera.comercial";
//	public static final String MESSAGE_ERROR_PERIODO_CARENCIA = "messages.error.derechos.periodo.carencia";
//	public static final String MESSAGE_ERROR_DERECHO_VOD_CON_CATCHUP_SIMULTCAST = "messages.error.vod.prohibido.catchupSimultcast";
//	public static final String MESSAGE_ERROR_CODIGO_TIPO_PRODUCCION_NULO ="messages.error.codigo.tipoProducicon.nulo";
//	public static final String MESSAGE_ERROR_CODIGO_AGRUPACION_NULO ="messages.error.codigo.agrupacion.nulo";
//	public static final String MESSAGE_ERROR_CODIGO_AGRUPACION_REPETIDO = "messages.error.codigo.agrupacion.repetido";
//	public static final String MESSAGE_ERROR_DESCRIPCION_AGRUPACION_NULO ="messages.error.descripcion.agrupacion.nulo";
//	public static final String MESSAGE_ERROR_DERECHO_NOEXISTE = "messages.error.derecho.no.existe";
//	public static final String MESSAGE_ERROR_PASES_DERECHO_ILIMITADO = "messages.error.pases.derecho.ilimitado";
//	public static final String MESSAGE_ERROR_NO_ENCONTRADO_DATOS_PROGRAMA = "messages.error.consulta.programas.nodata";
//	public static final String MESSAGE_ERROR_ASISTENTE_TERRITORIOS = "messages.error.asistente.territorios";
//	public static final String MESSAGE_ERROR_CREAR_PLANTILLA_DERECHO = "messages.error.crear.plantilla.derecho";
//	public static final String MESSAGE_ERROR_BORRAR_PLANTILLA_DERECHO = "messages.error.borrar.plantilla.derecho";
//	public static final String MESSAGE_ERROR_APLICAR_PLANTILLA_DERECHO = "messages.error.aplicar.plantilla.derecho";
//	public static final String MESSAGE_ERROR_DERECHO_DEMASIADOS_CAPITULOS = "messages.error.derecho.demasiado.num.capitulos";
//	public static final String MESSAGE_ERROR_ELIMINAR_PROVEEDOR = "messages.error.eliminar.proveedor";
//	public static final String MESSAGE_ERROR_VALIDAR_PROVEEDOR = "messages.error.validar.proveedor";
//	public static final String MESSAGE_ERROR_NO_EXISTE_PROVEEDOR = "messages.error.no.existe.proveedor";
//	public static final String MESSAGE_ERROR_PROVEEDOR_REPETIDO = "messages.error.proveedor.repetido";
//	public static final String MESSAGE_ERROR_CONEXION_SAP = "messages.error.no.conexion.sap";
//	public static final String MESSAGE_ERROR_EJERCICIO_NUMEROREGISTRO_DUPLICADO = "messages.error.ejercicio.numeroregistro.duplicado";
//	public static final String MESSAGE_ERROR_PROVEEDOR_RELACION_TITULARIDAD = "messages.error.proveedor.relacion.titularidad";
	
	public static final String MESSAGE_ERROR_FIND_ENTREGAS = "messages.error.cuenta.find.entregas";
	public static final String MESSAGE_ERROR_FIND_ENTREGA = "messages.error.cuenta.find.entrega";
	public static final String MESSAGE_ERROR_FIND_COMPRAS = "messages.error.cuenta.find.compras";
	public static final String MESSAGE_ERROR_FIND_COMPRA = "messages.error.cuenta.find.compra";
	public static final String MESSAGE_ERROR_ADD_ENTREGA = "messages.error.cuenta.add.entrega";
	public static final String MESSAGE_ERROR_DELETE_ENTREGA = "messages.error.cuenta.delete.entrega";
	public static final String MESSAGE_ERROR_ADD_COMPRA = "messages.error.cuenta.add.compra";
	public static final String MESSAGE_ERROR_DELETE_COMPRA = "messages.error.cuenta.delete.compra";
	public static final String MESSAGE_ERROR_CONSULTA_BALANCE = "messages.error.consulta.balance";
	
	// CODIGO HTML
	public static final String DIV_CABECERA = "<div class='titleGrouping'><b>&nbsp;</b>";
//	public static final String DIV_CAPITULO = "<div class='titleGrouping'><b>CAPITULO&nbsp;</b>";
//	public static final String DIV_ICONO_CABECERA_CONTRATOS = "<div name='filaCabecera' " +
//															  "style='cursor:pointer' ";
//	public static final String DIV_ICONO_CABECERA = "<div name='filaCabecera' class='icon-detail-cabecera' ";
//	public static final String DIV_ICONO_CAPITULO = "<div name='filaCapitulo' class='icon-detail-cabecera' ";
	public static final String FIN_DIV = "</div>";
//
//	public static final String DIV_ICONO_CABECERA_COMERCIAL = "<div name='filaCabeceraComercial' class='icon-detail-cabecera' ";
//	public static final String DIV_ICONO_CAPITULO_COMERCIAL = "<div name='filaCapituloComercial' class='icon-detail-cabecera' ";
	
	public static final String CHARSET = "text/html; charset=utf-8";
	

	
}
