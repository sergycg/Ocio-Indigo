package com.onnix.business.delegate;

import java.util.List;

import com.onnix.business.vo.CompraVO;


public interface IComprasDelegate {

	public List<CompraVO> findByExample(CompraVO vo);
	public CompraVO loadById(Long id);
	public CompraVO save(CompraVO vo);
	public CompraVO delete(CompraVO vo);
}
