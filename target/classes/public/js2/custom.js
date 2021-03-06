if (typeof String.prototype.startsWith != 'function') {
	// see below for better implementation!
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) == 0;
	};
}

splasherrors = false;

ajaxing = false;

datatablespt = {
    "sEmptyTable":     "Nenhum registro encontrado ",
    "sInfo": "Mostrando _START_ até _END_ de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando 0 até 0 de 0 Registros",
    "sInfoFiltered": "(Filtrado de _MAX_)",
    "sInfoPostFix":    "",
    "sInfoThousands":  ".",
    "sLengthMenu": "Mostrar _MENU_ registros por página",
    "sLoadingRecords": "Carregando...",
    "sProcessing":     "Processando...",
    "sZeroRecords": "Nenhum registro encontrado",
    "sSearch": "Pesquisar",
    "oPaginate": {
        "sNext": "Próximo",
        "sPrevious": "Anterior",
        "sFirst": "Primeiro",
        "sLast":"Último"
    },
    "oAria": {
        "sSortAscending":  ": Ordenar colunas de forma ascendente",
        "sSortDescending": ": Ordenar colunas de forma descendente"
    }
}




//function showErrors(erros, container, prefix) {
//	container = container || '#msg';
//	prefix = prefix || 'edt-';
//	var result = '<div class="alert alert-danger">';
//	for ( var x = 0; x < erros.length; x++) {
//		result += erros[x].erro + '<br />';
//		//$('#' + prefix + erros[x].campo).parent().addClass("has-error");
//	}
//	if(container instanceof jQuery){
//		container.html(result + '</div>');
//	}else{
//		$(container).html(result + '</div>');
//	}
//	
//	if(splasherrors){
//		redmsg(result);
//	}
//}

function greenmsg(txt) {
	toastr.options = {
		"closeButton" : false,
		"debug" : false,
		"positionClass" : "toast-bottom-right",
		"onclick" : null,
		"showDuration" : "7000",
		"hideDuration" : "1000",
		"timeOut" : "5000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	}
	toastr.success(" ", txt);
}
function redmsg(txt) {
	toastr.options = {
			"closeButton" : false,
			"debug" : false,
			"positionClass" : "toast-bottom-right fff",
			"onclick" : null,
			"showDuration" : "7000",
			"hideDuration" : "1000",
			"timeOut" : "5000",
			"extendedTimeOut" : "1000",
			"showEasing" : "swing",
			"hideEasing" : "linear",
			"showMethod" : "fadeIn",
			"hideMethod" : "fadeOut"
	}
	toastr.error(" ", txt);
}
//esse metodo faz um objeto json sair do formato json para o formato 'form-data' do POST-ex: c.id=1&c.nome='victor'&c.etc='etc'
function oldencodeToPOST(j){
    var ret = '';
    var idx = 0;
    for(c in j){
    	//tenta arrumar as virgulas para pontos
    	var val = j[c];
    	if(typeof val !== 'number'){
    		val=val+"";
	    	if(val && ~val.indexOf(',')){
	    		//tem virg, tenta descobrir um number
	    		var t = val.replace(',', '.');
	    		t = Number(t);
	    		if(typeof t === 'number')
	    			j[c] = t;
			}
    	}
    	
    	if(idx!=0)
    		ret += '&';
    	ret += c + '=' + j[c];
    	idx++;
    }

	return ret;
}
































//esse metodo faz um objeto json sair do formato json para o formato 'form-data' do POST-ex: c.id=1&c.nome='victor'&c.etc='etc'
function encodeToPOST(j){
  var ret = '';
  var idx = 0;
  for(c in j){
  	//tenta arrumar as virgulas para pontos
  	var val = j[c];
  	j[c] = encodeNumberToPost(val);
  	if(idx!=0)
  		ret += '&';
  	ret += c + '=' + j[c];
  	idx++;
  }
	return ret;
}

function encodeNumberToPost(val){
	if(val==null || val==undefined || val instanceof Array || val==='null'){
		if((val+'')==='null')
			val = '';
		return val;
	}
	if(	isNaN( Number(val.replace(',','')) ) ){
		return val;
	}
	if(typeof val !== 'number'){			
			val=val+"";			
		if(val && ~val.indexOf(',')){			
				//tem virg ou ponto, tenta descobrir um number			
				var t = val.replace('.','').replace(',', '.');			
				t = Number(t);			
				if(typeof t === 'number' && !isNaN(t)){
					return t;			
					
				}			
			}			
	}			
	return val;			
}			
		
function encodeFORMtoPost(form){			
	var j = {};			
	form.find('input').each(function(idx, val){			
			val = $(val);			
			j[val.attr('name')] = val.val();			
	});			
	form.find('textarea').each(function(idx, val){			
		val = $(val);			
		j[val.attr('name')] = val.val();			
	});			
	form.find('select').each(function(idx, val){			
			val = $(val);			
			j[val.attr('name')] = val.val();			
	});			
	
	return encodeToPOST(j);			
}


function isAlphanumeric(txt){
  if( /[^a-zA-Z0-9]/.test( txt ) ) {
//     alert('Input is not alphanumeric');
     return false;
  }
  return true; 
}



/*
 * este plugin faz o editor de rows dos cadastros
 * 
 * */
function grid(cfg){
	var select = cfg.select;
	var table = cfg.table;
	var btnadd = cfg.btnadd;
	var parentName = cfg.parentName;
	var name = cfg.name;
	var saveurl = cfg.saveurl;
	var deleteurl = cfg.deleteurl;
	var parentIdName = cfg.parentIdName;
	//custom input transformers
	var fnTextEdit = cfg.fnTextEdit;
	var fnTextEditDone = cfg.fnTextEditDone;
	var fnSaveDone = cfg.fnSaveDone;
	var fnDeleteDone = cfg.fnDeleteDone;
	var fnTextSave = cfg.fnTextSave;
	var fnSelectEdit = cfg.fnSelectEdit;
	var fnSelectSave = cfg.fnSelectSave;
	
    $(btnadd).click(function(){
    	console.log(cfg);
    	var first = $(table + ' tbody>tr:first').clone();
    	if(first.length===0) {
    		alert('nao encontrei a primeira linha da tabela ' + cfg.table);
    	}
    	first.attr('id', '');
    	first.addClass('warning');
    	first.removeClass('success');
    	first.children('td').html('');//clear people
    	first.children('td:last').append($('.btn-edit:first').clone().show());
    	first.children('td:last').append($('.btn-save:first').clone().hide());
        $(table + ' tr:last').after(first);
    });
    
    
    $(table).on( "click", '.btn-delete', function( e ) {
    	e.preventDefault();
    	if(ajaxing){
    		return false;
    	}
    	var target = $(e.target).closest('a');//target eh o btn clicado
    	console.log( deleteurl);
    	ajaxing = true;
    	var j = {};
		j.id = target.closest('tr').attr('id');
		$.ajax({
            type: "POST",
            url: deleteurl,
            data: oldencodeToPOST(j),
            dataType : 'json',
            success: function (msg) {
                $(document).ajaxComplete(function (event, request, settings) {
                	$('.has-error').removeClass('has-error');
                	$('#modal-editar-orcamento #msg').html('');
                	$(document).off('ajaxComplete').off('ajaxSend');
                	ajaxing = false;
                	if(msg.ok){
                		greenmsg("Removido com sucesso!");
                		fnDeleteDone();
                	}else{
						//errors       
                		showErrors(msg, '#modal-editar #msg');
                	}
                 });
            }
        });
    });
	
    //prepara os btns de edit e save
    $(table).on( "click", ".btn-edit", function( e ) {
		//console.log('edit click');
    	//tranforma a row em edit mode
    	var target = $(e.target).closest('a');//target eh o btn clicado
    	//loop em cada td do seu respectivo tipo
    	target.closest('tr').children('td.text-edit').each(function(index, value){
    		$(this).html("<input class='form-control "+$(this).data("input-class")+"' type='text' name='"+$(this).attr('id')+"' value='"+$(this).text()+"'/>");
    	});
    	
    	
    	target.closest('tr').children('td.check-edit').each(function(index, value){
    		var dc = $(this).data('check');
    		var c = $("<input class='bigcheck' type='checkbox' "+ dc +" />");
    		c.click(function(){
    			$(this).val(this.checked ? 'on' : 'off');
    			console.log($(this).val());
    		});
    		//isso eh pra qndo editar depois de criar nova linha
    		if(dc===''){
    			c.val('off');
    		}
    		
    		$(this).html(c);
    	});
    	
    	
    	if(fnSelectEdit){
    		fnSelectEdit(target.closest('tr').children('td.select-edit'));
    	} else {
	    	target.closest('tr').children('td.select-edit').each(function(index, value){
				// meee de algum botar um select com options aki
				var leid =$(this).children('span').data('selected');//id que vai ser o selected
				var sel = $(select).clone();
				sel.val(leid);
				sel.show();
				$(this).html(sel);
	    	});
    	}
		target.hide();
		target.siblings().show();
		 $(".phone").inputmask({"mask": "(99) 99999-9999"});
         $(".niver").inputmask({"mask": "99/99/9999"});
		if(fnTextEditDone)
			fnTextEditDone();
    } ); 
    
    $(table).on( "click", ".btn-save", function( e ) {
    	e.preventDefault();
    	var j = {};
		//	console.log('save click');
    	//tranforma a row em edit mode
    	//aqui vai voltar para view mode e salvar por ajax POST
    	var target = $(e.target).closest('a');//target eh o btn clicado
    	target.closest('tr').removeClass('warning');

    	j['x.id']=target.closest('tr').attr('id');//pega o id do contato e bota no json
    	//um desses 2 vai dar certo (jpa vs id direto no db)
    	j['x.'+parentName+'.id']=$('#id'+parentName).val();//pega o id do cliente bota no json
    	j['x.id'+parentName]=$('#id'+parentName).val();//pega o id do cliente bota no json
    	target.closest('tr').children('td.text-edit').each(function(index, value){
    		//guarda o valor do text
    		var val = $(this).children('input[type="text"]').val();
    		$(this).html(val);
    		j[""+$(this).attr('name')+""] = val;
    	});
    	
    	target.closest('tr').children('td.check-edit').each(function(index, value){
    		//guarda o valor do checkbox
    		var val = $(this).children('input[type="checkbox"]').val();
    		var checked = val === 'on';
    		$(this).data('check', (checked ? "checked" : ""));
    		$(this).html("<input class='bigcheck' disabled type='checkbox' " + (checked ? "checked" : "") + "/>");
    		j[""+$(this).attr('name')+""] = checked;
    	});
    	if(fnSelectSave){
    		fnSelectSave(target.closest('tr').children('td.select-edit'), j);
    	} else {
	    	target.closest('tr').children('td.select-edit').each(function(index, value){
	    		var idselecionado = $(this).children('select').find('option:selected').val();
	    		var nomeselecionado = $(this).children('select').find('option:selected').html();
	    		j[""+$(this).attr('name')+""] = idselecionado || -1;
	    		$(this).html("<span data-selected='"+idselecionado+"' >"+nomeselecionado+"</span>");
	    	});
    	}
		target.hide();
		target.siblings().show();
		//aqui ta pronto pra fazer um ajax q salva o objeto
		$.ajax({
            type: "POST",
            url: saveurl,
            data: oldencodeToPOST(j),
            dataType : 'json',
            success: function (msg) {
                $(document).ajaxComplete(function (event, request, settings) {
                	$('.has-error').removeClass('has-error');
                	$('#modal-editar #msg').html('');
                	$(document).off('ajaxComplete').off('ajaxSend');
                	if(msg.ok){
                		greenmsg(name + " salvo com sucesso!");
                		target.closest('tr')
//                		.removeClass("danger")
//                		.addClass("success")
                		.attr('id', msg.newid);//.children("td:first").html(msg.newid);
                		if(fnSaveDone)
                			fnSaveDone(msg);
                	}
                	else if(msg.xok){
                		greenmsg(name + " salvo com sucesso!");

                		fnSaveDone(msg);
//                		$(e.target).closest('td').find('.btn-edit').trigger('click');
                	}
                	else{
						//errors       
                		showErrors(msg, '#modal-editar #msg');
//                		target.closest('tr').removeClass("success");
//                		target.closest('tr').addClass("danger");
                		$(e.target).closest('td').find('.btn-edit').trigger('click');
                	}
                 });
            }
        });
		
    } );  
}

/*
bindWithDelay jQuery plugin
Author: Brian Grinstead
MIT license: http://www.opensource.org/licenses/mit-license.php

http://github.com/bgrins/bindWithDelay
http://briangrinstead.com/files/bindWithDelay

Usage:
    See http://api.jquery.com/bind/
    .bindWithDelay( eventType, [ eventData ], handler(eventObject), timeout, throttle )

Examples:
    $("#foo").bindWithDelay("click", function(e) { }, 100);
    $(window).bindWithDelay("resize", { optional: "eventData" }, callback, 1000);
    $(window).bindWithDelay("resize", callback, 1000, true);
*/

(function($) {

$.fn.bindWithDelay = function( type, data, fn, timeout, throttle ) {

    if ( $.isFunction( data ) ) {
        throttle = timeout;
        timeout = fn;
        fn = data;
        data = undefined;
    }

    // Allow delayed function to be removed with fn in unbind function
    fn.guid = fn.guid || ($.guid && $.guid++);

    // Bind each separately so that each element has its own delay
    return this.each(function() {

        var wait = null;

        function cb() {
            var e = $.extend(true, { }, arguments[0]);
            var ctx = this;
            var throttler = function() {
                wait = null;
                fn.apply(ctx, [e]);
            };

            if (!throttle) { clearTimeout(wait); wait = null; }
            if (!wait) { wait = setTimeout(throttler, timeout); }
        }

        cb.guid = fn.guid;

        $(this).bind(type, data, cb);
    });
};

})(jQuery);

$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


// paleta de cores do cashup
cashupPalette = ["#10e8c4","#9459f3","#143ecc","#00beed","#a16410","#0077f6","#33cc66","#ff6233","#6070c2","#edd500","#ed8a00"];
cashupTheme = {
		name:'cashuptheme',
	char:{	commonSeriesSettings: {
            label: {
                font: {color:'#000'}
            }
        }
	}
}

function arrayToGETParams(values, name){
	var ret = '';
	for(var i=0; i<values.length;i++){
		ret += '&'+name+'='+values[i];
	}
	return ret;
}

//Settings object that controls default parameters for library methods:
accounting.settings = {
	currency: {
		symbol : "R$ ",   // default currency symbol is '$'
		format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
		decimal : ",",  // decimal point separator
		thousand: ".",  // thousands separator
		precision : 2   // decimal places
	},
	number: {
		precision : 0,  // default precision on numbers is 0
		thousand: ".",
		decimal : ","
	}
}

function formatPerc(le, signal){
	return accounting.formatNumber(le, 2) + (signal ? '%' : '');
}
function formatInt(le){
	return accounting.formatNumber(le, 0);
}
function formatMoney(le){
	return accounting.formatMoney(le);
}

function rs(){
	$('.money').each(accounting.formatMoney( $(this).text() ));
}

function uuid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

function days_between(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

function defaultFor(arg, val) { return typeof arg !== 'undefined' ? arg : val; }

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&amp;|$)').exec(location.search)||[,null])[1]
    );
}



(function() {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var short_days = ['Do','Se','Te','Qa','Qi','Sx','Sá'];

    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    Date.prototype.getMonthName = function() {
        return months[ this.getMonth() ];
    };
    Date.prototype.getDayName = function() {
        return days[ this.getDay() ];
    };
    Date.prototype.getShortDayName = function() {
    	return short_days[ this.getDay() ];
    };
})();


$('body').on('click', '.panel-collapser', function(ev)
		{
			ev.preventDefault();
			
			var $this = $(this),
				$panel = $this,
				$body = $panel.children('.panel-body, .table'),
				do_collapse = ! $panel.hasClass('panel-collapse');
			
//			if($panel.is('[data-collapsed="1"]'))
//			{
//				$panel.attr('data-collapsed', 0);
//				$body.hide();
//				do_collapse = false;
//			}
			
			if(do_collapse)
			{
				$body.slideUp('normal', fit_main_content_height);
				$panel.addClass('panel-collapse');
			}
			else
			{				
				$body.slideDown('normal', fit_main_content_height);
				$panel.removeClass('panel-collapse');
			}
		});


function gt(num, what){
	return num==undefined ? false : num > 0;
}