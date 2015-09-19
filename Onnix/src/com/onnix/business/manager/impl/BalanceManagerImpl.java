package com.onnix.business.manager.impl;

import java.util.List;

import com.onnix.business.dao.IBalanceDAO;
import com.onnix.business.manager.IBalanceManager;
import com.onnix.business.vo.ViewBalanceVO;

public class BalanceManagerImpl implements IBalanceManager {

	private IBalanceDAO balanceDAO;
	
	@Override
	public List<ViewBalanceVO> findBalance() {
		// TODO Auto-generated method stub
		return null;
	}

	public IBalanceDAO getBalanceDAO() {
		return balanceDAO;
	}

	public void setBalanceDAO(IBalanceDAO balanceDAO) {
		this.balanceDAO = balanceDAO;
	}



}
