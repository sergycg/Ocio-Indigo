package com.onnix.business.vo;

import java.io.Serializable;
import java.util.Date;

public class ViewCuentasClientesVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5598125788751966122L;
	private Long idCliente;
	private Long idCuenta;
	private String nombre;
	private String apellidos;
	private String direccion;
	private String codPostal;
	private String telefono;
	private String movil;
	private String otro;
	private Date fechaAlta;
	private Date fechaModificacion;
	private String observacionesCliente;
	private String observacionesCuenta;
	private Integer indActiva;
	private Float totalEntregado;
	private Float totalComprado;
	private Float resto;
	
	
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
	public Long getIdCliente() {
		return idCliente;
	}
	public void setIdCliente(Long idCliente) {
		this.idCliente = idCliente;
	}
	public Long getIdCuenta() {
		return idCuenta;
	}
	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getCodPostal() {
		return codPostal;
	}
	public void setCodPostal(String codPostal) {
		this.codPostal = codPostal;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getMovil() {
		return movil;
	}
	public void setMovil(String movil) {
		this.movil = movil;
	}
	public String getOtro() {
		return otro;
	}
	public void setOtro(String otro) {
		this.otro = otro;
	}
	public Date getFechaAlta() {
		return fechaAlta;
	}
	public void setFechaAlta(Date fechaAlta) {
		this.fechaAlta = fechaAlta;
	}
	public Date getFechaModificacion() {
		return fechaModificacion;
	}
	public void setFechaModificacion(Date fechaModificacion) {
		this.fechaModificacion = fechaModificacion;
	}
	public String getObservacionesCliente() {
		return observacionesCliente;
	}
	public void setObservacionesCliente(String observacionesCliente) {
		this.observacionesCliente = observacionesCliente;
	}
	public String getObservacionesCuenta() {
		return observacionesCuenta;
	}
	public void setObservacionesCuenta(String observacionesCuenta) {
		this.observacionesCuenta = observacionesCuenta;
	}
	public Integer getIndActiva() {
		return indActiva;
	}
	public void setIndActiva(Integer indActiva) {
		this.indActiva = indActiva;
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
	public Float getResto() {
		return resto;
	}
	public void setResto(Float resto) {
		this.resto = resto;
	}
	
	

}
