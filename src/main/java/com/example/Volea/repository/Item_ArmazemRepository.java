package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Item_Armazem;

public interface Item_ArmazemRepository extends JpaRepository<Item_Armazem, Integer> {
 
    //Buscando por Ativos e Inativos
    List<Item_Armazem> findByAtivoTrue();
    List<Item_Armazem> findByAtivoFalse();
}
