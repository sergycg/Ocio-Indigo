package com.onnix.web.forms;

import java.io.Serializable;

public class OnnixForm implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -6483509374919561859L;
	
	private String[] openTabs;
	private String activeTab;
	// Zona común de alertas
	private String alert;
	private String action;
	
	
	
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String[] getOpenTabs() {
		return openTabs;
	}
	public void setOpenTabs(String[] openTabs) {
		this.openTabs = openTabs;
	}
	public String getActiveTab() {
		return activeTab;
	}
	public void setActiveTab(String activeTab) {
		this.activeTab = activeTab;
	}
	public String getAlert() {
		return alert;
	}
	public void setAlert(String alert) {
		this.alert = alert;
	}

	
}
