package com.onnix.business.vo;

import java.io.Serializable;
import java.util.Date;

public class EntregaVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4233227365542552334L;
	
	private Long idCuenta;
	private Long idEntrega;
	private Date fecha;
	private Float cantidad;
	
	
	public Long getIdCuenta() {
		return idCuenta;
	}
	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}
	public Long getIdEntrega() {
		return idEntrega;
	}
	public void setIdEntrega(Long idEntrega) {
		this.idEntrega = idEntrega;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public Float getCantidad() {
		return cantidad;
	}
	public void setCantidad(Float cantidad) {
		this.cantidad = cantidad;
	}
	
	


}
