package com.onnix.business.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.onnix.business.dao.IPendientesPagoDAO;
import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.business.vo.ViewPendientesPagoVO;

public class PendientesPagoDAOImpl extends HibernateDaoSupport implements IPendientesPagoDAO{

	@Override
	public List<ViewCuentasClientesVO> findByMesAnio(Integer mes, Integer anio) {
		Session sesion = getSessionFactory().getCurrentSession();
		
		String SQL = "select * from `vw_cuenta_cliente` vw_b where vw_b.`ID_CUENTA` not in (" +
				"select ID_CUENTA from" +
				  " (select `cli`.`idCliente` AS `ID_CLIENTE`, `cu`.`idCuenta` AS `ID_CUENTA`, `cu`.`activa` AS `IND_ACTIVA`, en.`fecha` as FECHA_ENTREGA" +
				  " from (`cliente` `CLI` join `cuenta` `CU` join `entrega` en)" +
				  " where (`cli`.`idCliente` = `cu`.`idCliente` and cu.`idCuenta`= en.`idCuenta`)) as tableAux" +
				  " where MONTH(FECHA_ENTREGA)=" + mes + " and YEAR(FECHA_ENTREGA)=" + anio + " and IND_ACTIVA=1 group by id_cuenta)";
		
		Query query = sesion.createSQLQuery(SQL).addEntity(ViewCuentasClientesVO.class);
		
		return query.list();
		
	}

	@Override
	public List<ViewPendientesPagoVO> findByExample(ViewPendientesPagoVO vo) {
		// TODO Auto-generated method stub
		return null;
	}
}
