package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Graduacao;
import com.example.Volea.repository.GraduacaoRepository;

@Service
public class GraduacaoService {
    
    @Autowired
    private GraduacaoRepository GraduacaoRepository;


    public List<Graduacao> findAllGraduacao(){
        return GraduacaoRepository.findAll();       
    }


    public Optional<Graduacao> findGraduacaoById(int id) {
        return GraduacaoRepository.findById(id);
    }

    public Graduacao saveGraduacao(Graduacao graduacao) {
        return GraduacaoRepository.save(graduacao);
    }

    public Graduacao atualizaGraduacao(Graduacao graduacao) {
        return GraduacaoRepository.save(graduacao);
    }
    

    public void deleteGraduacao(int id) {
        GraduacaoRepository.deleteById(id);
    }

   

}
    