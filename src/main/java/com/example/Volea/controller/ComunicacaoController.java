package com.example.Volea.controller;

import java.sql.Date;
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

import com.example.Volea.dto.ComunicacaoDTO;
import com.example.Volea.entity.Comunicacao;
import com.example.Volea.repository.ComunicacaoRepository;
import com.example.Volea.service.ComunicacaoService;

@RestController
@RequestMapping("api/comunicacao")
public class ComunicacaoController {

    @Autowired
    private ComunicacaoService comunicacaoService;

    @GetMapping
    public List<Comunicacao> getAllComunicacaos() {
        return comunicacaoService.findAllComunicacao();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comunicacao> getComunicacaoById(@PathVariable int id) {
        Optional<Comunicacao> comunicacao = comunicacaoService.findComunicacaoById(id);
        return comunicacao.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Comunicacao createComunicacao(@RequestBody Comunicacao comunicacao) {
        return comunicacaoService.saveComunicacao(comunicacao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComunicacao(@PathVariable int id) {
        comunicacaoService.deleteComunicacao(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comunicacao> updateComunicacao(@PathVariable int id, @RequestBody ComunicacaoDTO comunicacaoDTO) {
        Optional<Comunicacao> existingComunicacaoOptional = comunicacaoService.findComunicacaoById(id);
        
        if (existingComunicacaoOptional.isPresent()) {
            Comunicacao existingComunicacao = existingComunicacaoOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (comunicacaoDTO.getNome() != null) {
                existingComunicacao.setNome(comunicacaoDTO.getNome());
            }
            if (comunicacaoDTO.getDesc() != null) {
                existingComunicacao.setDesc(comunicacaoDTO.getDesc());
            }
            if (comunicacaoDTO.getDataPublic() != null) {
                existingComunicacao.setDataPublic(comunicacaoDTO.getDataPublic());
            }

            Comunicacao updatedComunicacao = comunicacaoService.atualizaComunicacao(existingComunicacao);
            return ResponseEntity.ok(updatedComunicacao);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
