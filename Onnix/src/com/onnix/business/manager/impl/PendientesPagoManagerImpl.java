package com.onnix.business.manager.impl;

import java.util.List;

import com.onnix.business.dao.IPendientesPagoDAO;
import com.onnix.business.manager.IPendientesPagoManager;
import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.business.vo.ViewPendientesPagoVO;

public class PendientesPagoManagerImpl implements IPendientesPagoManager {

	private IPendientesPagoDAO pendientesPagoDAO;
	
	@Override
	public List<ViewPendientesPagoVO> findByExample(ViewPendientesPagoVO vo) {
		// TODO Auto-generated method stub
		return null;
	}
	public List<ViewCuentasClientesVO> findByMesAnio(Integer mes, Integer anio){
		return getPendientesPagoDAO().findByMesAnio(mes, anio);
	}

	public IPendientesPagoDAO getPendientesPagoDAO() {
		return pendientesPagoDAO;
	}

	public void setPendientesPagoDAO(IPendientesPagoDAO pendientesPagoDAO) {
		this.pendientesPagoDAO = pendientesPagoDAO;
	}


}
