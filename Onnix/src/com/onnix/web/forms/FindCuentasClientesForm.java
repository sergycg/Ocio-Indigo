package com.onnix.web.forms;

import com.onnix.business.vo.ViewCuentasClientesVO;



//@Scope("session")
public class FindCuentasClientesForm extends OnnixForm{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4597991911841381124L;
	
	private String idCuenta_hidden;
	private String idCliente_hidden;
	private String nombre;
	private String apellidos;
	private String telefono;
	private String codigoPostal;
	private Integer indActiva;
	
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
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getCodigoPostal() {
		return codigoPostal;
	}
	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}
	public String getIdCuenta_hidden() {
		return idCuenta_hidden;
	}
	public void setIdCuenta_hidden(String idCuenta_hidden) {
		this.idCuenta_hidden = idCuenta_hidden;
	}

	public String getIdCliente_hidden() {
		return idCliente_hidden;
	}
	public void setIdCliente_hidden(String idCliente_hidden) {
		this.idCliente_hidden = idCliente_hidden;
	}
	
	
	public Integer getIndActiva() {
		return indActiva;
	}
	public void setIndActiva(Integer indActiva) {
		this.indActiva = indActiva;
	}
	public void set(ViewCuentasClientesVO vo){
		vo.setNombre(this.nombre);
		vo.setApellidos(this.apellidos);
		vo.setTelefono(this.telefono);
		vo.setCodPostal(this.codigoPostal);
		vo.setIndActiva(this.indActiva);
	}

	
}

