package com.onnix.web.beans;

import com.onnix.business.vo.ViewCuentasClientesVO;

public class ViewCuentasClientesBean {
	private String cabecera;
	private Long idCliente;
	private Long idCuenta;
	private String nombre;
	private String apellidos;
	private String observacionesCliente;
	private Integer estado;
	private String descEstado;
	private Float totalEntregado;
	private Float totalComprado;
	private Float resto;

	public static ViewCuentasClientesBean populate(ViewCuentasClientesVO vo){
		ViewCuentasClientesBean bean = new ViewCuentasClientesBean();
		
		bean.setIdCuenta(vo.getIdCuenta());
		bean.setIdCliente(vo.getIdCliente());
		bean.setNombre(vo.getNombre());
		bean.setApellidos(vo.getApellidos());
		bean.setObservacionesCliente(vo.getObservacionesCliente());
		bean.setDescEstado((vo.getIndActiva()!=null && vo.getIndActiva().equals(1))?"ACTIVA":"CANCELADA");
		bean.setTotalEntregado(vo.getTotalEntregado());
		bean.setTotalComprado(vo.getTotalComprado());
		bean.setResto(vo.getResto());
		
		return bean;
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




	public String getObservacionesCliente() {
		return observacionesCliente;
	}




	public void setObservacionesCliente(String observacionesCliente) {
		this.observacionesCliente = observacionesCliente;
	}

	public Integer getEstado() {
		return estado;
	}




	public void setEstado(Integer estado) {
		this.estado = estado;
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



	public String getCabecera() {
		return cabecera;
	}


	public void setCabecera(String cabecera) {
		this.cabecera = cabecera;
	}




	public String getDescEstado() {
		return descEstado;
	}




	public void setDescEstado(String descEstado) {
		this.descEstado = descEstado;
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
