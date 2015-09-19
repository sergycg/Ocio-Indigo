/* Set the defaults for DataTables initialisation */
jQuery.extend( true, jQuery.fn.dataTable.defaults, {
	"sPaginationType": "bootstrap",
	"iDisplayLength" :  50,
	"oLanguage" : { 
		"sInfo" : "Mostrando _START_ a _END_ de _TOTAL_ registros",
		"sZeroRecords":    " ",
		"sEmptyTable": "No se encontraron resultados",
    	"sInfoEmpty" : " ",
        "sSearch" : "Buscar:",
        "sInfoFiltered" : "(Filtrando _MAX_ registros)",
        "sLoadingRecords" : "Cargando...",
        //"sProcessing" : "Procesando...",
        "sLengthMenu" : "Mostrar _MENU_ registros",
        "sNext": "Siguiente",
        "sPrevious": "Anterior",
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
	}
} );

/* Default class modification */
jQuery.extend( jQuery.fn.dataTableExt.oStdClasses, {
	"sWrapper": "dataTables_wrapper form-inline"
} );


/* API method to get paging information */
jQuery.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
	return {
		"iStart":         oSettings._iDisplayStart,
		"iEnd":           oSettings.fnDisplayEnd(),
		"iLength":        oSettings._iDisplayLength,
		"iTotal":         oSettings.fnRecordsTotal(),
		"iFilteredTotal": oSettings.fnRecordsDisplay(),
		"iPage":          oSettings._iDisplayLength === -1 ?
			0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
		"iTotalPages":    oSettings._iDisplayLength === -1 ?
			0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
	};
};


/* Bootstrap style pagination control */
jQuery.extend( jQuery.fn.dataTableExt.oPagination, {
	"bootstrap": {
		"fnInit": function( oSettings, nPaging, fnDraw ) {
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function ( e ) {
				e.preventDefault();
				if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
					fnDraw( oSettings );
				}
			};

			jQuery(nPaging).addClass('pagination').append(
				'<ul>'+
					'<li class="prev disabled"><a href="#">&larr; Anterior</a></li>'+
					'<li class="next disabled"><a href="#">Siguiente &rarr; </a></li>'+
				'</ul>'
			);
			var els = jQuery('a', nPaging);
			jQuery(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
			jQuery(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
		},

		"fnUpdate": function ( oSettings, fnDraw ) {
			var iListLength = 5;
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

			if ( oPaging.iTotalPages < iListLength) {
				iStart = 1;
				iEnd = oPaging.iTotalPages;
			}
			else if ( oPaging.iPage <= iHalf ) {
				iStart = 1;
				iEnd = iListLength;
			} else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
				iStart = oPaging.iTotalPages - iListLength + 1;
				iEnd = oPaging.iTotalPages;
			} else {
				iStart = oPaging.iPage - iHalf + 1;
				iEnd = iStart + iListLength - 1;
			}

			for ( i=0, ien=an.length ; i<ien ; i++ ) {
				// Remove the middle elements
				jQuery('li:gt(0)', an[i]).filter(':not(:last)').remove();

				// Add the new list items and their event handlers
				for ( j=iStart ; j<=iEnd ; j++ ) {
					sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
					jQuery('<li '+sClass+'><a href="#">'+j+'</a></li>')
						.insertBefore( jQuery('li:last', an[i])[0] )
						.bind('click', function (e) {
							e.preventDefault();
							oSettings._iDisplayStart = (parseInt(jQuery('a', this).text(),10)-1) * oPaging.iLength;
							fnDraw( oSettings );
						} );
				}

				// Add / remove disabled classes from the static elements
				if ( oPaging.iPage === 0 ) {
					jQuery('li:first', an[i]).addClass('disabled');
				} else {
					jQuery('li:first', an[i]).removeClass('disabled');
				}

				if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
					jQuery('li:last', an[i]).addClass('disabled');
				} else {
					jQuery('li:last', an[i]).removeClass('disabled');
				}
			}
		}
	}
} );


/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ( jQuery.fn.DataTable.TableTools ) {
	// Set the classes that TableTools uses to something suitable for Bootstrap
	jQuery.extend( true, jQuery.fn.DataTable.TableTools.classes, {
		"container": "DTTT btn-group",
		"buttons": {
			"normal": "btn",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"print": {
			"info": "DTTT_print_info modal"
		},
		"select": {
			"row": "active"
		}
	} );

	// Have the collection use a bootstrap compatible dropdown
	jQuery.extend( true, jQuery.fn.DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	} );
}


/**
 * VARIABLE GLOBAL PARA ESTABLECER UN DATATABLE
 */
var objectDataTable =(function() {
	// variables y funciones privadas
	var sDomFilter = "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
		sDomWithoutFilter = "<'row-fluid'r>t<'row-fluid'<'span6'i><'span6'p>>",
		sDom = '',
		url = '',
		columns = [],
		sScrollY = '',
        bFilter = true,
        bPaginate = true,
        iDisplayLength = 50,
		fnServerParams = function(){},
		fnServerData = function (){},
		fnCreatedRow  = function() {},
		fnRowCallback = function(){return;},
		fnDrawCallback = function(){return;};	
		fnFilterClear = function(){return;};
		fnDrawCallback = function(){return;};
	function initialize(){
		this.sDom =  "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
		this.url = '';
		this.columns = [],
		this.sScrollY = '',
		this.bFilter = true,
		this.bPaginate = true,
		this.iDisplayLength = 50,
		this.fnServerParams = function(){},
		this.fnServerData = function ( sSource, aoData, fnCallback, oSettings ) {
		      oSettings.jqXHR = jQuery.ajax( {
		          "dataType": 'json',
		          "type": "POST",
		          "url": sSource,
		          "data": aoData,
		          "success": fnCallback
		    });},
		this.fnCreatedRow  = function(nRow, aoData,iDataIndex) {
	        var claseActual = '';
	        jQuery(nRow).bind({
	            mouseenter:
	                function() {
	                    claseActual = jQuery(this).attr('class');
	                    jQuery(this).removeClass();
	                    jQuery(this).addClass("resaltar");
	                },
	            mouseleave:
	                function() {
	                    jQuery(this).removeClass();
	                    jQuery(this).addClass(claseActual);
	                }
	        });   },
		this.fnRowCallback = function(){return;},
		this.fnDrawCallback = function(){return;};	
		this.fnFilterClear = function(){return;};		
		this.fnDrawCallback = function(){return;};
	}
	// API publica
	return {		
		sDomFilter : sDomFilter,
		sDomWithoutFilter : sDomWithoutFilter,
		sDom: sDom,
		url : url,
		columns : columns,
		sScrollY : sScrollY,
        bFilter : bFilter,
        bPaginate : bPaginate,
        iDisplayLength : iDisplayLength,
		fnServerParams : fnServerParams,
		fnServerData : fnServerData,
		fnCreatedRow  : fnCreatedRow ,
		fnRowCallback : fnRowCallback,
		fnDrawCallback : fnDrawCallback,
		fnFilterClear : fnFilterClear,
		initialize : initialize,
		fnDrawCallback : fnDrawCallback		
	};
	
})();

jQuery(document).ready(function(){
	
	//Se establece de manera global las características del datatable
    jQuery.fn.myDataTable = function(objectDataTable) {
    	
    	if (objectDataTable.bFilter == false){
    		objectDataTable.sDom = objectDataTable.sDomWithoutFilter;
    	}else{
    		objectDataTable.sDom = objectDataTable.sDomFilter;
    	}
    	
    	var myObject = this.dataTable({
    		"sDom": objectDataTable.sDom,
    		"bDeferRender" : true,
            //"bProcessing" : true,
            "bPaginate" : objectDataTable.bPaginate,
            "bAutoWidth" : true,
            "bSort" : true,
            "bDestroy" : true,
            "bStateSave": true,
            "iDisplayLength" :  objectDataTable.iDisplayLength,
            "bFilter" : objectDataTable.bFilter,
            "sAjaxDataProp" : "aaData",
            "sScrollY" : objectDataTable.sScrollY,
	        "sAjaxSource": objectDataTable.url,
	        "aoColumns" : objectDataTable.columns,
	        "fnServerParams" : objectDataTable.fnServerParams,
	        "fnServerData" : objectDataTable.fnServerData,
	        "fnCreatedRow" : objectDataTable.fnCreatedRow,
	        "fnRowCallback" : objectDataTable.fnRowCallback,
	        "fnDrawCallback" : objectDataTable.fnDrawCallback,
	        "fnFilterClear" : objectDataTable.fnFilterClear
        });
    	objectDataTable.initialize();
    	return myObject;
    };
			
		});