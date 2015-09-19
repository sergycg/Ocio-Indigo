package com.onnix.business.manager;

import java.util.List;

import com.onnix.business.vo.CompraVO;


public interface IComprasManager {

	public List<CompraVO> findByExample(CompraVO vo);
	public CompraVO loadById(Long id);
	public CompraVO save(CompraVO vo);
	public CompraVO delete(CompraVO vo);
}
