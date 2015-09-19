package peliculas;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Pelicula {

	private int numero;
	private String titulo;
	private String fecha;
	private String num_CDs_DVDs;
	private String origen;
	private String ubicacion;
	private String prestado_a;
	private String formato;
	private int id_DVD;
	private int id_CD;

	public Pelicula ()
	{
	}
	public Pelicula (ResultSet rs) throws SQLException
	{
		try
		{
			this.setNumero(rs.getInt("Numero"));
			this.setTitulo(rs.getString("Titulo"));
			this.setFecha(rs.getString("Fecha"));
			this.setNum_CDs_DVDs(rs.getString("Num_CDs_DVDs"));
			this.setOrigen(rs.getString("Origen"));
			this.setUbicacion(rs.getString("Ubicacion"));
			this.setPrestado_a(rs.getString("Prestado_a"));
			this.setFormato(rs.getString("Formato"));
			this.setId_DVD(rs.getInt("Id_DVD"));
			this.setId_CD(rs.getInt("Id_CD"));
		}
		catch (SQLException e)
		{
			throw e;
		}
	
	}
	/**
	 * @return the numero
	 */
	public int getNumero() {
		return numero;
	}
	/**
	 * @param numero the numero to set
	 */
	public void setNumero(int numero) {
		this.numero = numero;
	}
	/**
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}
	/**
	 * @param titulo the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	/**
	 * @return the fecha
	 */
	public String getFecha() {
		return fecha;
	}
	/**
	 * @param fecha the fecha to set
	 */
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	/**
	 * @return the num_CDs_DVDs
	 */
	public String getNum_CDs_DVDs() {
		return num_CDs_DVDs;
	}
	/**
	 * @param num_CDs_DVDs the num_CDs_DVDs to set
	 */
	public void setNum_CDs_DVDs(String num_CDs_DVDs) {
		this.num_CDs_DVDs = num_CDs_DVDs;
	}
	/**
	 * @return the origen
	 */
	public String getOrigen() {
		return origen;
	}
	/**
	 * @param origen the origen to set
	 */
	public void setOrigen(String origen) {
		this.origen = origen;
	}
	/**
	 * @return the ubicacion
	 */
	public String getUbicacion() {
		return ubicacion;
	}
	/**
	 * @param ubicacion the ubicacion to set
	 */
	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}
	/**
	 * @return the prestado_a
	 */
	public String getPrestado_a() {
		return prestado_a;
	}
	/**
	 * @param prestado_a the prestado_a to set
	 */
	public void setPrestado_a(String prestado_a) {
		this.prestado_a = prestado_a;
	}
	/**
	 * @return the formato
	 */
	public String getFormato() {
		return formato;
	}
	/**
	 * @param formato the formato to set
	 */
	public void setFormato(String formato) {
		this.formato = formato;
	}
	/**
	 * @return the id_DVD
	 */
	public int getId_DVD() {
		return id_DVD;
	}
	/**
	 * @param id_DVD the id_DVD to set
	 */
	public void setId_DVD(int id_DVD) {
		this.id_DVD = id_DVD;
	}
	/**
	 * @return the id_CD
	 */
	public int getId_CD() {
		return id_CD;
	}
	/**
	 * @param id_CD the id_CD to set
	 */
	public void setId_CD(int id_CD) {
		this.id_CD = id_CD;
	}
}
