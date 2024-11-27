package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Comunicacao;

public interface ComunicacaoRepository extends JpaRepository<Comunicacao, Integer> {
 
    //Buscando por Ativos e Inativos
    List<Comunicacao> findByAtivoTrue();
    List<Comunicacao> findByAtivoFalse();
}
