/**
 *
 */
package com.onnix.business.utils;



/** Clase de utilidad para Strings
 * @author Ivan Martinez Martinez
 * @version $Revision$ ($Author$)
 *
 */
public class StringUtils {

	/**
	 * Recibe un string y devuelve cierto si es nulo
	 * @param String string
	 * @return boolean. true si es nulo, false en caso contrario
	 */
	public static boolean isNull(String string)
	{
		return (string==null);
	}

	/**
	 * Recibe un string y devuelve cierto si es nulo o vacío
	 * @param String string
	 * @return boolean true si es nulo o vacío, false en caso contrario
	 */
	public static boolean isEmpty(String string)
	{
		return (isNull(string) || string.trim().length()==0);
	}

	/**
	 * Recibe un string y devuelve cierto si no está vacío
	 * @param String string
	 * @return boolean true si no está vacío, false en caso contrario
	 */
	public static boolean isNotEmpty(String string)
	{
		return !isEmpty(string);
	}

	/**
	 *
	 * @param string
	 * @return nulo si el string es nulo o está vacío, en otro caso devuelve string.
	 */
	public static String trimToNull(String string)
	{
		if(isEmpty(string)) {
			return null;
		}
		return string;
	}




	/**
	 * @param int number, int length, String character
	 * @return Devuelve un string de longitud length. Si la longitud del
	 * string pasado por parametro es menor que length, se le añade a su izquierda
	 * el caracter character hasta completar la longitud length. En caso contrario
	 * se devuelve el string
	 */
	public static String addCharacterAtLeft(String string, int length, String character)
    {
		if(!isEmpty(string))
		{
			while(string.length()<length){
				string=character+string;
			}
		}
        return string;
    }

	/**
	 * Dado un String comprueba que no sea nulo o vacio mediante {@link StringUtils}.trimToNull
	 * en otro caso devuelve el string con el metodo trim realizado
	 * @param string
	 * @return nulo si el string es nulo o está vacío, en otro caso devuelve string.
	 * @deprecated
	 */
	public static String toStringOrTrimOrNull(String string)
	{
		if(trimToNull(string) == null) {
			return null;
		} else {
			return string.trim();
		}
	}
	
	/**
	 * Dado un String lo convierte en una cadena de texto v�lida para ser enviada a trav�s de un web service
	 * @param string
	 * @return el string sin el caracter '|', reemplazandolo por "^|".
	 */
	public static String stringToWS(String string)
	{
		string = string.replaceAll("\\|", "^|");
		return string.trim();
	}
	
	/**
	 * Dado un String lo convierte en una cadena de texto v�lida para un formato hora hh:mm:ss
	 * @param string
	 * @return el string sin el caracter '|', reemplazandolo por "^|".
	 */
	
	public static String stringToStringTime(String string)
	{
		
		String hh = string.substring(0,2);
		String mm = string.substring(2,4);
		String ss = string.substring(3,5);
		
		string= hh.concat(":").concat(mm).concat(":").concat(ss); 
		
		return string;
	}
	

}
