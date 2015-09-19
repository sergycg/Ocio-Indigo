package peliculas;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CD {

	int id_CD;
	String titulo;
	String categoria;
	
	public CD() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CD (ResultSet rs) throws SQLException
	{
		try
		{
			this.setId_CD(rs.getInt("Id_CD"));
			this.setTitulo(rs.getString("Titulo"));
			this.setCategoria(rs.getString("Categoria"));
		}
		catch (SQLException e)
		{
			throw e;
		}
	
	}
	public int getId_CD() {
		return id_CD;
	}
	public void setId_CD(int id_CD) {
		this.id_CD = id_CD;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	} 
	

}
