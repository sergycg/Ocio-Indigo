/**
 * 
 */
package com.first.backingbeans;

import java.sql.SQLException;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

import org.springframework.beans.factory.annotation.Autowired;

import com.prueba.manager.PruebaManager;
import com.prueba.vo.PruebaVO;

/**
 * @author Pawel
 *
 */
//@ManagedBean(name="welcomeBean")
//@RequestScoped
public class WelcomeBean {
	
//	@Autowired
	private PruebaManager pruebaManager;
	
	
	public String sayHello() throws SQLException, ClassNotFoundException{

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
		System.out.println("probando..");
		List lista = getPruebaManager().findAll();
		for (Object s:lista){
			PruebaVO p= (PruebaVO)s;
			System.out.println("id: " +p.getId());
			System.out.println("nombre: " +p.getNombre());
			
		}
		PruebaVO vo = new PruebaVO();
		vo.setId(4);
		vo.setNombre("julian");
		try{
			getPruebaManager().save(vo);
		}catch (Exception e) {
			System.out.println("Error");
		}
		return "message.xhtml";
	}


	public PruebaManager getPruebaManager() {
		return pruebaManager;
	}


	public void setPruebaManager(PruebaManager pruebaManager) {
		this.pruebaManager = pruebaManager;
	}


	

}
