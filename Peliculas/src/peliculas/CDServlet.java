package peliculas;

import java.io.IOException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import excepciones.PeliculaException;

/**
 * Servlet implementation class for Servlet: CDServlet
 *
 */
 public class CDServlet extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {
   static final long serialVersionUID = 1L;
   
    /* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#HttpServlet()
	 */
	public CDServlet() {
		super();
	}   	
	
	/* (non-Java-doc)
	 * @see javax.servlet.http.HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		// TODO Auto-generated method stub
		try
		{
			String accion = request.getParameter("accion");
			if (accion.equals("listarCDsTodos"))
				listarCDsTodos(request, response);
			else if (accion.equals("listarPeliculasExistentes"))
				listarPeliculasExistentes(request, response);
			else if (accion.equals("anadirPeliculaExistente"))
				anadirPeliculaExistente(request, response);
			else if (accion.equals("nuevoCD"))
				nuevoCD(request, response);
			else if (accion.equals("continuarNuevoCD"))
				continuarNuevoCD(request, response);
			else if (accion.equals("volverAltaCD"))
				volverAltaCD(request, response);
			else if (accion.equals("confirmarAltaCD"))
				confirmarAltaCD(request, response);
			else if (accion.equals("cancelarAltaCD"))
				cancelarAltaModiCD(request, response);
			else if (accion.equals("cancelarModiCD"))
				cancelarAltaModiCD(request, response);
			else if (accion.equals("consultarCD"))
				consultarCD(request, response);
			else if (accion.equals("modificarCD"))
				modificarCD(request, response);
			else if (accion.equals("continuarModificarCD"))
				continuarModificarCD(request, response);
			else if (accion.equals("confirmarModificarCD"))
				confirmarModificarCD(request, response);
			else if (accion.equals("volverModificarCD"))
				volverModificarCD(request, response);
			else if (accion.equals("eliminarCD"))
				eliminarCD(request, response);
			else if (accion.equals("confirmarEliminarCD"))
				confirmarEliminarCD(request, response);
/*			else if (accion.equals("volverModificarPelicula"))
				volverModificarPelicula(request, response);
			else if (accion.equals("confirmarModificarPelicula"))
				modificarPelicula(request, response);
			else if (accion.equals("eliminarPelicula"))
				eliminar(request, response);
			else if (accion.equals("confirmarEliminarPelicula"))
				eliminarPelicula(request, response);
			else if (accion.equals("buscarPeliculas"))
				buscarPeliculas(request, response);
*/			
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		// TODO Auto-generated method stub
		doGet(request, response);
	}   
	
	
	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void listarCDsTodos(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			Vector v = null;
			if (request.getParameter("orden")==null)
				v = gBD.listaCDsTodos();
			
			request.setAttribute("listaCDs", v);
			RequestDispatcher rd = request.getRequestDispatcher("/listarCDsTodos.jsp");
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
	private void consultarCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			int num;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			if ((request.getParameter("num")!=null) && (!request.getParameter("num").equals("")))
			{
				num = Integer.parseInt(request.getParameter("num"));
				CD cd = gBD.detalleCD(num);
				Vector v = gBD.detallePeliculasCD(num);
				request.setAttribute("detalleCD", cd);
				request.setAttribute("detallePeliculas", v);
				RequestDispatcher rd = request.getRequestDispatcher("/consultaCD.jsp");
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
	private void nuevoCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			Vector vFormatos = gBD.listarFormatosTodos();
			Vector vCategorias = gBD.listarCategoriasTodas();
			
			int ref = gBD.ultimaReferenciaPeliculas();
			int refCD = gBD.ultimaReferenciaCDs();
			int refDVD = gBD.ultimaReferenciaDVDs();

			request.getSession().setAttribute("listaPeliculasCD", null);
			request.getSession().setAttribute("detalleCD", null);
			request.getSession().setAttribute("listaFormatos", vFormatos);
			request.getSession().setAttribute("listaCategorias", vCategorias);
			request.getSession().setAttribute("ultimaRefPelicula", String.valueOf(ref));
			request.getSession().setAttribute("ultimaRefCD", String.valueOf(refCD));
			request.getSession().setAttribute("ultimaRefDVD", String.valueOf(refDVD));
			
			RequestDispatcher rd = request.getRequestDispatcher("altamodiCD001.jsp?orig=altaCD");
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
	private void continuarNuevoCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			GestorPeliculasBD gBD = new GestorPeliculasBD();

			CD cd = (CD) request.getSession().getAttribute("detalleCD");
			if (cd==null)
				cd = new CD();

			int i = Integer.valueOf(request.getParameter("idCD").toString()).intValue();
			cd.setId_CD(i);
			cd.setTitulo(request.getParameter("titulo").toString());
			cd.setCategoria(request.getParameter("categoria").toString());

			Vector vPeliculasCD = gBD.detallePeliculasCD(i);
			
			request.getSession().setAttribute("listaPeliculasCD", vPeliculasCD);
			request.getSession().setAttribute("detalleCD", cd);

			RequestDispatcher rd = request.getRequestDispatcher("altamodiCD002.jsp");
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (IOException e) {throw e;}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void volverAltaCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			GestorPeliculasBD gBD = new GestorPeliculasBD();

			CD cd = (CD) request.getSession().getAttribute("detalleCD");
			int i = cd.getId_CD();

			Vector vPeliculasCD = gBD.detallePeliculasCD(i);
			
			request.getSession().setAttribute("listaPeliculasCD", vPeliculasCD);

			RequestDispatcher rd = request.getRequestDispatcher("altamodiCD002.jsp");
			rd.forward(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (IOException e) {throw e;}
	}

	
	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void confirmarAltaCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			
			CD cd = (CD)request.getSession().getAttribute("detalleCD");
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			try
			{
				gBD.altaCD(cd);
			}
			catch (PeliculaException pe) 
			{
				response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
			}
			RequestDispatcher rd = request.getRequestDispatcher("/altamodiCD004.jsp");
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
	private void modificarCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			int num;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			
			if ((request.getParameter("num")!=null) && (!request.getParameter("num").equals("")))
			{
				num = Integer.parseInt(request.getParameter("num"));

				CD cd = gBD.detalleCD(num);
				Vector v = gBD.detallePeliculasCD(num);
				Vector vFormatos = gBD.listarFormatosTodos();
				Vector vCategorias = gBD.listarCategoriasTodas();
				int ref = gBD.ultimaReferenciaPeliculas();
				int refCD = gBD.ultimaReferenciaCDs();
				int refDVD = gBD.ultimaReferenciaDVDs();

				request.getSession().setAttribute("detalleCD", cd);
				request.getSession().setAttribute("listaPeliculasCD", v);
				request.getSession().setAttribute("listaFormatos", vFormatos);
				request.getSession().setAttribute("listaCategorias", vCategorias);
				request.getSession().setAttribute("ultimaRefPelicula", String.valueOf(ref));
				request.getSession().setAttribute("ultimaRefCD", String.valueOf(refCD));
				request.getSession().setAttribute("ultimaRefDVD", String.valueOf(refDVD));
				
				RequestDispatcher rd = request.getRequestDispatcher("altamodiCD001.jsp");
				rd.forward(request, response);
			}
			else
				response.sendRedirect("error.jsp?mensaje=Parametros de entradas nulos.");

			
			
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
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
	private void continuarModificarCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			continuarNuevoCD(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (IOException e) {throw e;}
	}

	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void volverModificarCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			volverAltaCD(request, response);
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (IOException e) {throw e;}
	}

	
	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void confirmarModificarCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			
			CD cd = (CD)request.getSession().getAttribute("detalleCD");
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			try
			{
				gBD.modificarCD(cd);
			}
			catch (PeliculaException pe) 
			{
				response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
			}
			RequestDispatcher rd = request.getRequestDispatcher("/altamodiCD004.jsp");
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
	private void eliminarCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			int num;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			if ((request.getParameter("num")!=null) && (!request.getParameter("num").equals("")))
			{
				num = Integer.parseInt(request.getParameter("num"));
				CD cd = gBD.detalleCD(num);
				Vector v = gBD.detallePeliculasCD(num);
				request.setAttribute("detalleCD", cd);
				request.setAttribute("detallePeliculas", v);
				RequestDispatcher rd = request.getRequestDispatcher("/eliminarCD001.jsp");
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
	private void confirmarEliminarCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
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
					gBD.eliminarCD(num);
				}
				catch (PeliculaException pe) 
				{
					response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
				}
				RequestDispatcher rd = request.getRequestDispatcher("/eliminarCD002.jsp");
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
	private void cancelarAltaModiCD(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			
			request.getSession().removeAttribute("detalleCD");
			request.getSession().removeAttribute("listaPeliculasCD");
			request.getSession().removeAttribute("listaFormatos");
			request.getSession().removeAttribute("listaCategorias");
			request.getSession().removeAttribute("ultimaRefPelicula");
			request.getSession().removeAttribute("ultimaRefCD");
			request.getSession().removeAttribute("ultimaRefDVD");

			response.sendRedirect("En_construccion_Promocion.html");
		}
		catch (IOException e) {throw e;}
	}
	/****************************************************************************************************************/
	/*																												*/
	/*																												*/
	/*																												*/
	/*																												*/
	/****************************************************************************************************************/
	private void listarPeliculasExistentes(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			Vector v = null;
			int numCD = 0;
			int numDVD = 0;
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
			
			try
			{
				numCD = Integer.parseInt(request.getParameter("id_CD"));
				numDVD = Integer.parseInt(request.getParameter("id_DVD"));
			}
			catch (NumberFormatException e) {}
			
			request.setAttribute("listaPeliculas", v);
			RequestDispatcher rd = request.getRequestDispatcher("/listarPeliculasExistentes.jsp?id_CD="+numCD+"&id_DVD="+numDVD+"&orig="+request.getParameter("orig"));
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
	private void anadirPeliculaExistente(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException 
	{
		try
		{
			
			int num;
			GestorPeliculasBD gBD = new GestorPeliculasBD();
			if ((request.getParameter("num")!=null) && (!request.getParameter("num").equals("")))
			{
				num = Integer.parseInt(request.getParameter("num"));
				Pelicula p = gBD.detallePelicula(num);
				p.setId_CD(Integer.parseInt(request.getParameter("id_CD")));
				gBD.modificarPelicula(p);
				Vector vPeliculasCD = gBD.detallePeliculasCD(Integer.parseInt(request.getParameter("id_CD")));
				request.getSession().setAttribute("listaPeliculasCD", vPeliculasCD);

				RequestDispatcher rd = request.getRequestDispatcher("altamodiCD002.jsp");
				rd.forward(request, response);
			}
			else
				response.sendRedirect("error.jsp?mensaje=Parametros de entradas nulos.");
		}
		catch (PeliculaException pe) 
		{
			response.sendRedirect("error.jsp?mensaje=" + URLEncoder.encode(pe.getMensaje()));
		}
		catch (ClassNotFoundException e) {throw e;}
		catch (SQLException e) 	{throw e;}
		catch (ServletException e) {throw e;}
		catch (IOException e) {throw e;}
		catch (NumberFormatException e) {throw e;}
	}

}