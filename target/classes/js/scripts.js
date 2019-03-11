$(document).ready(function() {
    $('#dataTable').DataTable({
    	"oLanguage":{    		
    		"sLengthMenu": "Exibir _MENU_ por página",
                "sZeroRecords": "Nenhum dado encontrado.",
                "sInfo": "Mostrando _START_ de _TOTAL_  registro(s)",
               "sInfoEmpty": "Nenhum registro para ser exibido",
               "sInfoFiltered": "(Filtrado _TOTAL_ de _MAX_  registro(s))",
               "sSearch":"Pesquisar: ",
               "oPaginate": {
                         "sFirst": "Primeiro",
                         "sLast": "Ultimo",
                        "sNext": "Proximo",
                        "sPrevious": "Anterior" 		    	  
    		}
    	}
    });
} );