package com.onnix.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.onnix.web.forms.FindCuentasClientesForm;

@Controller
public class WelcomeController {

//	@Autowired
//	PruebaManager pruebaManager;
	
	
	@RequestMapping(value="/welcome")
    public String welcome(Model model, final RedirectAttributes redirectAttributes)  {
		System.out.println("probando..");
//		List lista = getPruebaManager().findAll();
//		for (Object s:lista){
//			PruebaVO p= (PruebaVO)s;
//			System.out.println("id: " +p.getId());
//			System.out.println("nombre: " +p.getNombre());
//			
//		}
//		PruebaVO vo = new PruebaVO();
//		vo.setId(4);
//		vo.setNombre("alfredo");
//		try{
//			getPruebaManager().save(vo);
//		}catch (Exception e) {
//			System.out.println("Error");
//		}
		FindCuentasClientesForm f = new FindCuentasClientesForm();
//		f.setParametro1("hola");
//		//redirectAttributes.addFlashAttribute("findDerechosForm", f);
		model.addAttribute("findCuentasClientesForm", f);
		return "findCuentas";
    }


//	public PruebaManager getPruebaManager() {
//		return pruebaManager;
//	}
//
//
//	public void setPruebaManager(PruebaManager pruebaManager) {
//		this.pruebaManager = pruebaManager;
//	}
		
}


