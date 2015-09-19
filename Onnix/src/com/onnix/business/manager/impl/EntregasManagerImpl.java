package com.onnix.business.manager.impl;

import java.util.List;

import com.onnix.business.dao.IEntregasDAO;
import com.onnix.business.manager.IEntregasManager;
import com.onnix.business.vo.EntregaVO;

public class EntregasManagerImpl implements IEntregasManager {

	private IEntregasDAO entregasDAO;
	
	@Override
	public List<EntregaVO> findByExample(EntregaVO vo) {
		return getEntregasDAO().findByExample(vo);
	}

	@Override
	public EntregaVO loadById(Long id){
		return getEntregasDAO().loadById(id);
	}

	@Override
	public EntregaVO save(EntregaVO vo){
		return getEntregasDAO().save(vo);
	}
	
	@Override
	public EntregaVO delete(EntregaVO vo){
		return getEntregasDAO().delete(vo);
	}
	
	public IEntregasDAO getEntregasDAO() {
		return entregasDAO;
	}

	public void setEntregasDAO(IEntregasDAO entregasDAO) {
		this.entregasDAO = entregasDAO;
	}


}
