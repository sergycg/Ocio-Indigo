package peliculas;

import java.sql.*;
import java.util.*;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import excepciones.PeliculaException;

public class GestorPeliculasBD {
	
	public GestorPeliculasBD()	{}

	public Vector listaPeliculasTodasOrderByNumero() throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
					"  FROM peliculas ORDER BY Numero";
			
			con = conectar();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			while (rs.next())
			{	
				Pelicula pelicula = new Pelicula(rs);
				vResult.addElement(pelicula);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();
			con.close();
		}

	}
	
	public Vector listaPeliculasTodasOrderByTitulo() throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
					"  FROM peliculas ORDER BY Titulo";
			
			con = conectar();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			while (rs.next())
			{	
				Pelicula pelicula = new Pelicula(rs);
				vResult.addElement(pelicula);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();
			con.close();
		}

	}


	public Vector listaPeliculasTodasOrderByFormato() throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
					"  FROM peliculas ORDER BY Formato";
			
			con = conectar();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			while (rs.next())
			{	
				Pelicula pelicula = new Pelicula(rs);
				vResult.addElement(pelicula);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();
			con.close();
		}

	}
	
	public Vector listaPeliculasTodasOrderByIdCD() throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
					"  FROM peliculas ORDER BY Id_CD";
			
			con = conectar();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			while (rs.next())
			{	
				Pelicula pelicula = new Pelicula(rs);
				vResult.addElement(pelicula);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();
			con.close();
		}

	}
	

	public Vector listaPeliculasTodasOrderByIdDVD() throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
					"  FROM peliculas ORDER BY Id_DVD";
			
			con = conectar();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			while (rs.next())
			{	
				Pelicula pelicula = new Pelicula(rs);
				vResult.addElement(pelicula);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();
			con.close();
		}

	}

	public Vector buscaPeliculasPorTitulo(String titulo) throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
					"  FROM peliculas WHERE Titulo LIKE '%" + titulo + "%' ORDER BY Numero";
			
			con = conectar();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			while (rs.next())
			{	
				Pelicula pelicula = new Pelicula(rs);
				vResult.addElement(pelicula);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();
			con.close();
		}

	}
	
	public int ultimaReferenciaPeliculas() throws SQLException, ClassNotFoundException, PeliculaException
	{

		int referencia = 0;
		Connection con = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT MAX(Numero) AS referencia FROM peliculas";
			
			con = conectar();
			Statement stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			if (rs.next())
			{	
				referencia = rs.getInt("referencia");
				referencia += 1;
			}
			else
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("Error al obtener la última referencia el la tabla PELICULAS.");
				throw pe;
			}
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			con.close();
		}
		return referencia;

	}

	
	public int ultimaReferenciaDVDs() throws SQLException, ClassNotFoundException, PeliculaException
	{

		int referencia = 0;
		Connection con = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT MAX(id_DVD) AS referencia FROM DVDs";
			
			con = conectar();
			Statement stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			if (rs.next())
			{	
				referencia = rs.getInt("referencia");
				referencia += 1;
			}
			else
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("Error al obtener la última referencia el la tabla DVDs.");
				throw pe;
			}
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			con.close();
		}
		return referencia;

	}

	
	public void altaPelicula(Pelicula p) throws SQLException, ClassNotFoundException, PeliculaException
	{
		String fecha="0001-01-01";
		
		try
		{
			if ((p.getFecha()!=null) && (!p.getFecha().equals("")))
				fecha = p.getFecha();
			
/*			String query = "INSERT INTO peliculas (Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD ) " +
					"values (" + p.getNumero() + ",'" + p.getTitulo() + "','" + fecha + "','" + p.getNum_CDs_DVDs() + "','" +
					p.getOrigen() + "','" + p.getUbicacion() + "','" + p.getPrestado_a() + "','" + p.getFormato() + "'," +
					p.getId_DVD() + "," + p.getId_CD() + ")";
*/			
			String query = "INSERT INTO peliculas (Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD ) " +
							"values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
			
			
			Connection con = conectar();
//			Statement stmt = con.createStatement();
//			int resultado = stmt.executeUpdate(query);

			PreparedStatement stmt = con.prepareStatement(query); 
			
			stmt.setInt(1, p.getNumero());
			stmt.setString(2, p.getTitulo());
			stmt.setString(3, fecha);
			stmt.setString(4, p.getNum_CDs_DVDs());
			stmt.setString(5, p.getOrigen());
			stmt.setString(6, p.getUbicacion());
			stmt.setString(7, p.getPrestado_a());
			stmt.setString(8, p.getFormato());
			stmt.setInt(9, p.getId_DVD());
			stmt.setInt(10, p.getId_CD());
			
			int resultado = stmt.executeUpdate();
			
			stmt.close();
			
			con.close();
			if (resultado==0)
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("ERROR: La película '" + p.getTitulo() + "' no pudo darse de alta correctamente.");
				throw pe;
			}
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			System.out.println("Error en clase: "+e);
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			System.out.println("Error SQL: "+ee);
			throw ee;
		}
	}


	public void modificarPelicula(Pelicula p) throws SQLException, ClassNotFoundException, PeliculaException
	{
		String fecha="0001-01-01";
		String titulo="";
		String num_CDs="";
		String origen="";
		String ubicacion="";
		String prestado="";
		String formato="";
		
		try
		{
			if ((p.getFecha()!=null) && (!p.getFecha().equals("")))
				fecha = p.getFecha();
			
			if ((p.getTitulo()!=null) && (!p.getTitulo().equals("")))
				titulo = p.getTitulo();
			
			if ((p.getNum_CDs_DVDs()!=null) && (!p.getNum_CDs_DVDs().equals("")))
				num_CDs = p.getNum_CDs_DVDs();
			
			if ((p.getOrigen()!=null) && (!p.getOrigen().equals("")))
				origen = p.getOrigen();
			
			if ((p.getUbicacion()!=null) && (!p.getUbicacion().equals("")))
				ubicacion = p.getUbicacion();
			
			if ((p.getPrestado_a()!=null) && (!p.getPrestado_a().equals("")))
				prestado = p.getPrestado_a();

			if ((p.getFormato()!=null) && (!p.getFormato().equals("")))
				formato = p.getFormato();

			Connection con = conectar();
			/*
			String query = "UPDATE peliculas SET Numero = " + p.getNumero() + ", Titulo = '" + titulo + "', Fecha = '" + fecha + 
							"', Num_CDs_DVDs = '" + num_CDs + "', Origen = '" + origen + "', Ubicacion = '" + ubicacion + 
							"', Prestado_a = '" + prestado + "', Formato = '" + formato + "', Id_DVD = " + p.getId_DVD() + ", Id_CD = " + p.getId_CD() +
							" WHERE Numero = " + p.getNumero();
			*/

			//Statement stmt = con.createStatement();
			//int resultado = stmt.executeUpdate(query);

			String query = "UPDATE peliculas SET Titulo = ?, Fecha = ?, Num_CDs_DVDs = ?, Origen = ?, Ubicacion = ?, " +
							"Prestado_a = ?, Formato = ?, Id_DVD = ?, Id_CD = ? " +
							"WHERE Numero = ?";

			
			PreparedStatement stmt = con.prepareStatement(query); 
			
			stmt.setString(1, titulo);
			stmt.setString(2, fecha);
			stmt.setString(3, num_CDs);
			stmt.setString(4, origen);
			stmt.setString(5, ubicacion);
			stmt.setString(6, prestado);
			stmt.setString(7, formato);
			stmt.setInt(8, p.getId_DVD());
			stmt.setInt(9, p.getId_CD());
			stmt.setInt(10, p.getNumero());
			
			int resultado = stmt.executeUpdate();
			
			stmt.close();
			con.close();
			if (resultado==0)
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("ERROR: La película '" + p.getTitulo() + "' no pudo modificarse correctamente.");
				throw pe;
			}
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			System.out.println("Error en clase: "+e);
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			System.out.println("Error SQL: "+ee);
			throw ee;
		}
	}
	
	
	public Pelicula detallePelicula(int num) throws SQLException, ClassNotFoundException
	{

		Pelicula pelicula = null;
		Connection con = null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try
		{
			/*String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
					"  FROM peliculas where Numero=" + num;
			*/
			
			String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
							" FROM peliculas where Numero= ?";

			con = conectar();
			//Statement stmt = con.createStatement();
			//rs = stmt.executeQuery(query);
			
			stmt = con.prepareStatement(query); 
			
			stmt.setInt(1, num);
			
			rs = stmt.executeQuery();
			
			if (rs.next())
			{	
				pelicula = new Pelicula(rs);
			}
			return pelicula;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();		
			con.close();
		}

	}
	
	
	public void eliminarPelicula(int num) throws SQLException, ClassNotFoundException, PeliculaException
	{

		Connection con = null;
		PreparedStatement stmt = null;
		try
		{
			String query = "DELETE FROM peliculas where Numero= ?";

			con = conectar();
			stmt = con.prepareStatement(query); 

			stmt.setInt(1, num);
			
			int resultado = stmt.executeUpdate();
			
			if (resultado==0)
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("ERROR: La película número '" + num + "' no pudo eliminarse correctamente.");
				throw pe;
			}
			return;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			stmt.close();		
			con.close();
		}

	}

		
	
	public Vector listarFormatosTodos() throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		ResultSet rs = null;
		try
		{
			
/***********************************************************************************************************/			
		/* CONEXION MYSQL:
		 * 
		 * Guardar el jar (mysql-connector-java-x.x.x-bin.jar) en la carpeta <DIRECTORIO_DE_JAVA>/jre/lib/ext
		 */
		
/*		
			Class.forName("com.mysql.jdbc.Driver");

			Connection conexion = DriverManager.getConnection("jdbc:mysql://localhost/pruebaJava", "root", "admin");

			Statement st = conexion.createStatement();
			ResultSet rs1 = st.executeQuery("select * from pruebaTabla" );
			while (rs1.next())
			{	
				int i = rs1.getInt("id");
				String s = rs1.getString("nombre");
				System.out.println("id: " + i + ", nombre: " + s);
			}
			rs1.close();
			conexion.close();
*/
		
/*******************************************************************************************************************************/			
		/* CONEXION MYSQL CON DATASOURCE:
		 * 
		 * Opcion 1: DataSource para MYSQL para una aplicación
		 * 
		 * 1) El jar mysql-connector-java-x.x.x.jar. Copiar en la ruta /tomcat 6/lib.
		 * 2) Crear el META-INF/context.xml.

				Agregar un archivo en META-INF/context.xml, en donde se definirá los detalles de la conexión.
				
				<Context>
				
				 
				  <Resource name="jdbc/miDb" auth="Container" 
				   type="javax.sql.DataSource"
				   maxActive="50" maxIdle="30" maxWait="10000"
				   username="mysqluser" password="mysqlpassword" 
				   driverClassName="com.mysql.jdbc.Driver"
				   url="jdbc:mysql://localhost:3306/mkyongdb"/>
				
				 
				</Context>
		* 3) Configuración en el web.xml

				En el archivo web.xml de nuestra aplicación, definir nuestro datasource:
				
				
				 <resource-ref>
				 <description>MySQL Datasource </description>
				 <res-ref-name>jdbc/miDb</res-ref-name>
				 <res-type>javax.sql.DataSource</res-type>
				 <res-auth>Container</res-auth>
				  </resource-ref>
		*/
		
		
/*			
			DataSource ds=null;
			try{
				Context ctx = new InitialContext();
				ds = (DataSource)ctx.lookup("java:comp/env/jdbc/miDb");
			} catch (NamingException e) {
				  e.printStackTrace();
			}
			Connection conexion2 = ds.getConnection();
			Statement st = conexion2.createStatement();
			ResultSet rs2 = st.executeQuery("select * from pruebaTabla" );
			while (rs2.next())
			{	
				int i = rs2.getInt("id");
				String s = rs2.getString("nombre");
				System.out.println("id: " + i + ", nombre: " + s);
			}
			rs2.close();
			conexion2.close();
*/		 
/*********************************************************************************************************************************/

			/* CONEXION MYSQL CON DATASOURCE:
			 * 
			 * Opción 2: Un Datasource para varias aplicaciones. Requiere la creacion del Resource en el servidor (server.xml)
			 * 
			 * 1) El jar mysql-connector-java-x.x.x.jar. Copiar en la ruta /tomcat 6/lib.
			 * 2) Tomamos el archivo server.xml y lo abrimos, y agregamos las siguientes lineas dentro del tag <GlobalNamingResources> :
			 
			     <Resource auth="Container" driverClassName="com.mysql.jdbc.Driver" maxActive="100" maxIdle="30" maxWait="10000" name="jdbc/pruebaDB" password="admin" type="javax.sql.DataSource" url="jdbc:mysql://localhost:3306/pruebaJava" username="root"/>

			 * 3) Ahora agregamos la siguiente línea en el archivo context.xml

					<ResourceLink global="jdbc/pruebaDB" name="jdbc/mipruebaDB" type="javax.sql.DataSource"/>
			*/
			
/*			
			DataSource ds2=null;
			try{
				Context ctx = new InitialContext();
				ds2 = (DataSource)ctx.lookup("java:comp/env/jdbc/mipruebaDB");
			} catch (NamingException e) {
				  e.printStackTrace();
			}
			Connection conexion3 = ds2.getConnection();
			Statement st3 = conexion3.createStatement();
			ResultSet rs3 = st3.executeQuery("select * from pruebaTabla" );
			while (rs3.next())
			{	
				int i = rs3.getInt("id");
				String s = rs3.getString("nombre");
				System.out.println("id: " + i + ", nombre: " + s);
			}
			rs3.close();
			conexion3.close();
*/
		
/*********************************************************************************************************************************/
			
			String query = "SELECT id, Formato FROM Formatos ORDER BY id";
			
			con = conectar();
			Statement stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			while (rs.next())
			{	
				Formato formato = new Formato(rs);
				vResult.addElement(formato);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			con.close();
		}

	}

	
	public Vector listarCategoriasTodas() throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT id, Categoria FROM Categorias ORDER BY id";
			
			con = conectar();
			Statement stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			while (rs.next())
			{	
				Categoria categoria = new Categoria(rs);
				vResult.addElement(categoria);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			con.close();
		}

	}
	
	
	
	public Vector detallePeliculasCD(int idCD) throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT Numero, Titulo, Fecha, Num_CDs_DVDs, Origen, Ubicacion, Prestado_a, Formato, Id_DVD, Id_CD" +
					"  FROM peliculas WHERE Id_CD=? ORDER BY Numero";
			
			con = conectar();
			stmt = con.prepareStatement(query); 
			stmt.setInt(1, idCD);
			rs = stmt.executeQuery();
		
			while (rs.next())
			{	
				Pelicula pelicula = new Pelicula(rs);
				vResult.addElement(pelicula);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();		
			con.close();
		}

	}

	/**********************************************************************************************************/
	/* Métodos para la gestion de CDs																		  */
	/**********************************************************************************************************/
		
	public int ultimaReferenciaCDs() throws SQLException, ClassNotFoundException, PeliculaException
	{

		int referencia = 0;
		Connection con = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT MAX(id_CD) AS referencia FROM CDs";
			
			con = conectar();
			Statement stmt = con.createStatement();
			rs = stmt.executeQuery(query);
		
			if (rs.next())
			{	
				referencia = rs.getInt("referencia");
				referencia += 1;
			}
			else
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("Error al obtener la última referencia el la tabla CDs.");
				throw pe;
			}
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			con.close();
		}
		return referencia;

	}
	
	public Vector listaCDsTodos() throws SQLException, ClassNotFoundException
	{

		Vector vResult = new Vector();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try
		{
			String query = "SELECT Id_CD, Titulo, Categoria FROM CDs ORDER BY Id_CD";
				
			con = conectar();
			stmt = con.createStatement();
			rs = stmt.executeQuery(query);
			
			while (rs.next())
			{	
				CD cd = new CD(rs);
				vResult.addElement(cd);
			}
			return vResult;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();
			con.close();
		}
	}


	public CD detalleCD(int idCD) throws SQLException, ClassNotFoundException
	{

		CD cd = null;
		Connection con = null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try
		{
			String query = "SELECT Id_CD, Titulo, Categoria FROM CDs where Id_CD= ?";

			con = conectar();
			stmt = con.prepareStatement(query); 
			stmt.setInt(1, idCD);
			rs = stmt.executeQuery();
			
			if (rs.next())
			{	
				cd = new CD(rs);
			}
			return cd;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			rs.close();
			stmt.close();		
			con.close();
		}
	}
	
	public void altaCD(CD cd) throws SQLException, ClassNotFoundException, PeliculaException
	{
	
		try
		{
			String query = "INSERT INTO CDs (Id_CD, Titulo, Categoria) values (?, ?, ?)"; 
			
			Connection con = conectar();

			PreparedStatement stmt = con.prepareStatement(query); 
			
			stmt.setInt(1, cd.getId_CD());
			stmt.setString(2, cd.getTitulo());
			stmt.setString(3, cd.getCategoria());
			
			int resultado = stmt.executeUpdate();
			
			stmt.close();
			
			con.close();
			if (resultado==0)
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("ERROR: El CD '" + cd.getId_CD() + "' no pudo darse de alta correctamente.");
				throw pe;
			}
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			System.out.println("Error en clase: "+e);
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			System.out.println("Error SQL: "+ee);
			throw ee;
		}
	}
	
	
	public void modificarCD(CD cd) throws SQLException, ClassNotFoundException, PeliculaException
	{
		
		try
		{

			Connection con = conectar();

			String query = "UPDATE CDs SET Titulo = ?, Categoria = ? WHERE Id_CD = ?";

			
			PreparedStatement stmt = con.prepareStatement(query); 
			
			stmt.setString(1, cd.getTitulo());
			stmt.setString(2, cd.getCategoria());
			stmt.setInt(3, cd.getId_CD());
			
			int resultado = stmt.executeUpdate();
			
			stmt.close();
			con.close();
			if (resultado==0)
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("ERROR: El CD '" + cd.getId_CD() + "' no pudo modificarse correctamente.");
				throw pe;
			}
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			System.out.println("Error en clase: "+e);
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			System.out.println("Error SQL: "+ee);
			throw ee;
		}
	}

	public void eliminarCD(int num) throws SQLException, ClassNotFoundException, PeliculaException
	{

		Connection con = null;
		PreparedStatement stmt = null;
		try
		{
			String query = "DELETE FROM CDs where Id_CD= ?";

			con = conectar();
			stmt = con.prepareStatement(query); 

			stmt.setInt(1, num);
			
			int resultado = stmt.executeUpdate();
			
			if (resultado==0)
			{
				PeliculaException pe = new PeliculaException();
				pe.setMensaje("ERROR: El CD número '" + num + "' no pudo eliminarse correctamente.");
				throw pe;
			}
			return;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			throw ee;
		}
		finally
		{
			stmt.close();		
			con.close();
		}

	}
	
	/**********************************************************************************************************/
	/* Método de conexión a la base de datos Peliculas														  */
	/**********************************************************************************************************/
	private Connection conectar() throws SQLException, ClassNotFoundException
	{
		try
		{
			Connection con;
			Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
			String url="jdbc:odbc:peliculas";
//			String url = "jdbc:odbc:;DRIVER=Microsoft Access Driver (*.mdb, *.accdb);DBQ=peliculas";
			con = DriverManager.getConnection(url);
			return con;
		} 
		catch (java.lang.ClassNotFoundException e) 
		{
			System.out.println("Error en clase: "+e);
			throw e;
		}
		catch (java.sql.SQLException ee) 
		{
			System.out.println("Error SQL: "+ee);
			throw ee;
		}
	}
	
	
}
