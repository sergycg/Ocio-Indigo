package com.onnix.business.manager.impl;

import java.util.List;

import com.onnix.business.dao.IComprasDAO;
import com.onnix.business.manager.IComprasManager;
import com.onnix.business.vo.CompraVO;

public class ComprasManagerImpl implements IComprasManager {

	private IComprasDAO comprasDAO;
	
	@Override
	public List<CompraVO> findByExample(CompraVO vo) {
		return getComprasDAO().findByExample(vo);
	}

	@Override
	public CompraVO loadById(Long id){
		return getComprasDAO().loadById(id);
	}

	@Override
	public CompraVO save(CompraVO vo){
		return getComprasDAO().save(vo);
	}

	@Override
	public CompraVO delete(CompraVO vo){
		return getComprasDAO().delete(vo);
	}

	public IComprasDAO getComprasDAO() {
		return comprasDAO;
	}

	public void setComprasDAO(IComprasDAO comprasDAO) {
		this.comprasDAO = comprasDAO;
	}


}
