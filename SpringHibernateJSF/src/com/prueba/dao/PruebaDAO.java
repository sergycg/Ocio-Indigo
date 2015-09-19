package com.prueba.dao;

import java.util.List;

import com.prueba.vo.PruebaVO;

public interface PruebaDAO {
	public List<PruebaVO> findAll();
	public PruebaVO save (PruebaVO vo);
	public void delete (PruebaVO vo);

}
