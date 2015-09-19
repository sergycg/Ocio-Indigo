/**
 * 
 */
package com.first.backingbeans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

/**
 * @author Pawel
 *
 */
@ManagedBean(name="helloMessageBean")
@RequestScoped
public class HelloMessageBean {
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String goBack(){
		return "index.xhtml";		
	}

}
