package com.onnix.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.onnix.business.constants.ConstantKeys;
import com.onnix.business.delegate.IPendientesPagoDelegate;
import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.web.beans.ViewCuentasClientesBean;
import com.onnix.web.beans.ViewPendientesPagoBean;
import com.onnix.web.forms.FindPendientesPagoForm;

@Controller
public class PendientesPagoController {

	@Autowired
	IPendientesPagoDelegate pendientesPagoDelegate;

	@RequestMapping("/initMenuPendientesPago")
	public String initMenu (Model model){
		
		FindPendientesPagoForm formulario = new FindPendientesPagoForm();
		
		model.addAttribute("pendientesPagoForm", formulario);
		return "findPendientesPago";
	}

	@RequestMapping(value="/findPendientesPago", produces={ConstantKeys.CHARSET})
    public @ResponseBody String findPendientesPago(String mes, String anio)  {
//		try{
			
			List<ViewCuentasClientesVO> listaViewPendientesPagoVO = getPendientesPagoDelegate().findByMesAnio(new Integer(mes), new Integer(anio));
			List<ViewCuentasClientesBean> listaPendientesPago = new ArrayList<ViewCuentasClientesBean>();
			
			for (ViewCuentasClientesVO pp:listaViewPendientesPagoVO) {
				ViewCuentasClientesBean bean = ViewCuentasClientesBean.populate(pp);
				listaPendientesPago.add (bean);
			}
			
			JSONArray jsonObject = JSONArray.fromObject(listaPendientesPago);
			
			JSONObject result = new JSONObject();
			result.put("aaData", jsonObject.toString());
			result.put("iTotalRecords", listaPendientesPago.size());
			result.put("iTotalDisplayRecords", 10);
			
			return result.toString();
//		}catch(ParseException e){
//			logger.error(e);
//			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_CONSULTA_PROGRAMAS);
//		}
    }

	public IPendientesPagoDelegate getPendientesPagoDelegate() {
		return pendientesPagoDelegate;
	}

	public void setPendientesPagoDelegate(
			IPendientesPagoDelegate pendientesPagoDelegate) {
		this.pendientesPagoDelegate = pendientesPagoDelegate;
	}


	

		
}


