package com.prueba.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.prueba.vo.PruebaVO;

public class PruebaDAOImpl extends HibernateDaoSupport implements PruebaDAO{

	public List<PruebaVO> findAll(){
		
//		Session session = getSessionFactory().getCurrentSession();
//		Transaction tx = session.beginTransaction();

		
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(PruebaVO.class);
		List listado = criteria.list();
//		tx.commit();
		return listado;

		
//		return getHibernateTemplate().find("from PruebaVO");
 
	}
	
	public PruebaVO save (PruebaVO vo){
		Session sesion = getSessionFactory().getCurrentSession();
		sesion.saveOrUpdate(vo);
		return vo;
	}
	public void delete (PruebaVO vo){
		Session sesion = getSessionFactory().getCurrentSession();
		sesion.delete(vo);
	}
}
