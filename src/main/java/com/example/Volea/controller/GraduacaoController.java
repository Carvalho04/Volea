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

import com.example.Volea.entity.Graduacao;
import com.example.Volea.repository.GraduacaoRepository;
import com.example.Volea.service.GraduacaoService;

@RestController
@RequestMapping("api/graduacoes")
public class GraduacaoController {

    @Autowired
    private GraduacaoService graduacaoService;

    @GetMapping
    public List<Graduacao> getAllGraduacaos() {
        return graduacaoService.findAllGraduacao();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Graduacao> getGraduacaoById(@PathVariable int id) {
        Optional<Graduacao> graduacao = graduacaoService.findGraduacaoById(id);
        return graduacao.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Graduacao createGraduacao(@RequestBody Graduacao graduacao) {
        return graduacaoService.saveGraduacao(graduacao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGraduacao(@PathVariable int id) {
        graduacaoService.deleteGraduacao(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Graduacao> updateGraduacao(@PathVariable int id, @RequestBody Graduacao graduacao) {
        Optional<Graduacao> existingGraduacaoOptional = graduacaoService.findGraduacaoById(id);

        if (existingGraduacaoOptional.isPresent()) {
            Graduacao existingGraduacao = existingGraduacaoOptional.get();

            existingGraduacao.setDesc(graduacao.getDesc());

            Graduacao updatedGraduacao = graduacaoService.atualizaGraduacao(existingGraduacao);
            return ResponseEntity.ok(updatedGraduacao);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
