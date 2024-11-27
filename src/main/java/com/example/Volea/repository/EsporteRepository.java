package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Esporte;

public interface EsporteRepository extends JpaRepository<Esporte, Integer> {

    //Buscando por Ativos e Inativos
    List<Esporte> findByAtivoTrue();
    List<Esporte> findByAtivoFalse();
    
}
