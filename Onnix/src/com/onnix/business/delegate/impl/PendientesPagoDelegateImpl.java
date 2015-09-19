package com.onnix.business.delegate.impl;

import java.util.ArrayList;
import java.util.List;

import com.onnix.business.delegate.IPendientesPagoDelegate;
import com.onnix.business.manager.IPendientesPagoManager;
import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.business.vo.ViewPendientesPagoVO;

public class PendientesPagoDelegateImpl implements IPendientesPagoDelegate {

	private IPendientesPagoManager pendientesPagoManager;
	
	
	@Override
	public List<ViewPendientesPagoVO> findByExample(ViewPendientesPagoVO vo) {
		
		List<ViewPendientesPagoVO> lista = new ArrayList<ViewPendientesPagoVO>();
/*		
		ViewPendientesPagoVO vo1 = new ViewPendientesPagoVO();
		vo1.setIdCliente(new Long(1));
		vo1.setIdCuenta(new Long(10));
		vo1.setNombre("JULIA");
		vo1.setApellidos("GONZALEZ HUERTA");
		vo1.setObservaciones("HIJO DE LA INES");
		vo1.setEstado("ACTIVA");
		
		ViewPendientesPagoVO vo2 = new ViewPendientesPagoVO();
		vo2.setIdCliente(new Long(2));
		vo2.setIdCuenta(new Long(20));
		vo2.setNombre("AMPARO");
		vo2.setApellidos("GOMEZ GOMEZ");
		vo2.setObservaciones("VECINA DE PAQUITA");
		vo2.setEstado("ACTIVA");
		
		lista.add(vo1);
		lista.add(vo2);
*/		
		return lista;
	}

	public List<ViewCuentasClientesVO> findByMesAnio(Integer mes, Integer anio){
		return getPendientesPagoManager().findByMesAnio(mes, anio);
	}

	public IPendientesPagoManager getPendientesPagoManager() {
		return pendientesPagoManager;
	}


	public void setPendientesPagoManager(
			IPendientesPagoManager pendientesPagoManager) {
		this.pendientesPagoManager = pendientesPagoManager;
	}


	
	
}
