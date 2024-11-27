package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Comunicacao;
import com.example.Volea.entity.Esporte;
import com.example.Volea.repository.ComunicacaoRepository;
import com.example.Volea.repository.EsporteRepository;

@Service
public class ComunicacaoService {
    
    @Autowired
    private ComunicacaoRepository ComunicacaoRepository;


    public List<Comunicacao> findAllComunicacao(){
        return ComunicacaoRepository.findAll();       
    }


    public Optional<Comunicacao> findComunicacaoById(int id) {
        return ComunicacaoRepository.findById(id);
    }

    public Comunicacao saveComunicacao(Comunicacao comunicacao) {
        return ComunicacaoRepository.save(comunicacao);
    }

    public Comunicacao atualizaComunicacao(Comunicacao comunicacao) {
        return ComunicacaoRepository.save(comunicacao);
    }
    

    public void deleteComunicacao(int id) {
        ComunicacaoRepository.deleteById(id);
    }

    //Buscando por ativos e inativos
   public List<Comunicacao> getComunicacoesAtivos() {
        return ComunicacaoRepository.findByAtivoTrue();
    }

    public List<Comunicacao> getComunicacoesInativos() {
        return ComunicacaoRepository.findByAtivoFalse();
    }
   

}
    