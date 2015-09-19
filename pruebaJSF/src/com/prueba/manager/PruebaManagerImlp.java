package com.prueba.manager;

import java.util.List;

import com.prueba.dao.PruebaDAO;
import com.prueba.vo.PruebaVO;

public class PruebaManagerImlp implements PruebaManager {

	private PruebaDAO pruebaDAO;
	
	public List<PruebaVO> findAll(){
		return getPruebaDAO().findAll();
	}

	public PruebaDAO getPruebaDAO() {
		return pruebaDAO;
	}

	public void setPruebaDAO(PruebaDAO pruebaDAO) {
		this.pruebaDAO = pruebaDAO;
	}
	
	
}
