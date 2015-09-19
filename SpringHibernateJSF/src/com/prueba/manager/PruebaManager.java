package com.prueba.manager;

import java.util.List;

import com.prueba.excepciones.MyException;
import com.prueba.vo.PruebaVO;

public interface PruebaManager {
	public List<PruebaVO> findAll();
	public PruebaVO save(PruebaVO vo) throws MyException;
}
