package com.onnix.business.utils;

public class Globals {
	// CONSTANTES_FORWARD
	/**
	 * Redirecci&oacute;n tras ejecutar el m&eacute;todo &quot;init&quot;.
	 */
	public static final String FORWARD_INIT = "init";

	/**
	 * Redirecci&oacute;n tras ejecutar el m&eacute;todo &quot;cancelled&quot;.
	 */
	public static final String FORWARD_CANCEL = "cancel";

	/**
	 * Redirecci&oacute;n para ir a la pantalla de creaci&oacute;n de una
	 * gesti&oacute;n.
	 */
	public static final String FORWARD_NEW = "new";

	/**
	 * Redirecci&oacute;n para ir a la pantalla de borrado de una
	 * gesti&oacute;n.
	 */
	public static final String FORWARD_DELETE = "delete";

	/**
	 * Redirecci&oacute;n para ir a la pantalla de edici&oacute;n de una
	 * gesti&oacute;n.
	 */
	public static final String FORWARD_EDIT = "edit";

	/**
	 * Redirecci&oacute;n para ir a la pantalla de b&uacute;squeda de una
	 * gesti&oacute;n.
	 */
	public static final String FORWARD_FIND = "find";

	/**
	 * Redirecci&oacute;n para ir a la pantalla que pide confirmaci&oacute;n del
	 * borrado
	 */
	public static final String FORWARD_CONFIRM_DELETE = "confirmDelete";


	/**
	 * Redirecci&oacute;n para ir a la pantalla que informa que la secci&oacute;n
	 * solicitada est&aacute; en construcci&oacute;n
	 */
	public static final String FORWARD_UNDER_CONSTRUCTION = "underConstruction";
	// FIN_CONTANTES_FORWARD

	// CLAVES_REQUEST
	/**
	 * Clave de la request bajo la que se guarda la URL destino a la que
	 * dirigirse tras una selecci&oacute;n de un elemento de una pantalla de
	 * b&uacute;squeda.
	 */
	public static final String FIND_SELECTION_URL_KEY = "findSelectionURL";
	// FIN_CLAVES_REQUEST

	public static final String SIN_ESPECIFICAR = "";

	public static final String HASH_CODE = "hashCode";

	public static final String VACIO = "";

	public static final String ZERO = "0";

	public static final String ON = "on";
	public static final String OFF = "off";

	// FORMATOS_FECHA_Y_HORA
	public static final String TIME_FORMAT_ISO = "HH:mm:ss";
	public static final String LONG_TIME_FORMAT_ISO = "HH:mm:ss.S";
	public static final String SHORT_TIME_FORMAT_ISO = "HH:mm";

	public static final String DATE_FORMAT_ISO = "yyyy-MM-dd HH:mm:ss";
	public static final String DATE_FORMAT_ENGLISH = "MM-dd-yyyy HH:mm:ss";
	public static final String DATE_FORMAT_SPANISH = "dd/MM/yyyy HH:mm:ss";

	public static final String LONG_DATE_FORMAT_ISO = "yyyy-MM-dd HH:mm:ss.S";
	public static final String LONG_DATE_FORMAT_ENGLISH = "MM-dd-yyyy HH:mm:ss.S";
	public static final String LONG_DATE_FORMAT_SPANISH = "dd/MM/yyyy HH:mm:ss.S";

	public static final String SHORT_DATE_FORMAT_ISO = "yyyy-MM-dd";
	public static final String SHORT_DATE_FORMAT_ENGLISH = "MM-dd-yyyy";
	public static final String SHORT_DATE_FORMAT_SPANISH = "dd/MM/yyyy";
	
	public static final String DATE_FORMAT_SAP = "yyyy-MM-dd";
	// FIN_FORMATOS_FECHA_Y_HORA

	// Formatos Numeros
	public static final String ED_NUMERO_Z = "#,###";
	public static final String ED_NUMERO_2DEC_Z = "#,###.##";
	public static final String ED_NUMERO_SM_2DEC_Z = "####.##";
	public static final String ED_NUMERO_SM_Z = "#####";
	public static final String ED_NUMERO = "#,##0";
	public static final String ED_NUMERO_2DEC = "#,##0.00";
	public static final String ED_NUMERO_SM_2DEC = "####0.00";
	public static final String ED_NUMERO_SM = "####0";
	public static final String ED_NUMERO_4DEC = "#,##0.0000";

	public static final int MENOS_UNO = -1;

	public static final int CERO = 0;

	public static final Double CERO_DOUBLE = new Double(0);

	public static final char ALMOHADILLA = '#';

	public static final char PUNTO_CHAR = '.';

	/*
	 * Constantes de mensajes
	 */
	public static final String ERRORS_GENERAL = "errors.general";

	public static final String ERRORS_GRAVE = "errors.grave";

	/**
	 * Excepcion dejada para su utilizacion en la pagina de error generica
	 */
	public static final String JAVAX_SERVLET_ERROR_EXCEPTION = "javax.servlet.error.exception";

	/**
	 * Key para la propiedad del Base Path de ficheros
	 */
	public static final String BASE_PATH = "BASE_PATH";

	/**
	 * Key para el parámetro method
	 */
	public static final String METHOD = "method";

	public static final String DELETE_SUCCESS = "deleteSuccess";
	public static final String SUCCESS = "success";
	public static final String SUCCESS_FIND = "successFind";
	public static final String EDIT_SUCCESS = "editSuccess";
	public static final String CANCEL_SUCCESS = "cancel";

	/**
	 * Key para las fichas genericas de elementos
	 *
	 * @deprecated Usar el objeto de session en su lugar
	 */
	public static final String FICHA = "ficha";

	/**
	 * Key para las listas genericas de busqueda
	 *  *
	 * @deprecated Usar el objeto de session en su lugar
	 */
	public static final String LISTA = "lista";

	/**
	 *
	 */
	public static final String SESSION_OBJECT = "sessionObject";
	/**
	 * Key para identificación del global-forward en struts Welcome
	 */
	public static final String WELCOME = "welcome";

	/**
	 * No existen datos para las condiciones seleccionadas al generar el informe
	 */
	public static final String ERRORS_NO_DATA_REPORT = "errors.noDataToReport";



	// Reports
}
