jQuery.noConflict();
/**
 * algunos exploradores no soportan Object.create() 
 * esto es un emulador.
 * 
 */
if(typeof Object.create !== "function") { 
	Object.create = function (o)
	{ function F() {}
		F.prototype = o; 
		return new F(); 
	}; 
}

