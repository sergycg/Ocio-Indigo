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
import com.onnix.business.delegate.IComprasDelegate;
import com.onnix.business.exception.ModelAjaxException;
import com.onnix.business.utils.CalendarUtils;
import com.onnix.business.vo.CompraVO;
import com.onnix.web.beans.CompraBean;

@Controller
public class ComprasController {

	@Autowired
	IComprasDelegate comprasDelegate;

	protected static Logger logger = Logger.getLogger(ComprasController.class.getName());

	@RequestMapping(value="/findCompras", produces={ConstantKeys.CHARSET})
    public @ResponseBody String findCompras(Long idCuenta) throws ModelAjaxException {
		try{
			CompraVO compraVO = new CompraVO();
			compraVO.setIdCuenta(idCuenta);
			List<CompraVO> listaComprasVO = getComprasDelegate().findByExample(compraVO);
			List<CompraBean> listaCompras = new ArrayList<CompraBean>();
			
			for (CompraVO compra:listaComprasVO) {
				CompraBean bean = CompraBean.populate(compra);
				listaCompras.add (bean);
			}
			
			
			JSONArray jsonObject = JSONArray.fromObject(listaCompras);
			
			JSONObject result = new JSONObject();
			result.put("aaData", jsonObject.toString());
			result.put("iTotalRecords", listaCompras.size());
			result.put("iTotalDisplayRecords", 10);
			
			return result.toString();
		}catch(Exception e){
			logger.error("Error al consultar las compras: " + e);
			logger.error(e.getMessage() + "Causa: " + e.getCause());
			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_FIND_COMPRAS);
		}
    }

	
	@RequestMapping(value="/loadCompraById", produces={ConstantKeys.CHARSET})
    public @ResponseBody String loadComprasById(Long idCompra) throws ModelAjaxException {
		try{
		
			CompraBean bean = null;
			CompraVO compraVO = getComprasDelegate().loadById(idCompra);
			if (compraVO!=null){
				bean = CompraBean.populate(compraVO);
			}
			
			JSONObject jsonObject = JSONObject.fromObject(bean);			
			
			return jsonObject.toString();
		}catch(Exception e){
			logger.error("Error al consultar la compra: " + e);
			logger.error(e.getMessage() + "Causa: " + e.getCause());
			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_FIND_COMPRA);
		}
    }

	
	@RequestMapping(value="/addModifyCompra", produces={ConstantKeys.CHARSET})
	public @ResponseBody String addModifyCompra (CompraBean bean) throws ModelAjaxException{

		try {
			CompraVO vo = new CompraVO();
			vo.setIdCompra(bean.getId());
			vo.setDescObjeto(bean.getDescObjeto());
			vo.setFecha(CalendarUtils.getDateFromString(bean.getFecha(), CalendarUtils.SHORT_DATE_FORMAT));
			vo.setPrecio(bean.getPrecio());
			vo.setIdCuenta(bean.getIdCuenta());

			getComprasDelegate().save(vo);

		}catch(Exception e){
			logger.error("Error al añadir la compra: " + e);
			logger.error(e.getMessage() + "Causa: " + e.getCause());
			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_ADD_COMPRA);
		}
		
		return null;
	}
	
	@RequestMapping(value="/deleteCompra", produces={ConstantKeys.CHARSET})
    public @ResponseBody String deleteCompra(Long idCompra) throws ModelAjaxException {
		try{
		
			CompraVO compraVO = getComprasDelegate().loadById(idCompra);
			getComprasDelegate().delete(compraVO);
			return null;
		}catch(Exception e){
			logger.error("Error al borrar la compra: " + e);
			logger.error(e.getMessage() + "Causa: " + e.getCause());
			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_DELETE_COMPRA);
		}
    }

	public IComprasDelegate getComprasDelegate() {
		return comprasDelegate;
	}

	public void setComprasDelegate(IComprasDelegate comprasDelegate) {
		this.comprasDelegate = comprasDelegate;
	}


	
}


