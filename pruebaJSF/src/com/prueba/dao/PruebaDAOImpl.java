package com.prueba.dao;

import java.util.List;

import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.hibernate.utils.HibernateUtils;
import com.prueba.vo.PruebaVO;

public class PruebaDAOImpl implements PruebaDAO{

	public List<PruebaVO> findAll(){
		Session session = HibernateUtils.getSessionFactory().getCurrentSession();
        session.beginTransaction();
        List result = session.createQuery("from PruebaVO").list();


        session.getTransaction().commit();

//		return getHibernateTemplate().find("from PruebaVO");
        return result;
 
	}
}
