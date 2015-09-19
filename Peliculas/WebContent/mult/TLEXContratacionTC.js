function validar(form)
{
        var aux="";

        if (form.tipoTrabajo.value=="Vacio")
        {
                alert('Debe introducir el tipo de empleo');
                form.tipoTrabajo.focus();
                return false;
        }
        if (form.nombreEmpresa.value=="")
        {
                alert('Debe introducir el nombre de la empresa');
                form.nombreEmpresa.focus();
                return false;
        }
        
        if (form.antiguedadEmpresa.value=="")
        {
                alert('Debe introducir la antigüedad en la empresa');
                form.antiguedadEmpresa.focus();
                return false;
        }

        if (!isNumber(form.antiguedadEmpresa.value))
        {
                alert('La antigüedad en la empresa debe ser numerica');
                form.antiguedadEmpresa.focus();
                return false;
        }


        if ((form.cargo.value=="")&&(!(form.tipoTrabajo.value=="Autonomo")))
        {
                alert('Debe introducir el cargo en la empresa');
                form.cargo.focus();
                return false;
        }

        if (form.teleEmpresa.value=="")
        {
                alert('Debe introducir el telefono de la empresa');
                form.teleEmpresa.focus();
                return false;
        }

        if (!isNumber(form.teleEmpresa.value))
        {
                alert('El numero de telefono debe ser numerico');
                form.teleEmpresa.focus();
                return false;
        }
	if (form.domiEmpresa.value=="")
        {
                alert('Debe introducir el domicilio de la empresa');
                form.domiEmpresa.focus();
                return false;
        }
        if (form.viviendaHabitual.value=="Vacio")
	{
        	alert('Debe introducir el tipo de vivienda');
                form.viviendaHabitual.focus();
                return false;
	}
	if (form.numPerACargo.value!="" && !isNumber(form.numPerACargo.value))
        {
                alert('El numero de personas a su cargo debe ser numerico');
                form.numPerACargo.focus();
                return false;
        }

        if (form.viviendaHabitual.value=="Propia")
        {
                if  (form.valorVivPropiedad.value=="")
                {
                        alert('Debe introducir el valor de la vivienda');
                        form.valorVivPropiedad.focus();
                        return false;
                }
                else
                {
                        aux=isImporte(form.valorVivPropiedad.value,',');
                        aux1=isImporte(form.valorVivPropiedad.value,'.');
                        if (!((aux=="")||(aux1=="")))
                        {
                                alert('El campo valor de la vivienda en propiedad,'+aux1);
                                form.valorVivPropiedad.focus();
                                return false;
                        }
                }
        }

        aux=form.valorVivPropiedad.value;
        aux1=aux.replace(",",".");
        form.valorVivPropiedad.value=aux1;


        if (form.valorVivPropiedad.value!="")
        {
                aux=isImporte(form.valorVivPropiedad.value,',');
                aux1=isImporte(form.valorVivPropiedad.value,'.');
                if (!((aux=="")||(aux1=="")))
                {
                        alert('El campo valor de la vivienda en propiedad '+aux1);
                        form.valorVivPropiedad.focus();
                        return false;
                }
        }

        if (form.viviendaHabitual.value=="Propia")
        {
                if (form.valorPdteHipoteca.value=="")
                {
                        alert('Debe introducir el valor pendiente de la hipoteca');
                        form.valorPdteHipoteca.focus();
                        return false;
                }
                else
                {
                        aux=isImporte(form.valorPdteHipoteca.value,',');
                        aux1=isImporte(form.valorPdteHipoteca.value,'.');
                        if (!((aux=="")||(aux1=="")))
                        {
                                alert('El campo valor pendiente de hipoteca '+aux1);
                                form.valorPdteHipoteca.focus();
                                return false;
                        }
                }
        }

        aux=form.valorPdteHipoteca.value;
        aux1=aux.replace(",",".");
        form.valorPdteHipoteca.value=aux1;

        if (form.valorPdteHipoteca.value!="")
        {
                aux=isImporte(form.valorPdteHipoteca.value,',');
                aux1=isImporte(form.valorPdteHipoteca.value,'.');
                if (!((aux=="")||(aux1=="")))
                {
                        alert('El campo valor pendiente de hipoteca '+aux1);
                        form.valorPdteHipoteca.focus();
                        return false;
                }
        }

        if (form.nominasLiquidas.value=="")
        {
                alert('Debe introducir el valor de la nomina liquida');
                form.nominasLiquidas.focus();
                return false;
        }
        else
        {
                aux=isImporte(form.nominasLiquidas.value,',');
                aux1=isImporte(form.nominasLiquidas.value,'.');
                if (!((aux=="")||(aux1=="")))
                {
                        alert('El campo valor nomina liquida '+aux1);
                        form.nominasLiquidas.focus();
                        return false;
                }
        }

        aux=form.nominasLiquidas.value;
        aux1=aux.replace(",",".");
        form.nominasLiquidas.value=aux1;

        if (form.ingrMensVariables.value=="")
        {
                alert('Debe introducir el valor de los ingresos variables');
                form.ingrMensVariables.focus();
                return false;
        }
        else
        {
                aux=isImporte(form.ingrMensVariables.value,',');
                aux1=isImporte(form.ingrMensVariables.value,'.');
                if (!((aux=="")||(aux1=="")))
                {
                        alert('El campo valor ingresos variables '+aux1);
                        form.ingrMensVariables.focus();
                        return false;
                }
        }

        aux=form.ingrMensVariables.value;
        aux1=aux.replace(",",".");
        form.ingrMensVariables.value=aux1;

        if (form.viviendaHabitual.value=="Propia")
        {
                if (form.gastosVivienda.value=="")
                {
                        alert('Debe introducir el valor de los gastos fijos mensuales de vivienda (hipoteca, letras)');
                        form.gastosVivienda.focus();
                        return false;
                }
                else
                {
                        aux=isImporte(form.gastosVivienda.value,',');
                        aux1=isImporte(form.gastosVivienda.value,'.');
                        if (!((aux=="")||(aux1=="")))
                        {
                                alert('El campo de los gastos fijos mensuales de vivienda (hipoteca, letras) '+aux1);
                                form.gastosVivienda.focus();
                                return false;
                        }
                }



        }

        if (form.gastosVivienda.value!="")
        {
                aux=isImporte(form.gastosVivienda.value,',');
                aux1=isImporte(form.gastosVivienda.value,'.');
                if (!((aux=="")||(aux1=="")))
                {
                        alert('El campo de los gastos fijos mensuales de vivienda (hipoteca, letras) '+aux1);
                        form.gastosVivienda.focus();
                        return false;
                }
        }

        if (form.gastosAlquiler.value!="")
        {

                aux=isImporte(form.gastosAlquiler.value,',');
                aux1=isImporte(form.gastosAlquiler.value,'.');
                if (!((aux=="")||(aux1=="")))
                {
                        alert('El campo valor del alquiler/ comunidad/ otros '+aux1);
                        form.gastosAlquiler.focus();
                        return false;
                }

        }

        if (form.gastosDeudas.value!="")
        {

                aux=isImporte(form.gastosDeudas.value,',');
                aux1=isImporte(form.gastosDeudas.value,'.');
                if ((!((aux=="")||(aux1==""))))
                {
                        alert('El campo valor de otros préstamos/ deudas '+aux1);
                        form.gastosDeudas.focus();
                        return false;
                }
        }

	form.gastosVivienda.value=form.gastosVivienda.value.replace(",".charAt(0),".".charAt(0));
	form.gastosDeudas.value=form.gastosDeudas.value.replace(",".charAt(0),".".charAt(0));
	form.gastosAlquiler.value=form.gastosAlquiler.value.replace(",".charAt(0),".".charAt(0));
	
	if (form.numPerACargo.value=="")
        {
        	form.numPerACargo.value==0;
        }
        
        form.submit();

}

// funcion que valida los datos introducidos en el alta de un interviente
function validarAltaInt(form)
{	
	
	var bResultado=true;
        var aux="";

	if (bResultado && trim(form.nombre.value)=="")
        {
                alert('El campo Nombre ha de estar informado');
                form.nombre.focus();
                bResultado = false;
        }
        if (bResultado && trim(form.apellido1.value)=="")
        {
                alert('El campo Primer Apellido ha de estar informado');
                form.apellido1.focus();
                bResultado = false;
        }
        if (bResultado && trim(form.apellido2.value)=="")
        {
                alert('El campo Segundo Apellido ha de estar informado');
                form.apellido2.focus();
                bResultado = false;
        }
        if (bResultado && form.dia_nacimiento.value == "" && form.mes_nacimiento.value == "" && form.anno_nacimiento.value == "")
	{
        	alert('Debe introducir la Fecha de Nacimiento');
        	form.dia_nacimiento.focus();
        	bResultado = false;
	}
	var dia=form.dia_nacimiento.value;
	
	if(dia.length==1)
	{
		dia = "0" +dia;
	}
	var mes=form.mes_nacimiento.value;
	if(mes.length==1)
	{
		mes = "0" +mes;
	}
	var anno=form.anno_nacimiento.value;

	if (bResultado && !(fechaValida(dia, mes, anno)))
	{
       		alert('Debe introducir una Fecha de Nacimiento correcta');
        	form.dia_nacimiento.value="";
        	form.mes_nacimiento.value="";
        	form.anno_nacimiento.value="";
        	form.dia_nacimiento.focus();
        	bResultado = false;
        }

  	if(bResultado)
	{
		form.fechaNacimiento.value=dia + "-" + mes + "-" + anno;
		form.submit();
	}
	
}

function validarDatosOperativos(form)
{
        if (form.cuentasExpress[form.cuentasExpress.selectedIndex].value=="Vacio")
        {
                alert('Debe seleccionar la cuenta de cargo');
                form.cuentasExpress.focus();
                return false;
        }
        
        if (form.formaDePago[form.formaDePago.selectedIndex].value=="Vacio")
        {
                alert('Debe seleccionar un modo de pago');
                form.formaDePago.focus();
                return false;
        }

        if ((form.formaDePago[form.formaDePago.selectedIndex].value=="Fijo de")&&(form.importe.value==""))
        {
                alert('Debe introducir el importe fijo a pagar');
                form.importe.focus();
                return false;
        }

        if (form.formaDePago[form.formaDePago.selectedIndex].value=="Fijo de")
        {
                aux=isImporte(form.importe.value,".");
                aux1=isImporte(form.importe.value,",");
                if (!((aux=="")||(aux1=="")))
                {
                        alert('El campo del importe '+aux);
                        form.importe.focus();
                        return false;
                }                
        }


        if (form.limiteCredito.value=="")
        {
                alert('Debe introducir el límite del crédito');
                form.limiteCredito.focus();
                return false;
        }
        else
        {
                aux=isImporte(form.limiteCredito.value,".");
                aux1=isImporte(form.limiteCredito.value,",");
                if (!((aux=="")||(aux1=="")))
                {
                        alert('El campo del límite del crédito '+aux);
                        form.limiteCredito.focus();
                        return false;
                }
        }

        aux=form.limiteCredito.value;
        aux1=aux.replace(",",".");
        form.limiteCredito.value=aux1;

        if (form.firmadoEn.value=="")
        {
		alert('Debe introducir la población donde se firma el contrato');
                form.firmadoEn.focus();
                return false;
        }

	form.importe.value=form.importe.value.replace(",".charAt(0),".".charAt(0));
	
	if (form.domicilioPostal.value=="")
        {
                alert('Debe introducir domicilio');
                form.domicilioPostal.focus();
                return false;
        }
        if (form.plazaPostal.value=="")
        {
                alert('Debe introducir población');
                form.plazaPostal.focus();
                return false;
        }
        if (form.listaProvincias.selectedIndex==0)
        {
                alert('Debe introducir provincia');
                form.listaProvincias.focus();
                return false;
        }
        if (form.codigoPostal.value=="")
        {
                alert('Debe introducir código postal');
                form.codigoPostal.focus();
                return false;
        }
        var numero=form.codigoPostal.value;
        if (numero.length != 5)
        {
               alert('El Código Postal debe tener 5 posiciones');
               form.codigoPostal.value="";
               form.codigoPostal.focus();
               return false;
        }
        if (!(isNumber(numero)))
        {
               alert('El Código Postal debe ser numérico');
               form.codigoPostal.value="";
               form.codigoPostal.focus();
               return false;
        }
        var cod=form.codigoPostal.value;
        var codprov=parseFloat(cod.substring(0,2));
        if (codprov != form.listaProvincias[form.listaProvincias.selectedIndex].value)
        {
               alert('El Código Postal no pertenece a la provincia seleccionada');
               form.codigoPostal.value="";
               form.codigoPostal.focus();
               return false;
        }
        
        var cuentaSeleccionada=form.cuentasExpress[form.cuentasExpress.selectedIndex].value;
        form.cuentaExpress.value=cuentaSeleccionada;
        
        var provPostal=form.listaProvincias[form.listaProvincias.selectedIndex].text;
	form.provinciaPostal.value=provPostal;
	
	form.formaPago.value= form.formaDePago[form.formaDePago.selectedIndex].value + " " + form.importe.value;
         
        form.submit();
}