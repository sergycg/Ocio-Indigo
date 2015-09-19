package com.prueba.mvc.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.prueba.mvc.forms.FindDerechosForm;

@Controller
//@SessionAttributes("findDerechosForm")
public class FindDerechosController {

	@RequestMapping(value="/findDerechos",method = RequestMethod.POST)
    public String helloWorld(HttpServletRequest request, @ModelAttribute("findDerechosForm")  FindDerechosForm formulario, final RedirectAttributes redirectAttributes)  {
		//Ejecuta el GarbageCollection 
		/*Object obj = new Object();
	     WeakReference ref = new WeakReference<Object>(obj);
	     obj = null;
	     while(ref.get() != null) {
	       System.gc();
	     }*/

		return "Inicio";
    }
	
}


