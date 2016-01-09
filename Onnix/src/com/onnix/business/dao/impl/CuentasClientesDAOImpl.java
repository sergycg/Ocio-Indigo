package com.onnix.business.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.onnix.business.dao.ICuentasClientesDAO;
import com.onnix.business.utils.StringUtils;
import com.onnix.business.vo.ClienteVO;
import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.business.vo.ViewTotalesVO;

public class CuentasClientesDAOImpl extends HibernateDaoSupport implements ICuentasClientesDAO{

	@Override
	public ClienteVO loadById (Long id){
		
		Session session = getSessionFactory().getCurrentSession();
		ClienteVO vo = (ClienteVO) session.get(ClienteVO.class, id);
		return vo;
	}

	@Override
	public ViewCuentasClientesVO loadById(ViewCuentasClientesVO vo) {
		
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(ViewCuentasClientesVO.class);
		
		criteria.add(Restrictions.eq("idCliente", vo.getIdCliente()));
		criteria.add(Restrictions.eq("idCuenta", vo.getIdCuenta()));
		
		ViewCuentasClientesVO resultado = new ViewCuentasClientesVO();
		resultado = (ViewCuentasClientesVO) criteria.uniqueResult();
		return resultado;

	}
	
	@Override
	public ViewTotalesVO loadById(ViewTotalesVO vo) {
		
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(ViewTotalesVO.class);
		
		criteria.add(Restrictions.eq("idCliente", vo.getIdCliente()));
		criteria.add(Restrictions.eq("idCuenta", vo.getIdCuenta()));
		
		ViewTotalesVO resultado = new ViewTotalesVO();
		resultado = (ViewTotalesVO) criteria.uniqueResult();
		return resultado;

	}

	@Override
	public List<ViewCuentasClientesVO> findByExample(ViewCuentasClientesVO vo) {
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(ViewCuentasClientesVO.class);
		
		if (StringUtils.isNotEmpty(vo.getNombre()))
			criteria.add(Restrictions.like("nombre", vo.getNombre(), MatchMode.ANYWHERE));
		if (StringUtils.isNotEmpty(vo.getApellidos()))
			criteria.add(Restrictions.like("apellidos", vo.getApellidos(), MatchMode.ANYWHERE));
		if (StringUtils.isNotEmpty(vo.getTelefono()))
			criteria.add(Restrictions.like("telefono", vo.getTelefono(), MatchMode.ANYWHERE));
		if (StringUtils.isNotEmpty(vo.getCodPostal()))
			criteria.add(Restrictions.like("codPostal", vo.getCodPostal(), MatchMode.ANYWHERE));
		if (vo.getIndActiva()!=null)
			criteria.add(Restrictions.eq("indActiva", vo.getIndActiva()));
		
		
		List listado = criteria.list();
		return listado;
	}

	@Override
	public ClienteVO save(ClienteVO vo){
		Session sesion = getSessionFactory().getCurrentSession();
		sesion.saveOrUpdate(vo);
		return vo;
	}

}
