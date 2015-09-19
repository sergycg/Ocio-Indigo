package com.onnix.business.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.onnix.business.dao.IEntregasDAO;
import com.onnix.business.vo.EntregaVO;

public class EntregasDAOImpl extends HibernateDaoSupport implements IEntregasDAO{

	@Override
	public EntregaVO loadById(Long id){
		Session sesion = getSessionFactory().getCurrentSession();
		EntregaVO vo =  null;
		
		vo = (EntregaVO)sesion.get(EntregaVO.class, new Long(id));
		return vo;
	}
	
	@Override
	public List<EntregaVO> findByExample(EntregaVO vo) {
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(EntregaVO.class);

		if (vo.getIdEntrega()!=null)
			criteria.add(Restrictions.eq("idEntrega", vo.getIdEntrega()));
		if (vo.getIdCuenta()!=null)
			criteria.add(Restrictions.eq("idCuenta", vo.getIdCuenta()));

		criteria.addOrder(Order.desc("fecha"));
		List listado = criteria.list();
		return listado;
	}
	
	@Override
	public EntregaVO save(EntregaVO vo){
		Session sesion = getSessionFactory().getCurrentSession();
		sesion.saveOrUpdate(vo);
		return vo;
	}

	@Override
	public EntregaVO delete(EntregaVO vo){
		Session sesion = getSessionFactory().getCurrentSession();
		sesion.delete(vo);
		return vo;
	}

}
