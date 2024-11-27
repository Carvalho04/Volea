package com.example.Volea.controller;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Volea.dto.EsporteDTO;
import com.example.Volea.entity.Esporte;
import com.example.Volea.repository.EsporteRepository;
import com.example.Volea.service.EsporteService;

@RestController
@RequestMapping("api/esportes")
// @CrossOrigin(origins = "http://localhost:3000")
public class EsporteController {

    @Autowired
    private EsporteService esporteService;

    @GetMapping
    public List<Esporte> getAllEsporte() {
        return esporteService.findAllEsporte();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Esporte> getEsporteById(@PathVariable int id) {
        Optional<Esporte> esporte = esporteService.findEsporteById(id);
        return esporte.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Listar ativos e inativos
    @GetMapping("/ativos")
    public List<Esporte> getEsportesAtivos() {
        return esporteService.getEsportesAtivos();
    }

    @GetMapping("/inativos")
    public List<Esporte> getEsportesInativos() {
        return esporteService.getEsportesInativos();
    }

    @PostMapping
    public ResponseEntity<Esporte> criarEsporte(@RequestBody Esporte esporte) {
        if (esporte.getDescricao() == null || esporte.getDescricao().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        Esporte novoEsporte = esporteService.saveEsporte(esporte);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoEsporte);
    }
  
    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarEsporte(@PathVariable int id) {
        Optional<Esporte> esporteOptional = esporteService.findEsporteById(id);
        if (esporteOptional.isPresent()) {
            Esporte esporte = esporteOptional.get();
            esporte.setAtivo(true); // Define o esporte como ativo
            esporteService.saveEsporte(esporte); // Atualiza o esporte no banco
            return ResponseEntity.noContent().build(); // Retorna 204 (No Content)
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 se o esporte não existir
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarEsporte(@PathVariable int id) {
        Optional<Esporte> esporteOptional = esporteService.findEsporteById(id);
        if (esporteOptional.isPresent()) {
            Esporte esporte = esporteOptional.get();
            esporte.setAtivo(false); // Define o esporte como inativo
            esporteService.saveEsporte(esporte); // Atualiza o esporte no banco
            return ResponseEntity.noContent().build(); // Retorna 204 (No Content)
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 se o esporte não existir
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEsporte(@PathVariable int id) {
        esporteService.deleteEsporte(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Esporte> updateEsporte(@PathVariable int id, @RequestBody EsporteDTO esporteDTO) {
        Optional<Esporte> existingEsporteOptional = esporteService.findEsporteById(id);
        
        if (existingEsporteOptional.isPresent()) {
            Esporte existingEsporte = existingEsporteOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (esporteDTO.getDescricao() != null) {
                existingEsporte.setDescricao(esporteDTO.getDescricao());
            }

            Esporte updatedEsporte = esporteService.atualizaEsporte(existingEsporte);
            return ResponseEntity.ok(updatedEsporte);
        } else {
            return ResponseEntity.notFound().build();
        }
    
    
    
    }

}
