package com.onnix.business.delegate.impl;

import java.util.List;

import com.onnix.business.delegate.IEntregasDelegate;
import com.onnix.business.manager.IEntregasManager;
import com.onnix.business.vo.EntregaVO;

public class EntregasDelegateImpl implements IEntregasDelegate {

	private IEntregasManager entregasManager;
	
	
	@Override
	public List<EntregaVO> findByExample(EntregaVO vo) {
		return getEntregasManager().findByExample(vo);
	}

	@Override
	public EntregaVO loadById(Long id){
		return getEntregasManager().loadById(id);
	}

	@Override
	public EntregaVO save(EntregaVO vo){
		return getEntregasManager().save(vo);
	}

	@Override
	public EntregaVO delete(EntregaVO vo){
		return getEntregasManager().delete(vo);
	}

	public IEntregasManager getEntregasManager() {
		return entregasManager;
	}


	public void setEntregasManager(IEntregasManager entregasManager) {
		this.entregasManager = entregasManager;
	}


	
	
}
