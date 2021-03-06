package com.onnix.business.delegate;

import java.util.List;

import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.business.vo.ViewPendientesPagoVO;


public interface IPendientesPagoDelegate {

	public List<ViewPendientesPagoVO> findByExample(ViewPendientesPagoVO vo);
	public List<ViewCuentasClientesVO> findByMesAnio(Integer mes, Integer anio);
	
}
