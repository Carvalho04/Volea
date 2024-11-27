package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Esporte;
import com.example.Volea.entity.Pagamento;
import com.example.Volea.repository.EsporteRepository;
import com.example.Volea.repository.PagamentoRepository;

@Service
public class PagamentoService {
    
    @Autowired
    private PagamentoRepository PagamentoRepository;


    public List<Pagamento> findAllPagamento(){
        return PagamentoRepository.findAll();       
    }


    public Optional<Pagamento> findPagamentoById(int id) {
        return PagamentoRepository.findById(id);
    }

    public Pagamento savePagamento(Pagamento pagamento) {
        return PagamentoRepository.save(pagamento);
    }

    public Pagamento atualizaPagamento(Pagamento pagamento) {
        return PagamentoRepository.save(pagamento);
    }
    

    public void deletePagamento(int id) {
        PagamentoRepository.deleteById(id);
    }

   //Buscando por ativos e inativos
   public List<Pagamento> getPagamentosAtivos() {
        return PagamentoRepository.findByAtivoTrue();
    }

    public List<Pagamento> getPagamentosInativos() {
        return PagamentoRepository.findByAtivoFalse();
    }   

}
    