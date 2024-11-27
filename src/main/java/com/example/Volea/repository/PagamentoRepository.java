package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Integer> {

    //Buscando por Ativos e Inativos
    List<Pagamento> findByAtivoTrue();
    List<Pagamento> findByAtivoFalse();
}
