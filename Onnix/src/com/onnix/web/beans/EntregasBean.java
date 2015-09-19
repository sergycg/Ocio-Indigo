package com.onnix.web.beans;

import java.text.SimpleDateFormat;

import com.onnix.business.utils.CalendarUtils;
import com.onnix.business.utils.Globals;
import com.onnix.business.vo.EntregaVO;

public class EntregasBean {
	private Long id;
	private Long idCuenta;
	private String fecha;
	private Float cantidad;
	private String icono;
	
	public static EntregasBean populate(EntregaVO vo){
		EntregasBean bean = new EntregasBean();
		
		bean.setId(vo.getIdEntrega());
		SimpleDateFormat formateador = new SimpleDateFormat(Globals.SHORT_DATE_FORMAT_SPANISH);
		bean.setFecha(vo.getFecha()==null
				?Globals.VACIO
				:String.valueOf(CalendarUtils.getFormatDate(vo.getFecha(), formateador)));
		bean.setCantidad(vo.getCantidad());
		
		return bean;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}


	public Float getCantidad() {
		return cantidad;
	}


	public void setCantidad(Float cantidad) {
		this.cantidad = cantidad;
	}


	public String getIcono() {
		return icono;
	}

	public void setIcono(String icono) {
		this.icono = icono;
	}


	public Long getIdCuenta() {
		return idCuenta;
	}


	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}


}
