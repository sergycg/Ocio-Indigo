package com.onnix.web.controller;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.onnix.business.constants.ConstantKeys;
import com.onnix.business.delegate.IEntregasDelegate;
import com.onnix.business.exception.ModelAjaxException;
import com.onnix.business.utils.CalendarUtils;
import com.onnix.business.vo.EntregaVO;
import com.onnix.web.beans.EntregasBean;

@Controller
public class EntregasController {

	@Autowired
	IEntregasDelegate entregasDelegate;

	protected static Logger logger = Logger.getLogger(EntregasController.class.getName());

	@RequestMapping(value="/findEntregas", produces={ConstantKeys.CHARSET})
    public @ResponseBody String findEntregas(Long idCuenta) throws ModelAjaxException {
		try{
			EntregaVO entregaVO = new EntregaVO();
			entregaVO.setIdCuenta(idCuenta);
			
			List<EntregaVO> listaEntregasVO = getEntregasDelegate().findByExample(entregaVO);
			List<EntregasBean> listaEntregas = new ArrayList<EntregasBean>();
			
			for (EntregaVO compra:listaEntregasVO) {
				EntregasBean bean = EntregasBean.populate(compra);
				listaEntregas.add (bean);
			}
			
			
			JSONArray jsonObject = JSONArray.fromObject(listaEntregas);
			
			JSONObject result = new JSONObject();
			result.put("aaData", jsonObject.toString());
			result.put("iTotalRecords", listaEntregas.size());
			result.put("iTotalDisplayRecords", 10);
			
			return result.toString();
		}catch(Exception e){
			logger.error("Error al consultar las entregas: " + e);
			logger.error(e.getMessage() + "Causa: " + e.getCause());
			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_FIND_ENTREGAS);
		}
    }

	@RequestMapping(value="/loadEntregaById", produces={ConstantKeys.CHARSET})
    public @ResponseBody String loadEntregaById(Long idEntrega) throws ModelAjaxException {
		try{
		
			EntregasBean bean = null;
			EntregaVO entregaVO = getEntregasDelegate().loadById(idEntrega);
			if (entregaVO!=null){
				bean = EntregasBean.populate(entregaVO);
			}
			
			JSONObject jsonObject = JSONObject.fromObject(bean);			
			
			return jsonObject.toString();
		}catch(Exception e){
			logger.error("Error al consultar la entrega: " + e);
			logger.error(e.getMessage() + "Causa: " + e.getCause());
			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_FIND_ENTREGA);
		}
    }

	
	@RequestMapping(value="/addModifyEntrega", produces={ConstantKeys.CHARSET})
	public @ResponseBody String addModifyEntrega (EntregasBean bean) throws ModelAjaxException{

		try {
			EntregaVO vo = new EntregaVO();
			vo.setIdEntrega(bean.getId());
			vo.setCantidad(bean.getCantidad());
			vo.setFecha(CalendarUtils.getDateFromString(bean.getFecha(), CalendarUtils.SHORT_DATE_FORMAT));
			vo.setIdCuenta(bean.getIdCuenta());

			getEntregasDelegate().save(vo);

		}catch(Exception e){
			logger.error("Error al añadir la entrega: " + e);
			logger.error(e.getMessage() + "Causa: " + e.getCause());
			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_ADD_ENTREGA);
		}
		
		return null;
	}
	
	@RequestMapping(value="/deleteEntrega", produces={ConstantKeys.CHARSET})
    public @ResponseBody String deleteEntrega(Long idEntrega) throws ModelAjaxException {
		try{
		
			EntregaVO entregaVO = getEntregasDelegate().loadById(idEntrega);
			getEntregasDelegate().delete(entregaVO);
			return null;
		}catch(Exception e){
			logger.error("Error al borrar la entrega: " + e);
			logger.error(e.getMessage() + "Causa: " + e.getCause());
			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_DELETE_ENTREGA);
		}
    }

	public IEntregasDelegate getEntregasDelegate() {
		return entregasDelegate;
	}

	public void setEntregasDelegate(IEntregasDelegate entregasDelegate) {
		this.entregasDelegate = entregasDelegate;
	}


	
}


