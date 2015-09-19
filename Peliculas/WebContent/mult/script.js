
// Funcion para abrir una ventana desde otra
function openWin(html,name,w,h){
    myWin= open(html, name, "width="+w+",height="+h+",status=no,titlebar=yes,toolbar=no,left=200,top=100,menubar=no,scrollbars=yes");
}

// Funcion para referenciar una ventana con otra
function eligeOpcion(nombre,valor){
  minombre=eval("window.opener.document.forms[0]."+nombre)
  minombre.value=valor
  window.close();
}

// Funcion para pasar cuentas de banco
function eligeCuenta(nombre1,valor1,nombre2,valor2,nombre3,valor3,nombre4,valor4){
 minombre1=eval("window.opener.document.forms[0]."+nombre1)
 minombre2=eval("window.opener.document.forms[0]."+nombre2)
 minombre3=eval("window.opener.document.forms[0]."+nombre3)
 minombre4=eval("window.opener.document.forms[0]."+nombre4)
 minombre1.value=valor1
 minombre2.value=valor2
 minombre3.value=valor3
 minombre4.value=valor4
 window.close();
}

// Funcion para los checkbox

var1="uno uno uno";
var2="dos dos dos";
var3="tres tres tres";
function cambiar(formulario){
if (document.formulario.elements[2].checked){
document.formulario.cambia.value=var1;
document.formulario.elements[7].disabled=true;

}
if (document.formulario.elements[3].checked){
document.formulario.cambia.value=var2;
document.formulario.elements[7].disabled=false;

}
if (document.formulario.elements[6].checked){
document.formulario.cambia.value=var3;
document.formulario.elements[7].disabled=false;

}
if (document.formulario.elements[7].checked){
document.formulario.elements[2].disabled=true;
}
if (document.formulario.elements[8].checked){
document.formulario.elements[2].disabled=false;
}

}

// Funcion para refrescar menu de Posición Global

function refrescar_menu_posglobal(){
top.frames[1].frames[1].location='menu1.html';
return true;
}

// Funcion para refrescar menu de Contratación

function refrescar_menu_contratacion(){
top.frames[1].frames[1].location='menu2.html';
return true;
}

// Funcion para refrescar menu de Posición Global-Ctas

function refrescar_menu_posglobal_ctas(){
top.frames[1].frames[1].location='menu1_1.html';
return true;
}

// Funcion para refrescar menu de Posición Global-Ipfs

function refrescar_menu_posglobal_ipfs(){
top.frames[1].frames[1].location='menu1_2.html';
return true;
}

// Funcion para refrescar menu de Posición Global-Planes

function refrescar_menu_posglobal_planes(){
top.frames[1].frames[1].location='menu1_3.html';
return true;
}

// Funcion para refrescar menu de Posición Global-Fondos

function refrescar_menu_posglobal_fondos(){
top.frames[1].frames[1].location='menu1_4.html';
return true;
}

// Funcion para refrescar menu de Posición Global-tarjetas de débito

function refrescar_menu_posglobal_tarj(){
top.frames[1].frames[1].location='menu1_5.html';
return true;
}

// Funcion para refrescar menu de Posición Global-tarjetas de crédito

function refrescar_menu_posglobal_tarj2(){
top.frames[1].frames[1].location='menu1_8.html';
return true;
}

// Funcion para refrescar menu de Posición Global-prestamos
function refrescar_menu_posglobal_prestamos(){
top.frames[1].frames[1].location='menu1_6.html';
return true;
}

// Funcion para refrescar menu de Posición Global-crediconsumo
function refrescar_menu_posglobal_crediconsumo(){
top.frames[1].frames[1].location='menu1_7.html';
return true;
}