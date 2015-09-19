package peliculas;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Categoria {
	private int id;
	private String categoria;

	
	public Categoria() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Categoria (ResultSet rs) throws SQLException
	{
		try
		{
			this.setId(rs.getInt("id"));
			this.setCategoria(rs.getString("Categoria"));
		}
		catch (SQLException e)
		{
			throw e;
		}
	
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getCategoria() {
		return categoria;
	}


	public void setCategoria(String categoria) {
		this.categoria = categoria;
	} 
}
