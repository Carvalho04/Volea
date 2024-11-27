package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Aula;

public interface AulaRepository extends JpaRepository<Aula, Integer> {
    
    
    //Buscando por Ativos e Inativos
    List<Aula> findByAtivoTrue();
    List<Aula> findByAtivoFalse();
}
