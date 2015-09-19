package com.onnix.web.forms;



public class CompraForm extends OnnixForm{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3335384429270329590L;
	
	private String codigoCompra;
	private String descObjeto;
	private String fecha;
	private String precio;
	public String getDescObjeto() {
		return descObjeto;
	}
	public void setDescObjeto(String descObjeto) {
		this.descObjeto = descObjeto;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getPrecio() {
		return precio;
	}
	public void setPrecio(String precio) {
		this.precio = precio;
	}
	public String getCodigoCompra() {
		return codigoCompra;
	}
	public void setCodigoCompra(String codigoCompra) {
		this.codigoCompra = codigoCompra;
	}
	
	

	
}

