package com.prueba.mvc.forms;

import java.io.Serializable;

import org.springframework.context.annotation.Scope;


//@Scope("session")
public class FindDerechosForm implements Serializable{
	private String parametro1;
	private static final long serialVersionUID = -5884683560485131654L;
	public String getParametro1() {
		return parametro1;
	}
	public void setParametro1(String parametro1) {
		this.parametro1 = parametro1;
	}

	
}

