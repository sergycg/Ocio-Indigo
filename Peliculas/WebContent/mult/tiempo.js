function redirecciona(){
    top.location="/bbvanet/LogoutCBTFServlet?pag=controlSesion.jsp"; 
 }

 function controlSesion(){
    tiempo=15 // en minutos
    window.setTimeout('redirecciona()',tiempo*1000*30);
 }

 