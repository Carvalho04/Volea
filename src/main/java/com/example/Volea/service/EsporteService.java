package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Esporte;
import com.example.Volea.repository.EsporteRepository;

@Service
public class EsporteService {
    
    @Autowired
    private EsporteRepository EsporteRepository;


    public List<Esporte> findAllEsporte(){
        return EsporteRepository.findAll();       
    }


    public Optional<Esporte> findEsporteById(int id) {
        return EsporteRepository.findById(id);
    }

    public Esporte saveEsporte(Esporte esporte) {
        return EsporteRepository.save(esporte);
    }

    public Esporte atualizaEsporte(Esporte esporte) {
        return EsporteRepository.save(esporte);
    }
    

    public void deleteEsporte(int id) {
        EsporteRepository.deleteById(id);
    }

   //Buscando por ativos e inativos
   public List<Esporte> getEsportesAtivos() {
        return EsporteRepository.findByAtivoTrue();
    }

    public List<Esporte> getEsportesInativos() {
        return EsporteRepository.findByAtivoFalse();
    }

}
    