package com.onnix.business.manager;

import java.util.List;

import com.onnix.business.vo.ViewBalanceVO;


public interface IBalanceManager {

	public List<ViewBalanceVO> findBalance();
}
