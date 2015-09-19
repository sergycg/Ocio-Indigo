package com.onnix.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.onnix.business.delegate.ICuentasClientesDelegate;
import com.onnix.business.exception.ModelException;
import com.onnix.business.utils.StringUtils;
import com.onnix.business.vo.ClienteVO;
import com.onnix.business.vo.ViewCuentasClientesVO;
import com.onnix.web.forms.CuentaClienteForm;

@Controller
public class CuentaClienteController {

	@Autowired
	ICuentasClientesDelegate cuentasClientesDelegate;

	protected static Logger logger = Logger.getLogger(CuentaClienteController.class.getName());

	@RequestMapping(value = "/editCuentaCliente", method = RequestMethod.GET)
	public String loadCuentaCliente (@ModelAttribute("cuentaClienteForm") CuentaClienteForm formulario, Model model, HttpServletRequest request, final RedirectAttributes redirectAttributes) {
		
		String view = "editCuentaCliente";
		
		if (formulario.getIdCliente() != null && formulario.getIdCuenta()!=null){
				
			ViewCuentasClientesVO vo = new ViewCuentasClientesVO();
			vo.setIdCliente(new Long(formulario.getIdCliente()));
			vo.setIdCuenta(new Long(formulario.getIdCuenta()));
			ViewCuentasClientesVO cuentaVO = getCuentasClientesDelegate().loadById(vo);
			
			if (cuentaVO == null){
				view = "errorView";
			}else{
				formulario = new CuentaClienteForm(cuentaVO);
				
				model.addAttribute("cuentaClienteForm", formulario);
			}
			
		}else{
			redirectAttributes.addFlashAttribute("messageError", "Se produjo un error al inicializar la cuenta.");
			logger.error("Error al cargar la cuenta. No hay código de cliente y/o cuenta.");
			view = "redirect:/initFind.htm";
		}
		
		return view;	
	}

	@RequestMapping(value = "/newCliente", method = RequestMethod.GET)
	public String newCliente (Model model) {
		
		String view = "editCuentaCliente";
		CuentaClienteForm cuentaForm =  new CuentaClienteForm();
		cuentaForm.setActivo(new Integer(1));
		model.addAttribute("cuentaClienteForm", cuentaForm);
		
		return view;	
	}
	
	@RequestMapping(value = "/newCuenta", method = RequestMethod.GET)
	public String newCuenta (@ModelAttribute("cuentaClienteForm") CuentaClienteForm formulario, Model model, HttpServletRequest request, final RedirectAttributes redirectAttributes) {
		
		String view = "editCuentaCliente";
		ClienteVO vo = null;
		if (formulario.getIdCliente()!=null){ // Modificacion
			vo = getCuentasClientesDelegate().loadById(new Long(formulario.getIdCliente()));
			if (vo==null)
				return "errorView";
			formulario.set(vo);			
		}else{
			return "errorView";
		}
		model.addAttribute("cuentaClienteForm", formulario);
		
		return view;	
	}

	@RequestMapping(value = "/cuentaClienteForm", params="action=save")
	public String save ( @ModelAttribute("cuentaClienteForm") CuentaClienteForm formulario, Model model,
						HttpServletRequest request, final RedirectAttributes redirectAttributes) {
		
		String view = "editCuentaCliente";
		try{
			formulario.setAction (null);
			
			ClienteVO vo = null;
			if (StringUtils.isNotEmpty(formulario.getIdCliente())){ // Modificacion
				vo = getCuentasClientesDelegate().loadById(new Long(formulario.getIdCliente()));
				if (vo == null){
//					model.addAttribute("messageError", getMessageSource().getMessage(ConstantKeys.MESSAGE_ERROR_DERECHO_NOEXISTE, null, null));
					model.addAttribute("messageError", "El cliente no existe");
					return "errorView";
				}else{
					vo = formulario.populate(vo);
					vo = getCuentasClientesDelegate().save(vo);
					model.addAttribute("message", "Guardado correctamente.");
				}
			} else { // Nuevo
				vo = new ClienteVO();		
				vo = formulario.populate(vo);
				vo = getCuentasClientesDelegate().save(vo);
				model.addAttribute("message", "Guardado correctamente.");
			}

			model.addAttribute("cuentaClienteForm", formulario);
//		}catch(ModelException e){
//			model.addAttribute("messageError", getMessageSource().getMessage(e.getMsgKey(),null,null));
//			logger.error("Error al guardar el derecho CPI: " + e.getMessage());
//			view = "derechoCPI";
		}catch(Exception e){
			redirectAttributes.addFlashAttribute("messageError", "Se produjo un error al guardar el derecho CPI.");
			logger.error("Error al guardar el derecho CPI: " + e);
			view = "redirect:/initFind.htm";
		}
	
		return view;
	}
	
	@RequestMapping(value = "/cuentaClienteForm", params="cancel")
	public String cancel () throws Exception{
		return "redirect:/initFindCuentas.htm";
	}

	public ICuentasClientesDelegate getCuentasClientesDelegate() {
		return cuentasClientesDelegate;
	}

	public void setCuentasClientesDelegate(
			ICuentasClientesDelegate cuentasClientesDelegate) {
		this.cuentasClientesDelegate = cuentasClientesDelegate;
	}

		
}


