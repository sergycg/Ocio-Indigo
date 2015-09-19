package com.onnix.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.onnix.business.constants.ConstantKeys;
import com.onnix.business.delegate.ICuentasClientesDelegate;
import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.web.beans.ViewCuentasClientesBean;

@Controller
public class BalanceController {

	@Autowired
	ICuentasClientesDelegate cuentasClientesDelegate;
	
	protected static Logger logger = Logger.getLogger(BalanceController.class.getName());

	@RequestMapping("/initMenuBalance")
	public String initMenu (Model model){
		
//		FindBalanceForm formulario = new FindBalanceForm();
//		
//		model.addAttribute("balanceForm", formulario);
		return "balance";
	}

	@RequestMapping(value="/findBalance", produces={ConstantKeys.CHARSET})
    public @ResponseBody String findBalance(HttpServletResponse response, Model model)  {
//		try{
		ViewCuentasClientesVO viewCuentaVO = new ViewCuentasClientesVO();
		viewCuentaVO.setIndActiva(ConstantKeys.TIPO_ACTIVO);
		List<ViewCuentasClientesVO> listaViewCuentasClientesVO = getCuentasClientesDelegate().findByExample(viewCuentaVO);
		List<ViewCuentasClientesBean> listaCuentas = new ArrayList<ViewCuentasClientesBean>();
			
			for (ViewCuentasClientesVO bal:listaViewCuentasClientesVO) {
				ViewCuentasClientesBean bean = ViewCuentasClientesBean.populate(bal);
				listaCuentas.add (bean);
			}
			
			JSONArray jsonObject = JSONArray.fromObject(listaCuentas);
			
			JSONObject result = new JSONObject();
			result.put("aaData", jsonObject.toString());
			result.put("iTotalRecords", listaCuentas.size());
			result.put("iTotalDisplayRecords", 10);
			
			return result.toString();
//		}catch(ParseException e){
//			logger.error(e);
//			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_CONSULTA_BALANCE);
//		}
    }

	public ICuentasClientesDelegate getCuentasClientesDelegate() {
		return cuentasClientesDelegate;
	}

	public void setCuentasClientesDelegate(
			ICuentasClientesDelegate cuentasClientesDelegate) {
		this.cuentasClientesDelegate = cuentasClientesDelegate;
	}




	

		
}


