package com.onnix.web.beans;

import com.onnix.business.vo.ViewTotalesVO;

public class ViewTotalesBean {
	private Long idCliente;
	private Long idCuenta;
	private Float totalEntregado;
	private Float totalComprado;
	private Float resto;

	public static ViewTotalesBean populate(ViewTotalesVO vo){
		ViewTotalesBean bean = new ViewTotalesBean();
		
		bean.setIdCuenta(vo.getIdCuenta());
		bean.setIdCliente(vo.getIdCliente());
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
