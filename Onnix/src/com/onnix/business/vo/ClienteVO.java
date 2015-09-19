package com.onnix.business.vo;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class ClienteVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3796064615261399255L;
	
	private Long idCliente;
	private String nombre;
	private String apellidos;
	private String direccion;
	private String codPostal;
	private String telefono;
	private String movil;
	private String otro;
	private String observacionesCliente;
	
	private Set<CuentaVO> cuentas = new HashSet<CuentaVO>();

	public Long getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Long idCliente) {
		this.idCliente = idCliente;
	}

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

	public Set<CuentaVO> getCuentas() {
		return cuentas;
	}

	public void setCuentas(Set<CuentaVO> cuentas) {
		this.cuentas = cuentas;
	}

	public String getObservacionesCliente() {
		return observacionesCliente;
	}

	public void setObservacionesCliente(String observacionesCliente) {
		this.observacionesCliente = observacionesCliente;
	}
	

}
