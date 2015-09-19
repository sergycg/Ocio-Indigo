package com.onnix.business.vo;

import java.io.Serializable;
import java.util.Date;

public class CuentaVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7893982854923752894L;
	
	private ClienteVO cliente;
	private Long idCuenta;
	
	private Date fechaAlta;
	private Date fechaModificacion;
	private String observacionesCuenta;
	private Integer indActiva;
	
	
	public ClienteVO getCliente() {
		return cliente;
	}
	public void setCliente(ClienteVO cliente) {
		this.cliente = cliente;
	}
	public Long getIdCuenta() {
		return idCuenta;
	}
	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
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
	public Integer getIndActiva() {
		return indActiva;
	}
	public void setIndActiva(Integer indActiva) {
		this.indActiva = indActiva;
	}
	public String getObservacionesCuenta() {
		return observacionesCuenta;
	}
	public void setObservacionesCuenta(String observacionesCuenta) {
		this.observacionesCuenta = observacionesCuenta;
	}
	
	@Override
	public int hashCode(){
		if (cliente!=null && cliente.getIdCliente()!=null && idCuenta!=null)
			return Long.valueOf(cliente.getIdCliente() * idCuenta).intValue();
		return 1;
	}

	@Override
	public boolean equals(Object o){
		CuentaVO c = (CuentaVO)o;
		if (this.cliente!=null && this.cliente.getIdCliente()!=null && c.cliente!=null && c.cliente.getIdCliente()!=null && this.cliente.getIdCliente().equals(c.cliente.getIdCliente()) 
				&& this.idCuenta!=null && c.idCuenta!=null && this.idCuenta.equals(c.idCuenta))
			return true;
		return false;
	}

}
