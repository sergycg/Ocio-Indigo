package com.onnix.business.vo;

import java.io.Serializable;
import java.util.Date;

public class CompraVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8417814944775494189L;
	
	private Long idCuenta;
	private Long idCompra;
	private String codObjeto;
	private String descObjeto;
	private Date fecha;
	private String numFactura;
	private Float precio;
	
	
	public String getCodObjeto() {
		return codObjeto;
	}
	public void setCodObjeto(String codObjeto) {
		this.codObjeto = codObjeto;
	}
	public String getDescObjeto() {
		return descObjeto;
	}
	public void setDescObjeto(String descObjeto) {
		this.descObjeto = descObjeto;
	}
	public Long getIdCuenta() {
		return idCuenta;
	}
	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}
	public Long getIdCompra() {
		return idCompra;
	}
	public void setIdCompra(Long idCompra) {
		this.idCompra = idCompra;
	}
	public String getNumFactura() {
		return numFactura;
	}
	public void setNumFactura(String numFactura) {
		this.numFactura = numFactura;
	}
	public Float getPrecio() {
		return precio;
	}
	public void setPrecio(Float precio) {
		this.precio = precio;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	

}
