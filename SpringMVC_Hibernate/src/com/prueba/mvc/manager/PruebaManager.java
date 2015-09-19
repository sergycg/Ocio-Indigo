package com.prueba.mvc.manager;

import java.util.List;

import com.prueba.mvc.excepciones.MyException;
import com.prueba.mvc.vo.PruebaVO;

public interface PruebaManager {
	public List<PruebaVO> findAll();
	public PruebaVO save(PruebaVO vo) throws MyException;
}
