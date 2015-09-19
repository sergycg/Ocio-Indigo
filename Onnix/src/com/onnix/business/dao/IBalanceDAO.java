package com.onnix.business.dao;

import java.util.List;

import com.onnix.business.vo.ViewBalanceVO;

public interface IBalanceDAO {
	
	public List<ViewBalanceVO> findBalance();

}
