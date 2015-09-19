package com.onnix.web.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.exception.GenericJDBCException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.hibernate4.HibernateJdbcException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.onnix.business.exception.ModelAjaxException;
import com.onnix.business.exception.TokenException;

@ControllerAdvice
public class AControllerAdvice {
	private static final Logger logger = Logger.getLogger(AControllerAdvice.class);
	
	@Autowired
	private ResourceBundleMessageSource messageSource;
	
	@ExceptionHandler(IOException.class)
	  public String handleIOException(IOException ex) {

	    logger.info("handleIOException - Catching: " + ex.getClass().getSimpleName());
	    return "errorView";
	  }
	
	@ExceptionHandler(HibernateJdbcException.class)
	  public String handleHibernateJdbcException(HibernateJdbcException ex) {

	    logger.info("handleHibernateJdbcException - Catching: " + ex.getClass().getSimpleName());
	    logger.error(ex.getCause());
	    logger.error(ex.getLocalizedMessage());
	    logger.error(ex.getMessage());
	    logger.error(ex.getMostSpecificCause());
	    logger.error(ex.getRootCause());
	    logger.error(ex.getSql());
	    logger.error(ex.getSQLException());
	    return "errorView";
	  }
	
	@ExceptionHandler(java.sql.SQLException.class)
	public String handleGenericJDBCException(SQLException ex) {
		 
		logger.info("SQLException - Catching: " + ex.getClass().getSimpleName());	
		logger.error(ex.getCause());
		logger.error(ex.getLocalizedMessage());
		logger.error(ex.getMessage());
		logger.error(ex.getErrorCode());
		logger.error(ex.getSQLState());
		return "errorView";
	}

	@ExceptionHandler(GenericJDBCException.class)
	public String handleGenericJDBCException(GenericJDBCException ex) {
		 
		logger.info("handleGenericJDBCException - Catching: " + ex.getClass().getSimpleName());	
		logger.error(ex.getCause());
		logger.error(ex.getLocalizedMessage());
		logger.error(ex.getMessage());
		logger.error(ex.getErrorCode());
		logger.error(ex.getSQL());
		logger.error(ex.getSQLState());
		logger.error(ex.getSQLException());
		return "errorView";
	}
	
	@ExceptionHandler(DataIntegrityViolationException.class)
	public String dataIntegrityViolationException(DataIntegrityViolationException ex) {
		 
		logger.info("handleGenericJDBCException - Catching: " + ex.getClass().getSimpleName());	
		logger.error(ex.getCause());
		logger.error(ex.getLocalizedMessage());
		logger.error(ex.getMessage());
		logger.error(ex.getMostSpecificCause());		
		return "errorView";
	}
	
	
	@ExceptionHandler(ModelAjaxException.class)
	public @ResponseBody String handleModelAjaxException(ModelAjaxException ex, HttpServletRequest request) {
		 
		logger.info("ModelException - Catching: " + ex.getClass().getSimpleName());	
		logger.error(ex.getCause());
		logger.error(ex.getLocalizedMessage());
		logger.error(ex.getMessage());
		String mensaje = getMessageSource().getMessage(ex.getMsgKey(),null,request.getLocale());
		return mensaje;
	}
	
	@ExceptionHandler(TokenException.class)
	  public String tokenException(TokenException ex) {

	    logger.info("TokenException - Catching: " + ex.getClass().getSimpleName());
	    logger.error(ex.getMessage());
	    return "errorView";
	  }
	
	
//	@ExceptionHandler(ModelException.class)
//	public @ResponseBody String handleModelException(ModelException ex, Model model) {
//		 
//		logger.info("ModelException - Catching: " + ex.getClass().getSimpleName());	
//		logger.error(ex.getCause());
//		logger.error(ex.getLocalizedMessage());
//		logger.error(ex.getMessage());
//		model.addAttribute("messageWarning", getMessageSource().getMessage(ex.getMsgKey(), null, null));
//		
//		return getMessageSource().getMessage(ex.getMsgKey(), null, null);
//	}
	public ResourceBundleMessageSource getMessageSource() {
		return messageSource;
	}

	public void setMessageSource(ResourceBundleMessageSource messageSource) {
		this.messageSource = messageSource;
	}

	
}

