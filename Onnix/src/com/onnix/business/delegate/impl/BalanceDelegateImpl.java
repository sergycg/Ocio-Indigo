package com.onnix.business.delegate.impl;

import java.util.ArrayList;
import java.util.List;

import com.onnix.business.delegate.IBalanceDelegate;
import com.onnix.business.manager.IBalanceManager;
import com.onnix.business.vo.ViewBalanceVO;

public class BalanceDelegateImpl implements IBalanceDelegate {

	private IBalanceManager balanceManager;
	
	
	@Override
	public List<ViewBalanceVO> findBalance() {
		
		List<ViewBalanceVO> lista = new ArrayList<ViewBalanceVO>();
		
		ViewBalanceVO vo1 = new ViewBalanceVO();
		vo1.setIdCliente(new Long(1));
		vo1.setIdCuenta(new Long(10));
		vo1.setNombre("JULIA");
		vo1.setApellidos("GONZALEZ HUERTA");
		vo1.setObservaciones("HIJO DE LA INES");
		vo1.setEstado("ACTIVA");
		vo1.setTotalEntregado(new Float(130));
		vo1.setTotalComprado(new Float(1200));
		
		ViewBalanceVO vo2 = new ViewBalanceVO();
		vo2.setIdCliente(new Long(2));
		vo2.setIdCuenta(new Long(20));
		vo2.setNombre("AMPARO");
		vo2.setApellidos("GOMEZ GOMEZ");
		vo2.setObservaciones("VECINA DE PAQUITA");
		vo2.setEstado("ACTIVA");
		vo2.setTotalEntregado(new Float(430));
		vo2.setTotalComprado(new Float(2200));
		
		lista.add(vo1);
		lista.add(vo2);
		
		return lista;
	}


	public IBalanceManager getBalanceManager() {
		return balanceManager;
	}


	public void setBalanceManager(IBalanceManager balanceManager) {
		this.balanceManager = balanceManager;
	}






	
	
}
