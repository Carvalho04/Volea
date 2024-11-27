package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Armazem;

public interface ArmazemRepository extends JpaRepository<Armazem, Integer> {

    //Buscando por Ativos e Inativos
    List<Armazem> findByAtivoTrue();
    List<Armazem> findByAtivoFalse();
}
