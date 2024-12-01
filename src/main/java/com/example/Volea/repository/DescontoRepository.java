package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Desconto;

public interface DescontoRepository extends JpaRepository<Desconto, Integer> {
 
    //Buscando por Ativos e Inativos
    List<Desconto> findByAtivoTrue();
    List<Desconto> findByAtivoFalse();
}
