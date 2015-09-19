package peliculas;

import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import java.io.PrintWriter;
import javax.servlet.RequestDispatcher;

import excepciones.PeliculaException;
//import javax.servlet.http.HttpServlet;
import javax.servlet.ServletContext;
import java.sql.SQLException;
import java.util.*;
//import javax.servlet.RequestDispatcher;

/**
 * Servlet implementation class for Servlet: PeliculasServlet
 *
 */
 public class PeliculasServlet extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#HttpServlet()
	 */
	public PeliculasServlet() {
		super();
	}   	
	
	/* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		try
		{
			String accion = request.getParameter("accion");
			if (accion.equals("listarPeliculasTodas"))
				listarPeliculasTodas(request, response);
			else if (accion.equals("listarPeliculasTodas"))
				nueva(request, response);
			else if (accion.equals("nueva"))
				nueva(request, response);
			else if (accion.equals("altaPelicula"))
				altaPelicula(request, response);
			else if (accion.equals("volverAltaPelicula"))
				volverAltaPelicula(request, response);
			else if (accion.equals("consultarPelicula"))
				consultarPelicula(request, response);
			else if (accion.equals("modificarPelicula"))
				modificar(request, response);
			else if (accion.equals("volverModificarPelicula"))
				volverModificarPelicula(request, response);
			else if (accion.equals("confirmarModificarPelicula"))
				modificarPelicula(request, response);
			else if (accion.equals("eliminarPelicula"))
				eliminar(request, response);
			else if (accion.equals("confirmarEliminarPelicula"))
				eliminarPelicula(request, response);
			else if (accion.equals("buscarPeliculas"))
				buscarPeliculas(request, response);
			
		}
		catch (java.lang.ClassNotFoundException e) 
		{
			response.sendRedirect("error.jsp?mensaje=Servicio no disponible");
			System.out.println("Error en clase: "+e);
		}
		catch (java.sql.SQLException ee) 
		{
			response.sendRedirect("error.jsp?mensaje=Error SQL: servicio no disponible");
			System.out.println("Error SQL: "+ee);
		}
		catch (ServletException e) 
		{
			response.sendRedirect("error.jsp?mensaje=Servicio no disponible");
			System.out.println("Error en clase: "+e);
		}
		catch (IOException e) 
		{
			response.sendRedirect("error.jsp?mensaje=Servicio no disponible");
			System.out.println("Error en clase: "+e);
		}
		
	}  
	
	/* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}   	  	    
	
	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void nueva(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			int idcd;
			int iddvd;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			
			Vector vFormatos = gBD.listarFormatosTodos();
			int ref = gBD.ultimaReferenciaPeliculas();
			int refCD = gBD.ultimaReferenciaCDs();
			int refDVD = gBD.ultimaReferenciaDVDs();

			request.setAttribute("listaFormatos", vFormatos);
			request.setAttribute("ultRefCD", String.valueOf(refCD));
			request.setAttribute("ultRefDVD", String.valueOf(refDVD));
			RequestDispatcher rd;
			if (request.getParameter("id_CD")!=null)
			{
				idcd = Integer.valueOf(request.getParameter("id_CD").toString()).intValue();
				rd = request.getRequestDispatcher("altaPelicula001.jsp?referencia=" + ref + "&titulo=&fecha=&num_CDs_DVDs=&origen=&ubicacion=&prestado_a=&id_CD=" + idcd + "&id_DVD=");
			}
			else if (request.getParameter("id_DVD")!=null)
			{
				iddvd = Integer.valueOf(request.getParameter("id_DVD").toString()).intValue();
				rd = request.getRequestDispatcher("altaPelicula001.jsp?referencia=" + ref + "&titulo=&fecha=&num_CDs_DVDs=&origen=&ubicacion=&prestado_a=&id_CD=&id_DVD=" + iddvd);
			}
			else
				rd = request.getRequestDispatcher("altaPelicula001.jsp?referencia=" + ref + "&titulo=&fecha=&num_CDs_DVDs=&origen=&ubicacion=&prestado_a=&id_CD=&id_DVD=");
			
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		//catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
		catch (PeliculaException pe) 
		{
			response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
		}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void listarPeliculasTodas(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			Vector v = null;
			if (request.getParameter("orden")==null)
				v = gBD.listaPeliculasTodasOrderByNumero();
			else if (request.getParameter("orden").equals("titulo"))
				v = gBD.listaPeliculasTodasOrderByTitulo();
			else if (request.getParameter("orden").equals("formato"))
				v = gBD.listaPeliculasTodasOrderByFormato();
			else if (request.getParameter("orden").equals("idcd"))
				v = gBD.listaPeliculasTodasOrderByIdCD();
			else if (request.getParameter("orden").equals("iddvd"))
				v = gBD.listaPeliculasTodasOrderByIdDVD();

			//getServletContext().setAttribute("listaPeliculas", v);
			request.setAttribute("listaPeliculas", v);
			RequestDispatcher rd = request.getRequestDispatcher("/listarPeliculasTodas.jsp");
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
	}
	
	
	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void altaPelicula(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			
			Pelicula p = new Pelicula();
			p.setNumero(Integer.parseInt(request.getParameter("referencia")));
			p.setTitulo(request.getParameter("titulo"));
			p.setFecha(request.getParameter("fecha"));
			p.setNum_CDs_DVDs(request.getParameter("num_CDs_DVDs"));
			p.setOrigen(request.getParameter("origen"));
			p.setUbicacion(request.getParameter("ubicacion"));
			p.setPrestado_a(request.getParameter("prestado_a"));
			p.setFormato(request.getParameter("formato"));

			if ((request.getParameter("id_CD")!=null) && (!request.getParameter("id_CD").equals("")))
				p.setId_CD(Integer.parseInt(request.getParameter("id_CD")));
			else
				p.setId_CD(0);
			
			if ((request.getParameter("id_DVD")!=null) && (!request.getParameter("id_DVD").equals("")))
				p.setId_DVD(Integer.parseInt(request.getParameter("id_DVD")));
			else
				p.setId_DVD(0);

			GestorPeliculasBD gBD = new GestorPeliculasBD();
			try
			{
				gBD.altaPelicula(p);
			}
			catch (PeliculaException pe) 
			{
				response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
			}
			RequestDispatcher rd = request.getRequestDispatcher("/altaPelicula003.jsp");
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void volverAltaPelicula(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			Vector vFormatos = gBD.listarFormatosTodos();
			int refCD = gBD.ultimaReferenciaCDs();
			int refDVD = gBD.ultimaReferenciaDVDs();
			request.setAttribute("listaFormatos", vFormatos);
			request.setAttribute("ultRefCD", String.valueOf(refCD));
			request.setAttribute("ultRefDVD", String.valueOf(refDVD));
			RequestDispatcher rd = request.getRequestDispatcher("altaPelicula001.jsp");
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
		catch (PeliculaException pe) 
		{
			response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
		}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void consultarPelicula(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			int num;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			if ((request.getParameter("num")!=null) && (!request.getParameter("num").equals("")))
			{
				num = Integer.parseInt(request.getParameter("num"));
				Pelicula p = gBD.detallePelicula(num);
				//getServletContext().setAttribute("detallePelicula", p);
				request.setAttribute("detallePelicula", p);
				RequestDispatcher rd = request.getRequestDispatcher("/consultaPelicula.jsp");
				rd.forward(request, response);
			}
			else
				response.sendRedirect("error.jsp?mensaje=Parametros de entradas nulos.");
				
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
	}
	
	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void modificar(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			int num;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			if ((request.getParameter("num")!=null) && (!request.getParameter("num").equals("")))
			{
				num = Integer.parseInt(request.getParameter("num"));
				Pelicula p = gBD.detallePelicula(num);
				//getServletContext().setAttribute("detallePelicula", p);
				request.setAttribute("detallePelicula", p);
				String fec = p.getFecha();
				if (fec==null) 
					fec = "";
				else
					fec = fec.substring(0,10);
				
				String form = p.getFormato();
				if (form==null) form = "";
				
				String nCD = p.getNum_CDs_DVDs();
				if (nCD==null) nCD = "";
				
				String orig = p.getOrigen();
				if (orig==null) orig = "";
				
				String pres = p.getPrestado_a();
				if (pres==null) pres = "";
				
				String tit = p.getTitulo();
				if (tit=="null") tit = "";
				
				String ub = p.getUbicacion();
				if (ub==null) ub = "";
				
				int idCD = p.getId_CD();
				int idDVD = p.getId_DVD();
				String url = "/modificarPelicula001.jsp?referencia=" + num + "&fecha=" + fec + "&formato=" + form + "&num_CDs_DVDs=" + nCD + "&origen=" + orig +
							"&prestado_a=" + pres + "&titulo=" + tit + "&ubicacion=" + ub + "&id_CD=" + idCD + "&id_DVD=" + idDVD;	
				Vector f = gBD.listarFormatosTodos();
				//getServletContext().setAttribute("listaFormatos", f);
				int refCD = gBD.ultimaReferenciaCDs();
				int refDVD = gBD.ultimaReferenciaDVDs();
				request.setAttribute("ultRefCD", String.valueOf(refCD));
				request.setAttribute("ultRefDVD", String.valueOf(refDVD));
				request.setAttribute("listaFormatos", f);
				RequestDispatcher rd = request.getRequestDispatcher(url);
				rd.forward(request, response);
			}
			else
				response.sendRedirect("error.jsp?mensaje=Parametros de entradas nulos.");
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		//catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
		catch (PeliculaException pe) 
		{
			response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
		}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void volverModificarPelicula(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			String url = "/modificarPelicula001.jsp";	
			Vector f = gBD.listarFormatosTodos();
			int refCD = gBD.ultimaReferenciaCDs();
			int refDVD = gBD.ultimaReferenciaDVDs();
			request.setAttribute("ultRefCD", String.valueOf(refCD));
			request.setAttribute("ultRefDVD", String.valueOf(refDVD));
			request.setAttribute("listaFormatos", f);
			RequestDispatcher rd = request.getRequestDispatcher(url);
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		//catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
		catch (PeliculaException pe) 
		{
			response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
		}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void modificarPelicula(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			
			Pelicula p = new Pelicula();
			p.setNumero(Integer.parseInt(request.getParameter("referencia")));
			p.setTitulo(request.getParameter("titulo"));
			p.setFecha(request.getParameter("fecha"));
			p.setNum_CDs_DVDs(request.getParameter("num_CDs_DVDs"));
			p.setOrigen(request.getParameter("origen"));
			p.setUbicacion(request.getParameter("ubicacion"));
			p.setPrestado_a(request.getParameter("prestado_a"));
			p.setFormato(request.getParameter("formato"));

			if ((request.getParameter("id_CD")!=null) && (!request.getParameter("id_CD").equals("")))
				p.setId_CD(Integer.parseInt(request.getParameter("id_CD")));
			else
				p.setId_CD(0);
			
			if ((request.getParameter("id_DVD")!=null) && (!request.getParameter("id_DVD").equals("")))
				p.setId_DVD(Integer.parseInt(request.getParameter("id_DVD")));
			else
				p.setId_DVD(0);

			GestorPeliculasBD gBD = new GestorPeliculasBD();
			try
			{
				gBD.modificarPelicula(p);
			}
			catch (PeliculaException pe) 
			{
				response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
			}
			RequestDispatcher rd = request.getRequestDispatcher("/modificarPelicula003.jsp");
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void eliminar(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			int num;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			if ((request.getParameter("num")!=null) && (!request.getParameter("num").equals("")))
			{
				num = Integer.parseInt(request.getParameter("num"));
				Pelicula p = gBD.detallePelicula(num);
				//getServletContext().setAttribute("detallePelicula", p);
				request.setAttribute("detallePelicula", p);
				RequestDispatcher rd = request.getRequestDispatcher("/eliminarPelicula001.jsp");
				rd.forward(request, response);
			}
			else
				response.sendRedirect("error.jsp?mensaje=Parametros de entradas nulos.");
				
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
	}
	
	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void eliminarPelicula(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			int num;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			if ((request.getParameter("num")!=null) && (!request.getParameter("num").equals("")))
			{
				num = Integer.parseInt(request.getParameter("num"));
				try
				{
					gBD.eliminarPelicula(num);
				}
				catch (PeliculaException pe) 
				{
					response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
				}
				RequestDispatcher rd = request.getRequestDispatcher("/eliminarPelicula002.jsp");
				rd.forward(request, response);
			}
			else
				response.sendRedirect("error.jsp?mensaje=Parametros de entradas nulos.");
				
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void buscarPeliculas(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			Vector v = null;
			String titulo = request.getParameter("tituloBusqueda");
			v = gBD.buscaPeliculasPorTitulo(titulo);

			request.setAttribute("listaPeliculas", v);
			RequestDispatcher rd = request.getRequestDispatcher("/buscarPeliculas002.jsp");
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
	}
	
	
 }