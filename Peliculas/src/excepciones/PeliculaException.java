package excepciones;

public class PeliculaException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String mensaje;
	
	public PeliculaException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PeliculaException(String arg0, Throwable arg1) {
		super(arg0, arg1);
		// TODO Auto-generated constructor stub
	}

	public PeliculaException(String arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

	public PeliculaException(Throwable arg0) {
		super(arg0);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the mensaje
	 */
	public String getMensaje() {
		return mensaje;
	}

	/**
	 * @param mensaje the mensaje to set
	 */
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

}
