package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Plano;

public interface PlanoRepository extends JpaRepository<Plano, Integer> {
 
    //Buscando por Ativos e Inativos
    List<Plano> findByAtivoTrue();
    List<Plano> findByAtivoFalse();
}
