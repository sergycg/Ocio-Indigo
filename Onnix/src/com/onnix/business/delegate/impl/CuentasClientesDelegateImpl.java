package com.onnix.business.delegate.impl;

import java.util.List;

import com.onnix.business.delegate.ICuentasClientesDelegate;
import com.onnix.business.manager.ICuentasClientesManager;
import com.onnix.business.vo.ClienteVO;
import com.onnix.business.vo.ViewCuentasClientesVO;

public class CuentasClientesDelegateImpl implements ICuentasClientesDelegate {

	private ICuentasClientesManager cuentasClientesManager;
	
	
	@Override
	public ClienteVO loadById(Long id){
		return getCuentasClientesManager().loadById(id);
	}
	
	@Override
	public ViewCuentasClientesVO loadById(ViewCuentasClientesVO vo){
		return getCuentasClientesManager().loadById(vo);
		
	}
	
	@Override
	public List<ViewCuentasClientesVO> findByExample(ViewCuentasClientesVO vo) {
		return getCuentasClientesManager().findByExample(vo);
	}

	@Override
	public ClienteVO save(ClienteVO vo){
		return getCuentasClientesManager().save(vo);
	}

	public ICuentasClientesManager getCuentasClientesManager() {
		return cuentasClientesManager;
	}


	public void setCuentasClientesManager(
			ICuentasClientesManager cuentasClientesManager) {
		this.cuentasClientesManager = cuentasClientesManager;
	}

	
	
}
