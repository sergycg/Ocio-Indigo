/**
 *
 */
package com.onnix.business.exception;

import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import com.iecisa.commons.business.exception.ModelMessage;

/**
 * Excepci&oacute;n lanzada cuando hay un error en una clase de la capa de
 * negocio.
 * <p>
 * Soporta anidamiento, emulando el comportamiento de JDK 1.4 si es necesario.
 * </p>
 * <p>
 * Tambien contiene un posible array de {@link ModelMessage} para utilizar como almacen
 * de los diferentes problemas que se producen en la excepcion del negocio.
 * </p>
 * @author Ruben Suarez Alvarez
 * @version $Revision: 2076 $ ($Author: ruben.suarez $)
 *
 */
public class ModelAjaxException extends Exception {

	/**
	 * Para cumplir la interfaz Serializable.
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Soporta el JDK excepciones anidadas?
	 */
	private static final boolean JDK_SUPPORTS_NESTED;

	/**
	 * Clave del mensaje gen&eacute;erico para las ModelException.
	 */
	private static final String KEY_GENERIC_MESSAGE = "ModelException.genericMessage";

	/**
	 * Clave del mensaje de error (dentro de un archivo de recursos) asociado a
	 * la excepci&oacute;n.
	 */
	private String msgKey;

	/**
	 * Conjunto de mensajes asociados a la excepcion del modelo
	 */
	private List messages;

	static {
		boolean flag = false;

		try {
			Throwable.class.getDeclaredMethod("getCause", new Class[0]);
			flag = true;
		} catch (NoSuchMethodException ex) {
			flag = false;
		}

		JDK_SUPPORTS_NESTED = flag;
	}

	/**
	 * Raiz causante de la excepcion
	 */
	private final Throwable rootCause;

	/**
	 * Construye una nueva <code>ModelException</code> sin mensaje de detalle.
	 */
	public ModelAjaxException() {
		super();
		rootCause = null;
		msgKey = null;
		messages = null;
	}

	/**
	 * Construye una nueva <code>ModelException</code> con una clave de
	 * mensaje de detalle espec&iacute;fico.
	 *
	 * @param msgKey
	 *            la clave del mensaje de error.
	 */
	public ModelAjaxException(String msgKey) {
		super();
		rootCause = null;
		this.msgKey = msgKey;
	}

	/**
	 * Construye una nueva <code>ModelException</code> con un
	 * <code>Throwable</code> especificado como causa.
	 *
	 * @param rootCause
	 *            la excepci&oacute;n o error que origin&oacute; la
	 *            excepci&oacute;n lanzada.
	 */
	public ModelAjaxException(Throwable rootCause) {
		super((rootCause == null) ? null : rootCause.getMessage());
		this.rootCause = rootCause;
		msgKey = null;
	}

	/**
	 * Construye una nueva <code>ModelException</code> con la clave del
	 * mensaje de detalle del error y la <code>Throwable</code> anidada como
	 * causa.
	 *
	 * @param msgKey
	 *            la clave del mensaje de error.
	 * @param rootCause
	 *            la excepci&oacute;n o error que origin&oacute; la
	 *            excepci&oacute;n lanzada.
	 */
	public ModelAjaxException(String msgKey, Throwable rootCause) {
		super();
		this.rootCause = rootCause;
		this.msgKey = msgKey;
	}

	/**
	 * Devuelve la clave del mensaje de error asociado a la excepci&oacute;n.
	 * <p>
	 * El mensaje se obtendr&aacute;n posteriormente de un fichero de
	 * propiedades.
	 * </p>
	 *
	 * @return la clave del mensaje o null
	 */
	public String getMsgKey() {
		return msgKey;
	}

	/**
	 * Retorna el conjunto de {@link ModelMessage} asociados a esta excepcion
	 * 
	 * @return
	 */
	public List getMessages(){
		if (messages == null){
			this.messages = new ArrayList();
		}
		return messages;
	}
	
	/* (non-Javadoc)
	 * @see java.lang.Throwable#getCause()
	 */
	public Throwable getCause() {
		return rootCause;
	}

	/* (non-Javadoc)
	 * @see java.lang.Throwable#printStackTrace()
	 */
	public void printStackTrace() {
		printStackTrace(System.err);
	}

	/* (non-Javadoc)
	 * @see java.lang.Throwable#printStackTrace(java.io.PrintStream)
	 */
	public void printStackTrace(PrintStream out) {
		synchronized (out) {
			PrintWriter pw = new PrintWriter(out, false);
			printStackTrace(pw);

			// Flush the PrintWriter before it's GC'ed.
			pw.flush();
		}
	}

	/* (non-Javadoc)
	 * @see java.lang.Throwable#printStackTrace(java.io.PrintWriter)
	 */
	public void printStackTrace(PrintWriter out) {
		synchronized (out) {
			super.printStackTrace(out);

			if (!JDK_SUPPORTS_NESTED && (rootCause != null)) {
				out.print("Caused by: ");
				rootCause.printStackTrace(out);
			}
		}
	}

	/* (non-Javadoc)
	 * @see java.lang.Throwable#getLocalizedMessage()
	 */
	public String getLocalizedMessage() {
		// TODO Implementar
		return getMessage();
	}

	
}
