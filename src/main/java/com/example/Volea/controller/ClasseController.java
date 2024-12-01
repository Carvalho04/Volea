package com.example.Volea.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
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

import com.example.Volea.dto.ClasseDTO;
import com.example.Volea.entity.Classe;
import com.example.Volea.entity.Esporte;
import com.example.Volea.entity.Usuario;
import com.example.Volea.repository.ClasseRepository;
import com.example.Volea.repository.EsporteRepository;
import com.example.Volea.repository.UsuarioRepository;
import com.example.Volea.service.ClasseService;

@RestController
@RequestMapping("api/classes")
public class ClasseController {

    @Autowired
    private ClasseService classeService;
    @Autowired
    private EsporteRepository esporteRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;



    @GetMapping
    public List<Classe> getAllClasses() {
        return classeService.findAllClasse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Classe> getClasseById(@PathVariable int id) {
        Optional<Classe> classe = classeService.findClasseById(id);
        return classe.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ativos")
    public List<Classe> getClassesAtivos() {
        return classeService.getClassesAtivos();
    }

    @GetMapping("/inativos")
    public List<Classe> getClassesInativos() {
        return classeService.getClassesInativos();
    }   

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarClasse(@PathVariable int id) {
        Optional<Classe> classeOptional = classeService.findClasseById(id);
        if (classeOptional.isPresent()) {
            Classe classe = classeOptional.get();
            classe.setAtivo(true); 
            classeService.saveClasse(classe); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarClasse(@PathVariable int id) {
        Optional<Classe> classeOptional = classeService.findClasseById(id);
        if (classeOptional.isPresent()) {
            Classe classe = classeOptional.get();
            classe.setAtivo(false); 
            classeService.saveClasse(classe);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Classe> createClasse(@RequestBody ClasseDTO classeDTO) {
    // Cria a nova instância da classe
    Classe classe = new Classe();
    classe.setNome(classeDTO.getNome());
    classe.setDescricao(classeDTO.getDescricao());

    Esporte esporte = esporteRepository.findById(classeDTO.getEsporteId())
            .orElseThrow(() -> new IllegalArgumentException("Esporte não encontrado com ID: " + classeDTO.getEsporteId()));

    classe.setEsporte(esporte);


    // Salva a Classe no banco de dados
    Classe savedClasse = classeService.saveClasse(classe);

    // Retorna a Classe salva com status OK
    return ResponseEntity.ok(savedClasse);
}

    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable int id) {
        classeService.deleteClasse(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{turmaId}/matricular")
    public ResponseEntity<?> matricularAluno(@PathVariable int turmaId, @RequestBody int     usuarioId) {
        boolean matriculado = classeService.matricularAluno(turmaId, usuarioId);
        
        if (matriculado) {
            return ResponseEntity.ok("Aluno matriculado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("A turma já está cheia ou o aluno já está matriculado.");
        }
    }
    
    

    
    

    @PutMapping("/{id}")
    public ResponseEntity<Classe> updateClasse(@PathVariable int id, @RequestBody ClasseDTO classeDTO) {
        Optional<Classe> existingClasseOptional = classeService.findClasseById(id);
        
        if (existingClasseOptional.isPresent()) {
            Classe existingClasse = existingClasseOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (classeDTO.getNome() != null) {
                existingClasse.setNome(classeDTO.getNome());
            }
            if (classeDTO.getDescricao() != null) {
                existingClasse.setDescricao(classeDTO.getDescricao());
            }
    
            Classe updatedClasse = classeService.atualizaClasse(existingClasse);
            return ResponseEntity.ok(updatedClasse);
        } else {
            return ResponseEntity.notFound().build();
        }


        
    }
}
