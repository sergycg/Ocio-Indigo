package com.onnix.business.dao;

import java.util.List;

import com.onnix.business.vo.ClienteVO;
import com.onnix.business.vo.ViewCuentasClientesVO;

public interface ICuentasClientesDAO {
	
	public ViewCuentasClientesVO loadById(ViewCuentasClientesVO vo);
	public List<ViewCuentasClientesVO> findByExample(ViewCuentasClientesVO vo);
	public ClienteVO loadById(Long id);
	public ClienteVO save(ClienteVO vo);

}
