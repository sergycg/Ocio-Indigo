package com.onnix.web.forms;



public class EntregaForm extends OnnixForm{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5583658072759609523L;
	
	private String codigoEntrega;
	private String fecha;
	private String cantidad;
	
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getCodigoEntrega() {
		return codigoEntrega;
	}
	public void setCodigoEntrega(String codigoEntrega) {
		this.codigoEntrega = codigoEntrega;
	}
	public String getCantidad() {
		return cantidad;
	}
	public void setCantidad(String cantidad) {
		this.cantidad = cantidad;
	}
	

	
}

