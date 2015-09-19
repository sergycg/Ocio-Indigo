package com.onnix.business.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.onnix.business.dao.IComprasDAO;
import com.onnix.business.vo.CompraVO;

public class ComprasDAOImpl extends HibernateDaoSupport implements IComprasDAO{

	@Override
	public List<CompraVO> findByExample(CompraVO vo) {
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(CompraVO.class);
		
		if (vo.getIdCompra()!=null)
			criteria.add(Restrictions.eq("idCompra", vo.getIdCompra()));
		if (vo.getIdCuenta()!=null)
			criteria.add(Restrictions.eq("idCuenta", vo.getIdCuenta()));

		criteria.addOrder(Order.desc("fecha"));

		List listado = criteria.list();
		return listado;
	}
	
//	@Override
	public CompraVO loadById(Long id) {
		
		Session sesion = getSessionFactory().getCurrentSession();
		CompraVO vo =  null;
		
		vo = (CompraVO)sesion.get(CompraVO.class, id);
		return vo;

	}
	
	@Override
	public CompraVO save(CompraVO vo){
		Session sesion = getSessionFactory().getCurrentSession();
		sesion.saveOrUpdate(vo);
		return vo;
	}

	@Override
	public CompraVO delete(CompraVO vo){
		Session sesion = getSessionFactory().getCurrentSession();
		sesion.delete(vo);
		return vo;
	}

	

}
