package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Classe;

public interface ClasseRepository extends JpaRepository<Classe, Integer> {
    
    //Buscando por Ativos e Inativos
    List<Classe> findByAtivoTrue();
    List<Classe> findByAtivoFalse();
}
