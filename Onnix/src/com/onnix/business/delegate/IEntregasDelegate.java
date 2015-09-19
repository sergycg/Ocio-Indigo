package com.onnix.business.delegate;

import java.util.List;

import com.onnix.business.vo.EntregaVO;


public interface IEntregasDelegate {

	public List<EntregaVO> findByExample(EntregaVO vo);
	public EntregaVO loadById(Long id);
	public EntregaVO save(EntregaVO vo);
	public EntregaVO delete(EntregaVO vo);
}
