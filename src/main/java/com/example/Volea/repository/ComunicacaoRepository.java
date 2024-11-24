package com.example.Volea.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Comunicacao;

public interface ComunicacaoRepository extends JpaRepository<Comunicacao, Integer> {
    
}
