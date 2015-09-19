//Parametros de version de navegadores para controlar la impresión del informe

var sgIE4 = (document.all) ? true : false;
var sgNN4 = (document.layers) ? true : false;
var ns4 = (document.layers)? true:false;
var ie4 = (document.all)? true:false;
ie5 = (navigator.userAgent.indexOf('MSIE 5')>0)

function Imprimir_Con_Logo(str,form_logo)
{
	Ocultar_Div_Logo(str);
	Mostrar_Div_Logo(form_logo);
	
	if (sgIE4 && !ie5)
		boton_imprimir();
	else
	{
		self.print();
	}

	Mostrar_Div_Logo(str);
	Ocultar_Div_Logo(form_logo);

}

function Mostrar_Div_Logo(id)
{
	if (ie4) document.all[id].style.display= "";
}

function Ocultar_Div_Logo(obj)
{
	if (ie4) document.all[obj].style.display = "none";
}

function Imprimir_Pantalla(str)
        {
                Ocultar_Div(str);

                if (sgIE4 && !ie5)
                        boton_imprimir();
                else
                        {
                                self.print();
                        }

                Mostrar_Div(str);

        }

function Mostrar_Div(id)
        {
            if (ie4) 
            {	
            	document.all[id].style.visibility = "visible"
            }
            document.forms[0].aceptar.disabled=false;
}

function Ocultar_Div(obj)
        {
                if (ie4) document.all[obj].style.visibility = "hidden"
        }

function Cambiar_Div(obj,texto)
        {
                if (ie4)
                {
                        document.all[obj].innerHTML= texto
                }
                else if (ns4)
                {
                        document.layers[obj].document.write(texto)
                        document.layers[obj].document.close()
                }
        
        }
        
function boton_imprimir()
        {

                var sWebBrowser = '<OBJECT ID="sWebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
                document.body.insertAdjacentHTML('beforeEnd', sWebBrowser);
                sWebBrowser1.ExecWB(6, 1);
                sWebBrowser1.outerHTML = "";

        }
