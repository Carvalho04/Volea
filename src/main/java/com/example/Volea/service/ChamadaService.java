package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Chamada;
import com.example.Volea.entity.Esporte;
import com.example.Volea.repository.ChamadaRepository;
import com.example.Volea.repository.EsporteRepository;

@Service
public class ChamadaService {
    
    @Autowired
    private ChamadaRepository ChamadaRepository;


    public List<Chamada> findAllChamada(){
        return ChamadaRepository.findAll();       
    }


    public Optional<Chamada> findChamadaById(int id) {
        return ChamadaRepository.findById(id);
    }

    public Chamada saveChamada(Chamada chamada) {
        return ChamadaRepository.save(chamada);
    }

    public Chamada atualizaChamada(Chamada chamada) {
        return ChamadaRepository.save(chamada);
    }
    

    public void deleteChamada(int id) {
        ChamadaRepository.deleteById(id);
    }

    //Buscando por ativos e inativos
   public List<Chamada> getChamadasAtivos() {
        return ChamadaRepository.findByAtivoTrue();
    }

    public List<Chamada> getChamadasInativos() {
        return ChamadaRepository.findByAtivoFalse();
    }

}
    