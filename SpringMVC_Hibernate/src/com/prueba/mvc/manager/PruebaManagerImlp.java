package com.prueba.mvc.manager;

import java.util.List;

import com.prueba.mvc.dao.PruebaDAO;
import com.prueba.mvc.excepciones.MyException;
import com.prueba.mvc.vo.PruebaVO;

public class PruebaManagerImlp implements PruebaManager {

	private PruebaDAO pruebaDAO;
	
	public List<PruebaVO> findAll(){
		return getPruebaDAO().findAll();
	}
	
	public PruebaVO save(PruebaVO vo) throws MyException{
		PruebaVO myVO = getPruebaDAO().save(vo); 
//		if (vo.getId().equals(4))
//			throw new MyException();
		return myVO;
	}

	public PruebaDAO getPruebaDAO() {
		return pruebaDAO;
	}

	public void setPruebaDAO(PruebaDAO pruebaDAO) {
		this.pruebaDAO = pruebaDAO;
	}
	
	
}