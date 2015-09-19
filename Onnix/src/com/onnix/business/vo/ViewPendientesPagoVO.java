package com.onnix.business.vo;

import java.io.Serializable;

public class ViewPendientesPagoVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4718822831177732244L;
	
	private Long idCuenta;
	private Long idCliente;
	private String nombre;
	private String apellidos;
	private String observaciones;
	private String estado;
	private Float totalEntregado;
	private Float totalComprado;
	
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getObservaciones() {
		return observaciones;
	}
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
	public Long getIdCuenta() {
		return idCuenta;
	}
	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}
	public Long getIdCliente() {
		return idCliente;
	}
	public void setIdCliente(Long idCliente) {
		this.idCliente = idCliente;
	}
	public Float getTotalEntregado() {
		return totalEntregado;
	}
	public void setTotalEntregado(Float totalEntregado) {
		this.totalEntregado = totalEntregado;
	}
	public Float getTotalComprado() {
		return totalComprado;
	}
	public void setTotalComprado(Float totalComprado) {
		this.totalComprado = totalComprado;
	}
	
	

}
