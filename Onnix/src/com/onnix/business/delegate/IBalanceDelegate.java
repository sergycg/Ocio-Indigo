package com.onnix.business.delegate;

import java.util.List;

import com.onnix.business.vo.ViewBalanceVO;


public interface IBalanceDelegate {

	public List<ViewBalanceVO> findBalance();
}
