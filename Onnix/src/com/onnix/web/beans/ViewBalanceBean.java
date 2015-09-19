package com.onnix.web.beans;

import com.onnix.business.vo.ViewBalanceVO;

public class ViewBalanceBean {
	private String idCuenta;
	private String idCliente;
	private String nombre;
	private String apellidos;
	private String observaciones;
	private String estado;
	private Float totalEntregado;
	private Float totalComprado;
	
	private Float capitalPendiente;

	public static ViewBalanceBean populate(ViewBalanceVO vo){
		ViewBalanceBean bean = new ViewBalanceBean();
		
		bean.setIdCuenta(vo.getIdCuenta().toString());
		bean.setIdCliente(vo.getIdCliente().toString());
		bean.setNombre(vo.getNombre());
		bean.setApellidos(vo.getApellidos());
		bean.setObservaciones(vo.getObservaciones());
		bean.setEstado(vo.getEstado());
		bean.setTotalEntregado(vo.getTotalEntregado());
		bean.setTotalComprado(vo.getTotalComprado());
		float tentregado = 0;
		float tcomprado = 0;
		if (vo.getTotalEntregado()!=null)
			tentregado = vo.getTotalEntregado();
		if (vo.getTotalComprado()!=null)
			tcomprado = vo.getTotalComprado();
		
		bean.setCapitalPendiente(tcomprado-tentregado);
		
		return bean;
	}


	public String getIdCuenta() {
		return idCuenta;
	}


	public void setIdCuenta(String idCuenta) {
		this.idCuenta = idCuenta;
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


	public String getIdCliente() {
		return idCliente;
	}


	public void setIdCliente(String idCliente) {
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


	public Float getCapitalPendiente() {
		return capitalPendiente;
	}


	public void setCapitalPendiente(Float capitalPendiente) {
		this.capitalPendiente = capitalPendiente;
	}






}
