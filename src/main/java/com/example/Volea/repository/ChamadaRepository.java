package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Chamada;

public interface ChamadaRepository extends JpaRepository<Chamada, Integer> {

    //Buscando por Ativos e Inativos
    List<Chamada> findByAtivoTrue();
    List<Chamada> findByAtivoFalse();
    
}
