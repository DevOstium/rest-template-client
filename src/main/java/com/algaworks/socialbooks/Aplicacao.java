package com.algaworks.socialbooks;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import com.algaworks.socialbooks.client.LivrosClient;
import com.algaworks.socialbooks.domain.Livro;

public class Aplicacao {

	
	public static void main(String[] args) throws ParseException {
	
		LivrosClient cliente = new LivrosClient("http://localhost:8080/socialbooksapi", "algaworks", "123");
		
		List<Livro> listaLivros = cliente.listar();

		for(Livro livro : listaLivros) {
			System.out.println("Livro: " + livro.getNome());
		}
		
		Livro livro = new Livro();
		livro.setNome("Git passo");
		livro.setEditora("Lira");


		SimpleDateFormat publicacao= new SimpleDateFormat("dd/MM/yyyy");
		livro.setPublicacao(publicacao.parse("01/01/2016"));
		
		livro.setResumo("Este livro � bom");
		
		String localizacao = cliente.Salvar(livro);
		
		System.out.println("URI do livro salvo:  " + localizacao);
		
		Livro livroBuscado = cliente.buscar(localizacao);
		
		System.out.println("Livro buscado: " + livroBuscado.getNome());
	}
	
}


























