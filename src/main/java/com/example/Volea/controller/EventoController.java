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
            if (eventoDTO.getDesc() != null) {
                existingEvento.setDesc(eventoDTO.getDesc());
            }
            if (eventoDTO.getDataPublic() != null) {
                existingEvento.setDataPublic(eventoDTO.getDataPublic());
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