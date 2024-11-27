package com.example.Volea.controller;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Volea.dto.EventoDTO;
import com.example.Volea.entity.Evento;
import com.example.Volea.repository.EventoRepository;
import com.example.Volea.service.EventoService;

@RestController
@RequestMapping("api/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @GetMapping
    public List<Evento> getAllEventos() {
        return eventoService.findAllEvento();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> getEventoById(@PathVariable int id) {
        Optional<Evento> evento = eventoService.findEventoById(id);
        return evento.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/ativos")
    public List<Evento> getEventosAtivos() {
        return eventoService.getEventosAtivos();
    }

    @GetMapping("/inativos")
    public List<Evento> getEventosInativos() {
        return eventoService.getEventoInativos();
    }       

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarEvento(@PathVariable int id) {
        Optional<Evento> eventoOptional = eventoService.findEventoById(id);
        if (eventoOptional.isPresent()) {
            Evento evento = eventoOptional.get();
            evento.setAtivo(true); 
            eventoService.saveEvento(evento); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarEvento(@PathVariable int id) {
        Optional<Evento> eventoOptional = eventoService.findEventoById(id);
        if (eventoOptional.isPresent()) {
            Evento evento = eventoOptional.get();
            evento.setAtivo(false); 
            eventoService.saveEvento(evento);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public Evento createEvento(@RequestBody Evento evento) {
        return eventoService.saveEvento(evento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvento(@PathVariable int id) {
        eventoService.deleteEvento(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> updateEvento(@PathVariable int id, @RequestBody EventoDTO eventoDTO) {
        Optional<Evento> existingEventoOptional = eventoService.findEventoById(id);
        
        if (existingEventoOptional.isPresent()) {
            Evento existingEvento = existingEventoOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (eventoDTO.getNome() != null) {
                existingEvento.setNome(eventoDTO.getNome());
            }
            if (eventoDTO.getDescricao() != null) {
                existingEvento.setDescricao(eventoDTO.getDescricao());
            }
            if (eventoDTO.getDataEvento() != null) {
                existingEvento.setDataEvento(eventoDTO.getDataEvento());
            }

            Evento updatedEvento = eventoService.atualizaEvento(existingEvento);
            return ResponseEntity.ok(updatedEvento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
