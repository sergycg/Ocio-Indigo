package com.onnix.web.beans;

import java.text.SimpleDateFormat;

import com.onnix.business.utils.CalendarUtils;
import com.onnix.business.utils.Globals;
import com.onnix.business.vo.CompraVO;

public class CompraBean {
	private Long id;
	private Long idCuenta;
	private String codObjeto;
	private String descObjeto;
	private String fecha;
	private Float precio;
	private String icono;
	
	public static CompraBean populate(CompraVO vo){
		CompraBean bean = new CompraBean();
		
		bean.setId(vo.getIdCompra());
		bean.setCodObjeto(vo.getCodObjeto());
		bean.setDescObjeto(vo.getDescObjeto());
		SimpleDateFormat formateador = new SimpleDateFormat(Globals.SHORT_DATE_FORMAT_SPANISH);
		bean.setFecha(vo.getFecha()==null
				?Globals.VACIO
				:String.valueOf(CalendarUtils.getFormatDate(vo.getFecha(), formateador)));
		bean.setPrecio(vo.getPrecio());
		
		return bean;
	}


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

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getIcono() {
		return icono;
	}

	public void setIcono(String icono) {
		this.icono = icono;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Float getPrecio() {
		return precio;
	}


	public void setPrecio(Float precio) {
		this.precio = precio;
	}


	public Long getIdCuenta() {
		return idCuenta;
	}


	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}


}
