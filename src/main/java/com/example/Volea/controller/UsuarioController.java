package com.example.Volea.controller;

import java.util.List;
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

import com.example.Volea.dto.UsuarioDTO;
import com.example.Volea.entity.Tp_Usuario;
import com.example.Volea.entity.Usuario;
import com.example.Volea.repository.UsuarioRepository;
import com.example.Volea.service.UsuarioService;
@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;


    //Achar todos os usuários
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAllUsuario();
    }

    //Achar usuário por id
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable int id) {
        Optional<Usuario> usuario = usuarioService.findUsuarioById(id);
        return usuario.map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Alunos (tipo_id = 2)
    @GetMapping("/alunos")
    public ResponseEntity<List<Usuario>> getAlunos() {
        List<Usuario> alunos = usuarioService.findUsuariosByTipo(2); // Filtra os alunos (tipo = 2)
        return ResponseEntity.ok(alunos);   
    }
 
    @GetMapping("/alunos/ativos")
    public ResponseEntity<List<Usuario>> getAlunosAtivos() {
        List<Usuario> alunosAtivos = usuarioService.findUsuariosAtivosByTipo(2); // Alunos ativos (tipo = 2)
        return ResponseEntity.ok(alunosAtivos);
    }
 
    @GetMapping("/alunos/inativos")
    public ResponseEntity<List<Usuario>> getAlunosInativos() {
        List<Usuario> alunosInativos = usuarioService.findUsuariosInativosByTipo(2); // Alunos inativos (tipo = 2)
        return ResponseEntity.ok(alunosInativos);
    }

    @GetMapping("/alunos/{id}")
    public ResponseEntity<Usuario> getAlunoById(@PathVariable int id) {
       Optional<Usuario> usuario = usuarioService.findUsuarioById(id);
       return usuario.map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
   





    // Professores (tipo_id = 1)
    @GetMapping("/professores")
    public ResponseEntity<List<Usuario>> getProfessores() {
        List<Usuario> professores = usuarioService.findUsuariosByTipo(1); // Filtra os professores (tipo = 1)
        return ResponseEntity.ok(professores);
    }

    @GetMapping("/professores/ativos")
    public ResponseEntity<List<Usuario>> getProfessoresAtivos() {
        List<Usuario> professoresAtivos = usuarioService.findUsuariosAtivosByTipo(1); // Professores ativos (tipo = 1)
        return ResponseEntity.ok(professoresAtivos);
    }

    @GetMapping("/professores/inativos")
    public ResponseEntity<List<Usuario>> getProfessoresInativos() {
        List<Usuario> professoresInativos = usuarioService.findUsuariosInativosByTipo(1); // Professores inativos (tipo = 1)
        return ResponseEntity.ok(professoresInativos);
    }

    // Administradores (tipo_id = 3)
    @GetMapping("/adm")
    public ResponseEntity<List<Usuario>> getAdministradores() {
        List<Usuario> administradores = usuarioService.findUsuariosByTipo(3); // Filtra os administradores (tipo = 3)
        return ResponseEntity.ok(administradores);
    }

    @GetMapping("/adm/ativos")
    public ResponseEntity<List<Usuario>> getAdministradoresAtivos() {
        List<Usuario> administradoresAtivos = usuarioService.findUsuariosAtivosByTipo(3); // Administradores ativos (tipo = 3)
        return ResponseEntity.ok(administradoresAtivos);
    }

    @GetMapping("/adm/inativos")
    public ResponseEntity<List<Usuario>> getAdministradoresInativos() {
        List<Usuario> administradoresInativos = usuarioService.findUsuariosInativosByTipo(3); // Administradores inativos (tipo = 3)
        return ResponseEntity.ok(administradoresInativos);
    }

    //Salvar usuário
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        
        Usuario createdUsuario = usuarioService.saveUsuario(usuario);
        return ResponseEntity.ok(createdUsuario);
    }

    //Deletar usuário
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable int id) {
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    //Desativar usuário
    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarUsuario(@PathVariable int id) {
        Optional<Usuario> usuarioOptional = usuarioService.findUsuarioById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            usuario.setAtivo(false); // Define o usuário como inativo
            usuarioService.saveUsuario(usuario); // Atualiza o usuário no banco
            return ResponseEntity.noContent().build(); // Retorna 204 (No Content)
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 se o usuário não existir
        }
    }

    //Ativar usuário
    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarUsuario(@PathVariable int id) {
        Optional<Usuario> usuarioOptional = usuarioService.findUsuarioById(id);
        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            usuario.setAtivo(true); // Define o usuário como ativo
            usuarioService.saveUsuario(usuario); // Atualiza o usuário no banco
            return ResponseEntity.noContent().build(); // Retorna 204 (No Content)
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 se o usuário não existir
        }
    }    
    
    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable int id, @RequestBody UsuarioDTO usuarioDTO) {
        Optional<Usuario> existingUsuarioOptional = usuarioService.findUsuarioById(id);

        if (existingUsuarioOptional.isPresent()) {
            Usuario existingUsuario = existingUsuarioOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (usuarioDTO.getNome() != null) {
                existingUsuario.setNome(usuarioDTO.getNome());
            }
            if (usuarioDTO.getEmail() != null) {
                existingUsuario.setEmail(usuarioDTO.getEmail());
            }
            if (usuarioDTO.getPass() != null) {
                existingUsuario.setPass(usuarioDTO.getPass());
            }

            Usuario updatedUsuario = usuarioService.atualizaUsuario(existingUsuario);
            return ResponseEntity.ok(updatedUsuario);
          } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping(value = "/alunos", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> cadastroAluno(@RequestBody Usuario usuario) {
    try {
        // Verificar se o CPF ou e-mail já existem
        if (usuarioService.existsByCpf(usuario.getCpf())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erro: CPF já cadastrado.");
        }
        
        if (usuarioService.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erro: E-mail já cadastrado.");
        }

        // Verificar se a data de nascimento foi enviada e se é válida
        if (usuario.getDataNasc() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erro: Data de nascimento não fornecida.");
        }

        // Definir o tipo de usuário como 2 (aluno)
        Tp_Usuario tipo = new Tp_Usuario();
        tipo.setId(2);  // Aluno
        usuario.setTipo(tipo);

        // Salvar o aluno
        Usuario createdAluno = usuarioService.saveUsuario(usuario);
        return ResponseEntity.ok(createdAluno);

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Erro interno no servidor.");
    }
}

    //Salvar Professor
    @PostMapping(value = "/professores", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Usuario> cadastroProfessor(@RequestBody Usuario usuario) {
        // Define o tipo de usuário como 2 (professor)
        Tp_Usuario tipo =  new Tp_Usuario();
        tipo.setId(1);
        usuario.setTipo(tipo);
        // Salva o aluno
        Usuario createdProfessor = usuarioService.saveUsuario(usuario);

        return ResponseEntity.ok(createdProfessor);
    }

    //Salvar Administrador  
    @PostMapping(value = "/adm", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Usuario> cadastroAdm(@RequestBody Usuario usuario) {
        // Define o tipo de usuário como 3 (Adm)
        Tp_Usuario tipo =  new Tp_Usuario();
        tipo.setId(3);
        usuario.setTipo(tipo);

        // Salva o aluno
        Usuario createdAdm = usuarioService.saveUsuario(usuario);

        return ResponseEntity.ok(createdAdm);
    }
}