package com.onnix.business.dao;

import java.util.List;

import com.onnix.business.vo.EntregaVO;

public interface IEntregasDAO {
	
	public List<EntregaVO> findByExample(EntregaVO vo);
	public EntregaVO loadById(Long id);
	public EntregaVO save(EntregaVO vo);
	public EntregaVO delete(EntregaVO vo);

}
