package com.onnix.business.utils;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class CalendarUtils {

public static final SimpleDateFormat SHORT_DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
	
	public static final SimpleDateFormat LONG_DATE_HOUR_FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	public static final SimpleDateFormat SHORT_DATE_HOUR_FORMAT = new SimpleDateFormat("dd/MM/yyyy HH:mm");
	
	public static final SimpleDateFormat SHORT_HOUR_DATE_FORMAT_AM_PM = new SimpleDateFormat("hh:mm a");
	public static final SimpleDateFormat SHORT_HOUR_DATE_FORMAT_24H = new SimpleDateFormat("HH:mm");
	
	public static final SimpleDateFormat LONG_HOUR_DATE_FORMAT_AM_PM = new SimpleDateFormat("hh:mm:ss a");
	public static final SimpleDateFormat LONG_HOUR_DATE_FORMAT_24H = new SimpleDateFormat("HH:mm:ss");
	
	public static final SimpleDateFormat DATE_FORMAT_ISO = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static final SimpleDateFormat SHORT_DATE_FORMAT_ISO = new SimpleDateFormat("yyyy-MM-dd");
	/********************************/
	
	
	/**
	 * Convierte la fecha (String) a un Date, con el formato indicado 
	 * @param date
	 * @param formato
	 * @return Date
	 * @throws ParseException
	 */
	
	public static Date getDateFromString(String date, SimpleDateFormat formato) throws ParseException {		
		if (StringUtils.isEmpty(date)) return null;
		return new Date(formato.parse(date).getTime());
	}
	
	/**
	 * Convierte la fecha (Date) a un String, con el formato indicado
	 * @param date -- fecha de tipo Date
	 * @param formato -- formato de salida que se quiere
	 * @return String
	 */
	public static String getFormatDate(Date date, SimpleDateFormat formato) {
		return date == null ? null:formato.format(date);
	}
	
	
	/**
	 * Devuelve la (Date)fecha restandole o sumandole la cantidad de horas 
	 * @param initialDate
	 * @param hours
	 * @return Date
	 * @throws ParseException
	 */
	public static Date getDateSumHour(Date initialDate, int hours) throws ParseException{
	    
		Calendar resultDate = Calendar.getInstance();
		resultDate.setTime(initialDate);
		resultDate.add(Calendar.HOUR_OF_DAY, hours);
		
		return resultDate.getTime();
	}
	/**
	 * Devuelve la (Date)fecha restandole o sumandole la cantidad de minutos 
	 * 
	 * @param initialDate
	 * @param minutes
	 * @return Date
	 * @throws ParseException
	 */
	public static Date getDateSumMinutes(Date initialDate, int minutes) {
	
	    Calendar resultDate = Calendar.getInstance();
	    resultDate.setTime(initialDate);
	    resultDate.add(Calendar.MINUTE, minutes);
	    
	    return resultDate.getTime();
	}
	
	/**
	 * Devuelve la (Date)fecha restandole o sumandole la cantidad de segundos 
	 * 
	 * @param initialDate
	 * @param minutes
	 * @return Date
	 * @throws ParseException
	 */
	public static Date getDateSumSeconds(Date initialDate, int seconds) {
	
	    Calendar resultDate = Calendar.getInstance();
	    resultDate.setTime(initialDate);
	    resultDate.add(Calendar.SECOND, seconds);
	    
	    return resultDate.getTime();
	}
	

	
	/**
	 * Devuelve la fecha con el último día del mes
	 * 
	 * @param mes
	 * @param anno
	 * @return
	 */
	public final static long getLastDayOfMonth(int month, int year) {
		int firstDay = 1;

		GregorianCalendar gc = new GregorianCalendar(year, month-1, firstDay);
		gc.set(Calendar.DAY_OF_MONTH, getLastDay(month, year));

		return gc.getTimeInMillis();
	}


	/**
	 * Calcula el dÃ­a del mes de una fecha
	 * 
	 * @param date
	 * @return
	 */
	public static int getDayOfWeek(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);

		return calendar.get(Calendar.DAY_OF_WEEK);
	}
	
	
	
	public final static int getLastDay(int month, int year) {
		int firstDay = 1;

		GregorianCalendar gc = new GregorianCalendar(year, month-1, firstDay);
		return gc.getActualMaximum(Calendar.DAY_OF_MONTH);
	}
	
	/**
	 * @return Obtiene la fecha del servidor en formato
	 * que le pasemos
	 */
	public static String getCurrentDate(SimpleDateFormat formato) {

		Date currentTime = new Date();
		String fsistem = formato.format(currentTime);

		return fsistem;
	}	
	
	
	public static String getNameDayOfWeek(Date date) {
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int dia = calendar.get(Calendar.DAY_OF_WEEK);
		String name = "";
		 
	    
		switch (dia) {
		case Calendar.SUNDAY:			
			name ="D";
			break;
		case Calendar.MONDAY:
			name ="L";
			break;
		case Calendar.TUESDAY:
			name ="M";
			break;
		case Calendar.WEDNESDAY:
			name ="X";
			break;
		case Calendar.THURSDAY:
			name ="J";
			break;
		case Calendar.FRIDAY:
			name ="V";
			break;
		case Calendar.SATURDAY:
			name ="S";
			break;
			
		}
		
		return name;
	}
	
	/**********************************************************/
	
	/**
	 * 
	 * @param fecha_inicial
	 * @param fecha_final
	 * @param lista_dias
	 * @return
	 * @throws ParseException
	 */
	public int obtenerDias(Date fecha_inicial, Date fecha_final) {
		int numero = 0;
		
		Calendar fecha_inicio = Calendar.getInstance();
		fecha_inicio.setTime(fecha_inicial);
		
		Calendar fecha_fin = Calendar.getInstance();
		fecha_fin.setTime(fecha_final);
		
		while (fecha_inicio.getTimeInMillis()<fecha_fin.getTimeInMillis()){
			fecha_inicio.add(Calendar.DAY_OF_MONTH, 1);
			numero++;
		}
		
		
		return numero;
	}
	
	/**
	 * 
	 * @param fecha_inicial
	 * @param fecha_final
	 * @param lista_dias
	 * @return
	 * @throws ParseException
	 */
	public int getMinutesBetweenDates(Date fecha_inicial, Date fecha_final) {
		int numero = 0;
		
		Calendar fecha_inicio = Calendar.getInstance();
		fecha_inicio.setTime(fecha_inicial);
		
		Calendar fecha_fin = Calendar.getInstance();
		fecha_fin.setTime(fecha_final);
		
		while (fecha_inicio.getTimeInMillis()<fecha_fin.getTimeInMillis()){
			fecha_inicio.add(Calendar.MINUTE, 1);
			numero++;
		}
		
		
		return numero;
	}
	
	/**
	 * 
	 * @param fecha_inicial
	 * @param fecha_final
	 * @param lista_dias
	 * @return
	 * @throws ParseException
	 */
	public int getMinutesBetweenDates(String date1, String date2) throws ParseException{
		int numero = 0;
		Date fecha_inicial = new java.util.Date(SHORT_DATE_HOUR_FORMAT.parse(date1).getTime());
		Date fecha_final = new java.util.Date(SHORT_DATE_HOUR_FORMAT.parse(date2).getTime());
		
		getMinutesBetweenDates(fecha_inicial, fecha_final);
		
		
		return numero;
	}

	
	/**
	 * Devuelve la fecha restandole o sumandole  la cantidad de dias 
	 * 
	 * @param date1
	 * @param days
	 * @return
	 * @throws ParseException
	 */
	public static Date getDateSumDay(Date date, int days) {
		
		Calendar fecha_inicio = Calendar.getInstance();
		fecha_inicio.setTime(date);		
		fecha_inicio.add(Calendar.DAY_OF_MONTH, days);

		return fecha_inicio.getTime();
	}



	/**
	 * Devuelve la fecha restandole o sumandole  la cantidad de dias 
	 * 
	 * @param date1 -- fecha a la que se le va a sumar 
	 * @param dias -- cantidad de dÃ­as a sumar o restar
	 * @param formato -- formato en que viene date1
	 * @return
	 * @throws ParseException
	 */
	public String obtenerFechaDia(String date1, int dias, SimpleDateFormat formato) throws ParseException{
		Date fecha_inicial = new java.util.Date(formato.parse(date1).getTime());
		
		Calendar fecha_inicio = Calendar.getInstance();
		fecha_inicio.setTime(fecha_inicial);
		
		fecha_inicio.add(Calendar.DAY_OF_MONTH, dias);

		return formato.format(fecha_inicio.getTime());
	}
	
	/**
	 * 
	 * @param fecha_inicial
	 * @param fecha_final
	 * @param lista_dias
	 * @return
	 * @throws ParseException
	 */
	public static ArrayList obtenerSecuenciaFechas(String date1, String date2, ArrayList listaDias) throws ParseException{
		
		ArrayList lista = new ArrayList();
		Date fechaInicial = new Date(SHORT_DATE_FORMAT.parse(date1).getTime());
		Date fechaFinal = new Date(SHORT_DATE_FORMAT.parse(date2).getTime());
		
		Calendar fechaInicio = Calendar.getInstance();
		fechaInicio.setTime(fechaInicial);
		
		Calendar fechaFin = Calendar.getInstance();
		fechaFin.setTime(fechaFinal);
		
		while (fechaInicio.getTimeInMillis()<=fechaFin.getTimeInMillis()){
			int diaDeLaSemana = fechaInicio.get(Calendar.DAY_OF_WEEK);
			if (listaDias.contains((Object)String.valueOf(diaDeLaSemana))){
				lista.add(SHORT_DATE_FORMAT.format(fechaInicio.getTime()));
			}
			fechaInicio.add(Calendar.DAY_OF_MONTH, 1);
		}
		
		
		return lista;
	}
	
	/**
	 * A partir de una fecha devuelve el día correspondiente en que queremos que empice 
	 * ejemplo jueves 20 y pedimos que empiece en lunes, devuelve el lunes 17
	 * 
	 * @param date 
	 * @param fistDay Calendar.MONDAY, Calendar.TUESDAY...
	 * @return
	 */
	public static Date getFirstDayOfThisWeek(Date date, int fistDay) {
		
		Calendar initialDate = Calendar.getInstance();
		initialDate.setTime(date);
		
	    while (initialDate.get(Calendar.DAY_OF_WEEK) != fistDay) {  
	    	initialDate.add(Calendar.DATE, -1);  
	    }
		
		return initialDate.getTime();
	}
	
	/**
	 * 
	 * @param fecha_inicial
	 * @param fecha_final
	 * @param lista_dias
	 * @return
	 * @throws ParseException
	 */
	public String obtenerFechaDestino(String hora1, String hora2, String fechaInicio) throws ParseException{
		
		hora1 = hora1+" "+obtenerAMPM(hora1);
		hora2 = hora2+" "+obtenerAMPM(hora2);
		
		Date hora_inicial = new java.util.Date(SHORT_DATE_HOUR_FORMAT.parse(hora1).getTime());
		Date hora_final = new java.util.Date(SHORT_DATE_HOUR_FORMAT.parse(hora2).getTime());
		
		Calendar hora_inicio = Calendar.getInstance();
		hora_inicio.setTime(hora_inicial);
		
		Calendar hora_fin = Calendar.getInstance();
		hora_fin.setTime(hora_final);
		
		if (hora_inicio.getTimeInMillis()<hora_fin.getTimeInMillis()){
			return fechaInicio;
		}else{
			Date fecha_inicial = new java.util.Date(SHORT_DATE_FORMAT.parse(fechaInicio).getTime());
			Calendar fecha_inicio = Calendar.getInstance();
			fecha_inicio.setTime(fecha_inicial);
			fecha_inicio.add(Calendar.DAY_OF_MONTH, 1);
			return SHORT_DATE_FORMAT.format(fecha_inicio.getTime());
		}
	}
	
	/**
	 * 
	 * @param hora
	 * @return
	 */
	private String obtenerAMPM(String hora){
		String result = "AM";
		hora = hora.substring(0,2);
		if (Integer.parseInt(hora)>=12){
			result = "PM";
		}
		
		return result;
	}
	
	
	/**
	 * Compara dos fechas de tipo Date. No tiene en cuenta horas, minutos y sengundos
	 * @param date1
	 * @param date2
	 * @return Devuelve -1 si date1 < date2, 0 si date1 = date2, 1 si date1 > fecha2
	 */
	private static int compareDates(Date date1, Date date2)
	{
		GregorianCalendar calendar1 = new GregorianCalendar();
		calendar1.setTime(date1);
		GregorianCalendar calendar2 = new GregorianCalendar();
		calendar2.setTime(date2);

		int anio1 = calendar1.get(GregorianCalendar.YEAR);
		int anio2 = calendar2.get(GregorianCalendar.YEAR);
		int mes1 = calendar1.get(GregorianCalendar.MONTH);
		int mes2 = calendar2.get(GregorianCalendar.MONTH);
		int dia1 = calendar1.get(GregorianCalendar.DATE);
		int dia2 = calendar2.get(GregorianCalendar.DATE);

		if (anio1 > anio2){
			return 1;
		}
		else if (anio1 < anio2){
			return -1;
		}

		if (mes1 > mes2){
			return 1;
		}
		else if (mes1 < mes2){
			return -1;
		}

		if (dia1 > dia2){
			return 1;
		}
		else if (dia1 < dia2){
			return -1;
		}

		return 0;
	}
	
	
	/**
	 * Comprueba si una fecha es mayor a otra. No tiene en cuenta horas, minutos y sengundos
	 * @param date1
	 * @param date2
	 * @return true si date1 > date2, false en caso contrario
	 */
	public static boolean isGreater(Date date1, Date date2)
	{
		if(compareDates(date1, date2) == 1 ){
			return true;
		}
		return false;
	}


	/**
	 * Comprueba si una fecha es menor a otra. No tiene en cuenta horas, minutos y sengundos
	 * @param date1
	 * @param date2
	 * @return true si date1 < date2, false en caso contrario
	 */
	public static boolean isLower(Date date1, Date date2){
		if(compareDates(date1, date2) == -1 ){
			return true;
		}
		return false;
	}

	/**
	 * Comprueba si dos fechas son iguales. No tiene en cuenta horas, minutos y sengundos
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static boolean isEqual(Date date1, Date date2){
		if(compareDates(date1, date2) == 0 ){
			return true;
		}
		return false;
	}

	/**
	 * Comprueba si una fecha es mayor o igual que otra. No tiene en cuenta horas, minutos y sengundos
	 * @param date1
	 * @param date2
	 * @return true si date1 >= date2, false en caso contrario
	 */
	public static boolean isEqualOrGreater(Date date1, Date date2){
		if(compareDates(date1, date2) >= 0 ){
			return true;
		}
		return false;
	}

	/**
	 * Comprueba si una fecha es menor o igual que otra. No tiene en cuenta horas, minutos y sengundos
	 * @param date1
	 * @param date2
	 * @return true si date1 <= date2, false en caso contrario
	 */
	public static boolean isEqualOrLower(Date date1, Date date2){
		if(compareDates(date1, date2) <= 0 ){
			return true;
		}
		return false;
	}
	
	private static DecimalFormat df = new DecimalFormat("00");
	/**
	 * Formatea una cantidad en segundos como HHMMSS
	 */
	public static String formateaHora(Integer numSec)
	{
		if (numSec == null) return null;
		
		int totalSeconds = numSec.intValue();

		int hours = totalSeconds / 3600;
		int minutes = totalSeconds / 60 - (hours * 60);
		int seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  	
		return df.format(hours) + ":" + df.format(minutes) + ":" + df.format(seconds);
	}
	/**
	 * Formatea una cantidad en segundos como HHMMSS con rango 0-24
	 */
	public static String formateaHora0_24(Integer numSec)
	{
		if (numSec == null) return null;
		
		int totalSeconds = numSec.intValue();

		int hours = totalSeconds / 3600;
		int minutes = totalSeconds / 60 - (hours * 60);
		int seconds = totalSeconds - (hours * 3600) - (minutes * 60);
		
		if (hours >= 24 )
			hours = hours-24;
  	
		return df.format(hours) + ":" + df.format(minutes) + ":" + df.format(seconds);
	}

}
