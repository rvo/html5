var mesa="mesa JCPA";
var socket = io('http://148.226.81.75:8080');

window.addEventListener("load",function(){
	var botones=document.getElementsByTagName("button");
	var listaBotones=Array.prototype.slice.call(botones);
	listaBotones.forEach(function(item){
		if(item.id!="enviarpedido"){
			item.addEventListener("click",generaComanda);
		}else{
			item.addEventListener("click",enviaComanda);
		}
	});
	muestraOrdenados();
	encuentrame();

	socket.on("connect",function(){
		console.log("Conectado con la cocina");
	});
});

function generaComanda(e){
	if(!localStorage){
		alert("tienes un navegador viejo :'(");
	}else{
		var platillos = Array();
		if(!localStorage.getItem(mesa)){			
			platillos.push(e.target.id);
		}else{
			platillos=JSON.parse(localStorage.getItem(mesa));
			platillos.push(e.target.id);
		}
		localStorage.setItem(mesa,JSON.stringify(platillos));
	}
	muestraOrdenados();
}
function muestraOrdenados(){
	if(localStorage.getItem(mesa)){	
		var ordenadosSpan = document.getElementById("seleccionados");
		var platillosOrdenados=JSON.parse(localStorage.getItem(mesa));
		ordenadosSpan.innerHTML=platillosOrdenados.length;
	}
}
function encuentrame(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(listo,error);
	}
}
function listo(posicion){
	var mapa=document.getElementById('mapa');
	
	mapa.innerHTML="Tu posición actual "+ posicion.coords.latitude + "," + posicion.coords.longitude;

	var pos=new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude)
	var mapOptions = {
    		zoom: 15,
    		center: pos
  	};
  	var map = new google.maps.Map(mapa,mapOptions);
  	var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Te encontré'
      });

    map.setCenter(pos);
	
}
function error(err){
	console.log(err);
}
function enviaComanda(){
	var comanda=JSON.parse(localStorage.getItem(mesa));
	socket.emit("enviaComanda",{mesa:mesa,platillos:comanda});
	alert("Comanda enviada a la cocina");
}




