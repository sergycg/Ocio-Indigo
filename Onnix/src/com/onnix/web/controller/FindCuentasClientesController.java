package com.onnix.web.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.onnix.business.constants.ConstantKeys;
import com.onnix.business.delegate.ICuentasClientesDelegate;
import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.web.beans.ViewCuentasClientesBean;
import com.onnix.web.forms.CuentaClienteForm;
import com.onnix.web.forms.FindCuentasClientesForm;

@Controller
@SessionAttributes("findCuentasClientesForm")
public class FindCuentasClientesController {

	@Autowired
	ICuentasClientesDelegate cuentasClientesDelegate;

	@RequestMapping("/initMenuCuentas")
	public String initMenu (Model model, SessionStatus session){
		
		session.setComplete();
		FindCuentasClientesForm formulario = new FindCuentasClientesForm();
		
		model.addAttribute("findCuentasClientesForm", formulario);
		return "findCuentas";
	}

	@RequestMapping("/initFindCuentas")
	public String initFind (SessionStatus session, Model model){
		FindCuentasClientesForm form = (FindCuentasClientesForm)(model.asMap().get("findCuentasClientesForm"));
		model.addAttribute("findCuentasClientesForm", form==null?new FindCuentasClientesForm():form);
//		model.addAttribute("findCuentasClientesForm",findCuentasClientesForm);
		return "findCuentas";
	}

	@RequestMapping(value="/findCuentas", produces={ConstantKeys.CHARSET})
    public @ResponseBody String findCuentas(HttpServletResponse response, FindCuentasClientesForm formulario, Model model)  {
//		try{
			ViewCuentasClientesVO viewCuentaVO = new ViewCuentasClientesVO();
			formulario.set(viewCuentaVO);
			
			List<ViewCuentasClientesVO> listaViewCuentasClientesVO = getCuentasClientesDelegate().findByExample(viewCuentaVO);
			List<ViewCuentasClientesBean> listaCuentas = new ArrayList<ViewCuentasClientesBean>();
			
			if(listaViewCuentasClientesVO!=null){
				for (ViewCuentasClientesVO cuenta:listaViewCuentasClientesVO) {
					ViewCuentasClientesBean bean = ViewCuentasClientesBean.populate(cuenta);
					listaCuentas.add (bean);
				}
						
				getCabeceras(listaCuentas);			
			}
			JSONArray jsonObject = JSONArray.fromObject(listaCuentas);
			
			JSONObject result = new JSONObject();
			result.put("aaData", jsonObject.toString());
			result.put("iTotalRecords", listaCuentas.size());
			result.put("iTotalDisplayRecords", 10);
			
			return result.toString();
//		}catch(ParseException e){
//			logger.error(e);
//			throw new ModelAjaxException(ConstantKeys.MESSAGE_ERROR_CONSULTA_PROGRAMAS);
//		}
    }

	@RequestMapping(value = "/findCuentasClientes", params="action=loadCuentaCliente", method = RequestMethod.POST)
	public String loadCuentaCliente(HttpServletRequest request, @ModelAttribute FindCuentasClientesForm formulario, final RedirectAttributes redirectAttributes) {
		
		CuentaClienteForm form = new CuentaClienteForm();
		form.setIdCuenta(formulario.getIdCuenta_hidden());
		form.setIdCliente(formulario.getIdCliente_hidden());
		redirectAttributes.addFlashAttribute("cuentaClienteForm", form);
		return "redirect:/editCuentaCliente.htm";
	}
	
	private List<ViewCuentasClientesBean> getCabeceras (List<ViewCuentasClientesBean> listaCuentasBean){

		for (ViewCuentasClientesBean cuentaCliente:listaCuentasBean) {
			String cabecera = ConstantKeys.DIV_CABECERA +
					cuentaCliente.getNombre() + " " +
					cuentaCliente.getApellidos();
			if (cuentaCliente.getObservacionesCliente()!=null && !"".equals(cuentaCliente.getObservacionesCliente()))
				cabecera += " (" +	cuentaCliente.getObservacionesCliente() + ")";
			
			cabecera +=	ConstantKeys.FIN_DIV;
			cuentaCliente.setCabecera(cabecera);
		}
		return listaCuentasBean;
	}	
	public ICuentasClientesDelegate getCuentasClientesDelegate() {
		return cuentasClientesDelegate;
	}

	public void setCuentasClientesDelegate(
			ICuentasClientesDelegate cuentasClientesDelegate) {
		this.cuentasClientesDelegate = cuentasClientesDelegate;
	}

		
}


