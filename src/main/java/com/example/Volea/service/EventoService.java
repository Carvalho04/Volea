package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Esporte;
import com.example.Volea.entity.Evento;
import com.example.Volea.repository.EsporteRepository;
import com.example.Volea.repository.EventoRepository;

@Service
public class EventoService {
    
    @Autowired
    private EventoRepository EventoRepository;


    public List<Evento> findAllEvento(){
        return EventoRepository.findAll();       
    }


    public Optional<Evento> findEventoById(int id) {
        return EventoRepository.findById(id);
    }

    public Evento saveEvento(Evento evento) {
        return EventoRepository.save(evento);
    }

    public Evento atualizaEvento(Evento evento) {
        return EventoRepository.save(evento);
    }
    

    public void deleteEvento(int id) {
        EventoRepository.deleteById(id);
    }

   //Buscando por ativos e inativos
   public List<Evento> getEventosAtivos() {
        return EventoRepository.findByAtivoTrue();
    }

    public List<Evento> getEventoInativos() {
        return EventoRepository.findByAtivoFalse();
    }   

}
    