package com.example.Volea.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Volea.dto.AulaDTO;
import com.example.Volea.dto.AulaRequestDTO;
import com.example.Volea.dto.ClasseDTO;
import com.example.Volea.entity.Armazem;
import com.example.Volea.entity.Aula;
import com.example.Volea.entity.Classe;
import com.example.Volea.entity.Esporte;
import com.example.Volea.entity.Usuario;
import com.example.Volea.repository.AulaRepository;
import com.example.Volea.repository.ClasseRepository;
import com.example.Volea.repository.UsuarioRepository;
import com.example.Volea.service.AulaService;

@RestController
@RequestMapping("api/aulas")
public class AulaController {

    @Autowired
    private AulaService aulaService;

    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AulaRepository aulaRepository;

    @GetMapping
    public List<Aula> getAllAulas() {
        return aulaService.findAllAula();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aula> getAulaById(@PathVariable int id) {
        Optional<Aula> aula = aulaService.findAulaById(id);
        return aula.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Listar ativos e inativos
    @GetMapping("/ativos")
    public List<Aula> getAulaAtivos() {
        return aulaService.getAulasAtivos();
    }

    @GetMapping("/inativos")
    public List<Aula> getAulasInativos() {
        return aulaService.getAulasInativos();
    }

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarAula(@PathVariable int id) {
        Optional<Aula> aulaOptional = aulaService.findAulaById(id);
        if (aulaOptional.isPresent()) {
            Aula aula = aulaOptional.get();
            aula.setAtivo(true); 
            aulaService.saveAula(aula); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarAula(@PathVariable int id) {
        Optional<Aula> aulaOptional = aulaService.findAulaById(id);
        if (aulaOptional.isPresent()) {
            Aula aula = aulaOptional.get();
            aula.setAtivo(false); 
            aulaService.saveAula(aula);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Aula> createAula(@RequestBody AulaDTO aulaDTO) {
    // Cria a nova instância da classe
    Aula aula = new Aula();
    aula.setNome(aulaDTO.getNome());
    aula.setData(aulaDTO.getData());

    Classe classe = classeRepository.findById(aulaDTO.getClasseId())
            .orElseThrow(() -> new IllegalArgumentException("Classe não encontrado com ID: " + aulaDTO.getClasseId()));

    aula.setClasse(classe);

    Usuario professor = usuarioRepository.findById(aulaDTO.getProfessorId())
    .orElseThrow(() -> new IllegalArgumentException("Professor não encontrado com ID: " + aulaDTO.getProfessorId()));

    aula.setProfessor(professor);

    // Salva a Classe no banco de dados
    Aula savedAula = aulaService.saveAula(aula);

    // Retorna a Classe salva com status OK
    return ResponseEntity.ok(savedAula);
}


    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAula(@PathVariable int id) {
        aulaService.deleteAula(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aula> updateAula(@PathVariable int id, @RequestBody AulaDTO aulaDTO) {
        Optional<Aula> existingAulaOptional = aulaService.findAulaById(id);
        
        if (existingAulaOptional.isPresent()) {
            Aula existingAula = existingAulaOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (aulaDTO.getNome() != null) {
                existingAula.setNome(aulaDTO.getNome());
            }
            if (aulaDTO.getData() != null) {
                existingAula.setData(aulaDTO.getData());
            }
            

            Aula updatedAula = aulaService.atualizaAula(existingAula);
            return ResponseEntity.ok(updatedAula);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
