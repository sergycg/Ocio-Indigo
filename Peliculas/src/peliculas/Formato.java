package peliculas;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Formato {

	private int id;
	private String formato;
	
	public Formato() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Formato (ResultSet rs) throws SQLException
	{
		try
		{
			this.setId(rs.getInt("id"));
			this.setFormato(rs.getString("Formato"));
		}
		catch (SQLException e)
		{
			throw e;
		}
	
	} 

	public int getId() 
	{
		return id;
	}
	public void setId(int id) 
	{
		this.id = id;
	}
	public String getFormato() 
	{
		return formato;
	}
	public void setFormato(String formato) 
	{
		this.formato = formato;
	}
}
