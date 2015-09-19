package com.onnix.business.delegate.impl;

import java.util.List;

import com.onnix.business.delegate.IComprasDelegate;
import com.onnix.business.manager.IComprasManager;
import com.onnix.business.vo.CompraVO;

public class ComprasDelegateImpl implements IComprasDelegate {

	private IComprasManager comprasManager;
	
	
	@Override
	public List<CompraVO> findByExample(CompraVO vo) {
		return getComprasManager().findByExample(vo);
	}

	@Override
	public CompraVO loadById(Long id){
		return getComprasManager().loadById(id);
	}

	@Override
	public CompraVO save(CompraVO vo){
		return getComprasManager().save(vo);
	}

	@Override
	public CompraVO delete(CompraVO vo){
		return getComprasManager().delete(vo);
	}

	public IComprasManager getComprasManager() {
		return comprasManager;
	}


	public void setComprasManager(IComprasManager comprasManager) {
		this.comprasManager = comprasManager;
	}



	
	
}
