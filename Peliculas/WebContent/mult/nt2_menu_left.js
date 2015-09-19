var mimenu=new menu();
var sToolTex="", sToolUrl="",ultiKeyClick=0;
/*
	Variables para controlar los estilos utilizados
*/
var fMuyClaro="bckg11",fClaro="bckg2",fOscuro="bckg3";
var tNegri="txt11v1b",tNorm="txt11v1";
var cteNivIni=2;

/*
	Objeto para almacenar todas las opciones del menu, tanto las del izquierdo como las pestañas.
	El nivel distingue donde aparecen las opciones:
		1,2	-> En el menu izquierdo
		3		-> En las pestañas
		4		-> Subopciones de las pestañas
		t		-> Datos para alimentar el combo de herramientas
*/
function menu()
{
	this.nivel = new Array();					//Array donde se guarda el nivel de cada opcion
	this.texto = new Array();					//Idem para el texto 
	this.url = new Array();						//Idem para la url
	this.key = new Array();						//Clave que identifica una opción. Se corresponde con su posicion para utilizarla com indice
	this.keyPadre = new Array();				//Clave de la opcion del primer nivel. Permite identificar un grupo de subopciones (desde el nivel 1 al t)
	this.toolTexto = new Array();				//Guarda los datos que se muestran en el combo asociado al nivel 1 de ese grupo. Es un string donde cada opcion se separa por una #.
	this.toolUrl = new Array();				//Idem para las url de cada opcion del combo
	this.annade_opcion = cargarArray;		//Asocia la funcion que carga el menu. Se llama desde el js de datos
	this.keyActual=0;								//Para ir conociendo la posicion en el momento de cargar los datos
	this.keyN1=0;									//Clave que corresponde al ultimo nivel 1, utilizada en la carga de datos
}
/*
	Funcion llamada desde el js de datos para cargar en memoria el menu.
	Recibe:
				cadNivel	-> String que indica el nivel con el formato "Nivel_" + "n" indicativo del nivel o "t" indicativo de tool para el combo
				valido	-> True o False. No se utiliza de momento.
				texto		->	El que se mostrara en la opcion del menu
				url		-> Que tendra que mostrar
*/
function cargarArray(cadNivel,valido,texto,url)
{
try{	
	
	posicion = cadNivel.indexOf("_");
	if (posicion!=(-1)) 
		aux=cadNivel.substring(posicion+1,cadNivel.length);

	/*
		Las opciones del combo se almacenan como un strin separadas por una #.
		Se asocian al nivel 1. El resto del array queda vacio.
	*/
	if(aux=="t")
	{
		if(this.toolTexto[this.keyN1]==null)
		{
			this.toolTexto[this.keyN1]="";
			this.toolUrl[this.keyN1]="";
		}
		this.toolTexto[this.keyN1]+=texto+"#";
		this.toolUrl[this.keyN1]+=url+"#";
	}
	else
	{
		aux=parseInt(aux);
		this.nivel[this.keyActual]=aux;
		this.texto[this.keyActual]=texto;
		this.url[this.keyActual]=url;
		this.key[this.keyActual]=this.keyActual;
		if(aux==cteNivIni)
			this.keyN1=this.keyActual;
		this.keyPadre[this.keyActual]=this.keyN1;
		this.keyActual++;
	}
}
catch(e)
{
	alert(e.message);
}
}

/*
	Se llama desde nt2_menu_left.html justo despues de llamar a init();
*/
function mostrarMenu()
{
	despliegaNivel(-1);
}
/*
	Prepara la tabla con las opciones del menu que tienen que mostrarse.
	Recibe:
			keyClick	-> Nivel pinchado 2 o 3. Puede ser 	-1 si es la primera vez que lanza sin haber pinchado una opcion.
*/
function despliegaNivel(keyClick)
{
try
{
	var nivelClick=0,keyN1Click=0,i,x,bMostrar,cla1,cla2,fon1,fon2,swPriVez=false,k,noArranques=keyClick;
		
	iOpcionesDesplegadas=0;
	if(keyClick==-1)
	{
		swPriVez=true;
		keyClick=1;
	}
	nivelClick=mimenu.nivel[keyClick];
	keyN1Click=mimenu.keyPadre[keyClick];

	
	/*
		La tabla se forma con un <tr> para cada uno de los elementos del array de texto que sea:
			- Nivel 2.
			- Nivel 3 con la misma clave padre de la opcion en la que se haya pinchado
			- Que el texto a mostrar sea distinto de "" (indicativo de un nivel intermedio)
		El nivel 1 esta reservado para diferenciar los dos bloques que hay que mostrar.
		Por un lado las opciones de menu y debajo el de otros productos.
	*/
	c="<table width='210px' border='0' cellspacing='0' cellpadding='1'>";	
	for(i=0;i<mimenu.nivel.length;i++)
	{			
		if (mimenu.nivel[i]==1)
		{
			if(i!=0)
			{
//				mostrarTablaInf(i);	//Prepara los datos de Otros Productos y el combo inferior.
				break;
			}
		}
		else
		{
			if (mimenu.nivel[i]>cteNivIni || mimenu.nivel[i]<=cteNivIni+1)
			{
				bMostrar=(mimenu.nivel[i]==cteNivIni);
				bMostrar=(bMostrar)?bMostrar:(mimenu.keyPadre[i]==keyN1Click && mimenu.nivel[i]<=nivelClick+1 && mimenu.nivel[i]<4);

				bMostrar=(ultiKeyClick==keyClick && mimenu.nivel[i]>2)?false:bMostrar;

				bMostrar=(mimenu.texto[i]=="")?false:bMostrar;
				if(bMostrar)		
				{
					iOpcionesDesplegadas++;
					cla1=(mimenu.nivel[i]==cteNivIni)?fClaro:fMuyClaro;
					cla1=(keyN1Click==i)?fOscuro:cla1;
					cla1=(swPriVez)?fClaro:cla1;
					cla2=(keyClick==i || (mimenu.keyPadre[i]==keyN1Click && mimenu.nivel[i]==cteNivIni))?tNegri:tNorm;
					if(mimenu.key[i]!=null)
						cla2=(nivelClick==cteNivIni && mimenu.key[i]==keyClick+1)?tNegri:cla2;
					cla2=(swPriVez)?tNorm:cla2;
		
					c+="<tr class='"+fClaro+"'><td height='21' onclick='despliegaNivel("+i+")' class='"+cla1+"'";
					c+=(mimenu.nivel[i]==cteNivIni)?" style='border-top-color:#C2DEE4;border-top-width:1px;border-top-style:solid;'>":">";
					c+=(mimenu.nivel[i]==cteNivIni)?"&nbsp;":"&nbsp;&nbsp;<font size=1>&bull;<font>&nbsp;";
					c+="<a class='"+cla2+"' href='#' onfocus='blur()'>"+mimenu.texto[i]+"</a>";
					c+="</td></tr>";
				}
			}
		}
	}
	c+="</table>";


	if(nivelClick==2)
		if(ultiKeyClick==keyClick)
			ultiKeyClick=0;
		else
			ultiKeyClick=keyClick;

	document.getElementById("divMenu").innerHTML=c;

	if(mimenu.texto[keyClick+1]!=null && nivelClick<cteNivIni+1)
		keyClick++;
	k=(nivelClick==2)?1:0;
	if(nivelClick<cteNivIni+1)
		nivelClick++;
	if(noArranques!=-1)
		arrancarPestanias(keyClick,nivelClick,keyN1Click,k);
	colocarBotonesDespla();
}
catch(e)
{
	alert(e.message);
}
}

/*
	Prepara los datos asociados al grupo de pestañas que se muestra.
	Crea un objeto de tipo menu y le rellena con los datos del nivel 3 y 4 asociados al que se pincho.
	Despues llama a la funcion que visualiza las pestañas.
	Por ultimo si la opcion de menu pinchada tiene url, visualiza la pagina.
*/
function arrancarPestanias(keyClick,nivelClick,keyPadreClick,bloque)
{
try
{
	var objOpciones=new menu();
	var i,x=0,strUrl="";
 
	objOpciones.toolTexto[0]=mimenu.toolTexto[keyPadreClick];
	objOpciones.toolUrl[0]=mimenu.toolUrl[keyPadreClick];
	
	
	strUrl=mimenu.url[keyClick-bloque];
	for(i=keyClick+1;i<mimenu.nivel.length;i++)
	{
		if(mimenu.nivel[i]<=nivelClick||keyPadreClick!=mimenu.keyPadre[i] || mimenu.nivel[i]<3)
			break;

		objOpciones.nivel[x] = mimenu.nivel[i];
		objOpciones.texto[x] = mimenu.texto[i];
		objOpciones.url[x] = mimenu.url[i];				
		objOpciones.key[x] = mimenu.key[i];
		objOpciones.keyPadre[x] = mimenu.keyPadre[i];
		x++;	
	}
	top.contenido.interior_arriba.mostrarPestanias(objOpciones);
	top.contenido.interior_arriba.mostrarUrl(strUrl,0);
}
catch(e)
{
	//alert(e.message);
}
}
/*
	Función que recibre una cadena con el texto de una de las opciones del menu de la izquierda.
	Busca ese texto en la ocurrencias del objeto menu para obtener los indices con los que
	llamar a la funcion que muestra las pestañas.
	Permite que un enlace externo pueda pintar las pestañas como si fuera una opcion de menu.
*/
function arrancarPesDeCadena(strBuscar)
{
try
{
	var n;
	for(n=0;n<mimenu.texto.length;n++)
	{
		if(mimenu.texto[n]==strBuscar)
		{
			arrancarPestanias(mimenu.key[n],mimenu.nivel[n],mimenu.keyPadre[n],(mimenu.nivel[n]==2)?1:0)
			break;
		}
	}
}
catch(e)
{
	//alert(e.message);
}
}

/*
	Esta funcion se encarga de pintar las opciones de "Otros Productos" debajo de las del menú.
	Deben funcionar de forma similar, pero con la simplificación de que solo hay un nivel y
	no dos como puede haber en los menús.
*/
function mostrarTablaInf(iPos)
{
try
{
var d,keyPadre,j;

keyPadre=mimenu.keyPadre[iPos+1];

d="<table cellpadding=0 cellspacing=0 border=1 width=210>";
d+="<tr><td class=bckg29 height=23><span class=txt12v1b>&nbsp;&nbsp;"+mimenu.texto[iPos]+"</span></td>";
d+="<td width=5 valign=top class=bckg29></td></tr></table>";
d+="<table cellpadding=0 cellspacing=0 border=0 width=210>";
for(j=iPos+1;j<=mimenu.nivel.length;j++)
{
	if(keyPadre!=mimenu.keyPadre[j])
		break;
	if(mimenu.nivel[j]==3)
	{
		iOpcionesDesplegadas++;
		d+="<tr class=bckg11><td class=bckg29></td>";
		d+="<td height=20 onclick='arrancarPestanias("+mimenu.key[j]+",3,"+keyPadre+",0)'>";
		d+="<span class=txt9v1>&nbsp;&nbsp;<a href='javascript:void(null)' class='txt9v1' onfocus='blur()'>"+mimenu.texto[j]+"</a></span></td>";
		d+="<td class=bckg29></td></tr><tr><td class=bckg29></td><td class=bckg1></td><td class=bckg29></td></tr>";
	}
}
d+="<tr><td colspan=3 class=bckg29></td></tr></table>";

document.getElementById("divOtrPro").innerHTML=d;
colocarBotonesDespla();
}
catch(e)
{
	alert(e.message);
}
}

function init() 
{
	cargaOpciones();
}

/**
* funcion para inicializar valores generales en la interfaz
*/

var altoPanta;

var paso=0,valor,tiempo,Y;
var altura=0, altoClip=0;
var activo=false; 
var capa="divScroll";
var iOpcionesDesplegadas=0;

function iniciaValores()
{
	if(navigator.appName=="Microsoft Internet Explorer")
		altoPanta=document.body.offsetHeight;
	else
		altoPanta=window.innerHeight;

   altoClip=altoPanta-20;
   altura=-50

	Y=110;
	paso=0;

   document.getElementById(capa).style.top=Y;
   document.getElementById(capa).style.height=altoClip;
   document.getElementById(capa).style.clip="rect(0px,210px,"+altoClip+"px,0px)";
}

/**
* funcion para scrolear la capa de textos
*/
function mover(donde)
{
	clearTimeout(tiempo);
	Y=parseInt(document.getElementById(capa).style.top);
	H=parseInt(document.getElementById(capa).style.height);
	altura=altoClip-((iOpcionesDesplegadas*22)+42);
	
	
	if((Y>altura)&&(donde==0))
	{
	    activo=true;
	    valor=1;
	    paso+=valor;
	    document.getElementById(capa).style.top = Y-valor;
	    document.getElementById(capa).style.height = H+valor;
	    eval("document.getElementById('"+capa+"').style.clip='rect("+paso+",134,"+(H+valor)+",0)'");
	    tiempo=setTimeout("mover(0)",5);
	}
	else if((Y<=0) && (donde==1) && (activo==true))
	{
	    valor=-1;
	    paso+=valor;
	    document.getElementById(capa).style.top = Y-valor;
	    document.getElementById(capa).style.height = H+valor;
	    eval("document.getElementById('"+capa+"').style.clip='rect("+paso+",134,"+(H+valor)+",0)'");
	    tiempo=setTimeout("mover(1)",5);
	}
	
}
function colocarBotonesDespla()
{
	var altoPanta;
	if(navigator.appName=="Microsoft Internet Explorer")
		altoPanta=document.body.offsetHeight;
	else
		altoPanta=window.innerHeight;
	
	var yPos=altoPanta-35;

	
	var c="<div id='divBotSub' style='LEFT:124px;TOP:-3px; POSITION:absolute; z-index:1;marginTop:0;paddingTop:0'>";
	c+="<table border=0 align='center' width=100%>";
	c+="<tr>";
	c+="<td width=25% onmouseover='mover(0);' onmouseout='clearTimeout(tiempo)'>";
	c+="<a href='javascript:void(null)'><img src='mult/scroll_sub.gif' border='0'></a></td>";
	c+="</tr>";
	c+="</table>";
	c+="</div>";
	
	c+="<div id='divBotBaj' style='LEFT:124px;TOP:"+(yPos-7)+"px; POSITION:absolute; z-index:1;marginTop:0;paddingTop:0'>";
	c+="<table border=0 align='center' width=100%>";
	c+="<tr>";
	c+="<td width=25% onmouseover='mover(1);' onmouseout='clearTimeout(tiempo)'>";
	c+="<a href='javascript:void(null)' class='txt10v7b'><img src='mult/scroll_baj.gif' border='0'></a></td>";
	c+="</tr>";
	c+="</table>";
	c+="</div>";

	c+="<div id='divLinea' style='LEFT:130px;TOP:20px; POSITION:absolute; z-index:1;marginTop:0;paddingTop:0'>";
	c+="<table border=0 cellpadding=0 cellspacing=0 width=4px>";
	c+="<tr>";
	c+="<td>";
	c+="<img src='mult/ascensor.gif' border='0'>";
	c+="</td>";
	c+="</tr>";
	c+="</table>";
	c+="</div>";


	if(((iOpcionesDesplegadas*22)+42)>altoClip)
		document.getElementById("divTruco").innerHTML=c;
	else
	{
		document.getElementById("divTruco").innerHTML="";
		iniciaValores();
	}
	
}
function meCambian()
{
	colocarBotonesDespla();
	iniciaValores();
	colocarBotonesDespla();
}
   