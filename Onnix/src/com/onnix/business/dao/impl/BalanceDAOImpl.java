package com.onnix.business.dao.impl;

import java.util.List;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.onnix.business.dao.IBalanceDAO;
import com.onnix.business.vo.ViewBalanceVO;

public class BalanceDAOImpl extends HibernateDaoSupport implements IBalanceDAO{

	@Override
	public List<ViewBalanceVO> findBalance() {
		// TODO Auto-generated method stub
		return null;
	}

}
