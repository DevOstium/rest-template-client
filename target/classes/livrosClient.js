$(function() {
	$(".js-load-books").on('click', function() {
		$.ajax({
				url: "http://localhost:8080/socialbooksapi/livros",
				type: "get",
				headers: {
					"Authorization" : "Basic YWxnYXdvcmtzOjEyMw=="
				},
				success: function(response) {
					desenhaTabela(response);
				}
		});
	})
});

function desenhaTabela(dados) {
	$(".js-books-table-body tr").remove();
	for(var i=0; i < dados.length; i++) {
		desenhaLinha(dados[i]);
	}
}

function desenhaLinha(linha) {
	var linhaTabela = $("<tr/>");
	$(".js-books-table-body").append(linhaTabela);
	linhaTabela.append("<td>" + linha.id + "</td>");
	linhaTabela.append("<td>" + linha.nome + "</td>");
	linhaTabela.append("<td>" + linha.editora + "</td>");
	linhaTabela.append("<td>" + linha.publicacao + "</td>");
	linhaTabela.append("<td>" + linha.resumo + "</td>");
}

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



