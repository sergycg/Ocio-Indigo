package com.onnix.web.forms;

import java.util.Date;

import com.onnix.business.utils.StringUtils;
import com.onnix.business.vo.ClienteVO;
import com.onnix.business.vo.CuentaVO;
import com.onnix.business.vo.ViewCuentasClientesVO;



public class CuentaClienteForm extends OnnixForm{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8480466100033018307L;
	private String idCliente;
	private String idCuenta;
	private String nombre;
	private String apellidos;
	private String direccion;
	private String telefono;
	private String movil;
	private String otroTelefono;
	private String codigoPostal;
	private String observaciones;
	private Integer activo;
	private Float totalEntregado;
	private Float totalComprado;
	private Float resto;
	
	private CompraForm compraForm;
	private EntregaForm entregaForm;

	
	public CuentaClienteForm() {
		super();
	}
	
	public CuentaClienteForm(ViewCuentasClientesVO vo) {
		this.idCliente = vo.getIdCliente().toString();
		this.idCuenta = vo.getIdCuenta().toString();
		this.nombre = vo.getNombre();
		this.apellidos = vo.getApellidos();
		this.direccion = vo.getDireccion();
		this.telefono = vo.getTelefono();
		this.movil = vo.getMovil();
		this.otroTelefono = vo.getOtro();
		this.codigoPostal = vo.getCodPostal();
		this.observaciones = vo.getObservacionesCliente();
		this.activo = vo.getIndActiva();
		this.totalEntregado = vo.getTotalEntregado();
		this.totalComprado = vo.getTotalComprado();
		this.resto = vo.getResto();
	}
	
	public void set(ClienteVO vo) {
		this.idCliente = vo.getIdCliente().toString();
		this.nombre = vo.getNombre();
		this.apellidos = vo.getApellidos();
		this.direccion = vo.getDireccion();
		this.telefono = vo.getTelefono();
		this.movil = vo.getMovil();
		this.otroTelefono = vo.getOtro();
		this.codigoPostal = vo.getCodPostal();
		this.observaciones = vo.getObservacionesCliente();
	}

	public ClienteVO populate (ClienteVO cli_VO){
		cli_VO.setNombre(this.nombre);
		cli_VO.setApellidos(this.apellidos);
		cli_VO.setDireccion(this.direccion);
		cli_VO.setTelefono(this.telefono);
		cli_VO.setMovil(this.movil);
		cli_VO.setOtro(this.otroTelefono);
		cli_VO.setCodPostal(this.codigoPostal);
		cli_VO.setObservacionesCliente(this.observaciones);
		
		CuentaVO cu_VO =  new CuentaVO();
		cu_VO.setCliente(cli_VO);
		cu_VO.setIdCuenta(StringUtils.isNotEmpty(this.idCuenta)?new Long(this.idCuenta):null);
		if (cli_VO.getCuentas()!=null){
			for (CuentaVO c:cli_VO.getCuentas()){
				if (c.equals(cu_VO)){
					cu_VO = c;
					break;
				}
			}
		}
			
		cu_VO.setIndActiva(this.activo);
		cu_VO.setFechaModificacion(new Date());
		if (cu_VO.getFechaAlta()==null)
			cu_VO.setFechaAlta(new Date());
		cli_VO.getCuentas().add(cu_VO);
		return cli_VO;
	}
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getCodigoPostal() {
		return codigoPostal;
	}
	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}
	public String getObservaciones() {
		return observaciones;
	}
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
	public String getMovil() {
		return movil;
	}
	public void setMovil(String movil) {
		this.movil = movil;
	}
	public String getOtroTelefono() {
		return otroTelefono;
	}
	public void setOtroTelefono(String otroTelefono) {
		this.otroTelefono = otroTelefono;
	}
	public Integer getActivo() {
		return activo;
	}
	public void setActivo(Integer activo) {
		this.activo = activo;
	}
	public CompraForm getCompraForm() {
		return compraForm;
	}
	public void setCompraForm(CompraForm compraForm) {
		this.compraForm = compraForm;
	}
	public EntregaForm getEntregaForm() {
		return entregaForm;
	}
	public void setEntregaForm(EntregaForm entregaForm) {
		this.entregaForm = entregaForm;
	}
	public String getIdCuenta() {
		return idCuenta;
	}
	public void setIdCuenta(String idCuenta) {
		this.idCuenta = idCuenta;
	}
	public String getIdCliente() {
		return idCliente;
	}
	public void setIdCliente(String idCliente) {
		this.idCliente = idCliente;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public Float getTotalEntregado() {
		return totalEntregado;
	}

	public void setTotalEntregado(Float totalEntregado) {
		this.totalEntregado = totalEntregado;
	}

	public Float getTotalComprado() {
		return totalComprado;
	}

	public void setTotalComprado(Float totalComprado) {
		this.totalComprado = totalComprado;
	}

	public Float getResto() {
		return resto;
	}

	public void setResto(Float resto) {
		this.resto = resto;
	}

	
	

	
}

