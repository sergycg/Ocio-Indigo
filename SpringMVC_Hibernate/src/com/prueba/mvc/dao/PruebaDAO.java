package com.prueba.mvc.dao;

import java.util.List;

import com.prueba.mvc.vo.PruebaVO;

public interface PruebaDAO {
	public List<PruebaVO> findAll();
	public PruebaVO save (PruebaVO vo);
	public void delete (PruebaVO vo);

}
