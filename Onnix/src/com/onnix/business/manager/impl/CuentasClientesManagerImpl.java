package com.onnix.business.manager.impl;

import java.util.List;

import com.onnix.business.dao.ICuentasClientesDAO;
import com.onnix.business.manager.ICuentasClientesManager;
import com.onnix.business.vo.ClienteVO;
import com.onnix.business.vo.ViewCuentasClientesVO;

public class CuentasClientesManagerImpl implements ICuentasClientesManager {

	private ICuentasClientesDAO cuentasClientesDAO;
	
	@Override
	public ClienteVO loadById(Long id){
		return getCuentasClientesDAO().loadById(id);
	}

	@Override
	public ViewCuentasClientesVO loadById(ViewCuentasClientesVO vo){
		return getCuentasClientesDAO().loadById(vo);
		
	}

	@Override
	public List<ViewCuentasClientesVO> findByExample(ViewCuentasClientesVO vo) {
		return getCuentasClientesDAO().findByExample(vo);
	}

	@Override
	public ClienteVO save(ClienteVO vo){
		return getCuentasClientesDAO().save(vo);
	}

	public ICuentasClientesDAO getCuentasClientesDAO() {
		return cuentasClientesDAO;
	}

	public void setCuentasClientesDAO(ICuentasClientesDAO cuentasClientesDAO) {
		this.cuentasClientesDAO = cuentasClientesDAO;
	}

}
