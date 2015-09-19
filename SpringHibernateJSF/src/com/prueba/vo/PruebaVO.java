package com.prueba.vo;

import java.io.Serializable;

public class PruebaVO implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4905293395570345926L;
	
	private Integer id;
	private String nombre;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
}
