package com.onnix.business.delegate;

import java.util.List;

import com.onnix.business.vo.ClienteVO;
import com.onnix.business.vo.ViewCuentasClientesVO;


public interface ICuentasClientesDelegate {

	public ViewCuentasClientesVO loadById(ViewCuentasClientesVO vo);
	public List<ViewCuentasClientesVO> findByExample(ViewCuentasClientesVO vo);
	public ClienteVO loadById(Long id);
	public ClienteVO save(ClienteVO vo);
}
