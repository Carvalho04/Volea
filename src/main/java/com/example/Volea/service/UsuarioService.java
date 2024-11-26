package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.config.CPFValidator;
import com.example.Volea.dto.UsuarioDTO;
import com.example.Volea.entity.Usuario;
import com.example.Volea.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository UsuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.UsuarioRepository = usuarioRepository;
    }

    //Procurar todos os usuários
    public List<Usuario> findAllUsuario(){
        return UsuarioRepository.findAll();       
    }

    //Procurar usuário por ID
    public Optional<Usuario> findUsuarioById(int id) {
        return UsuarioRepository.findById(id);
    }

    //Salvar usuário
    public Usuario saveUsuario(Usuario usuario) {
        
        if (!CPFValidator.isValidCPF(usuario.getCpf())) {
            throw new IllegalArgumentException("CPF inválido.");
        }
        return UsuarioRepository.save(usuario);
    }

    //Atualizar usuário
    public Usuario atualizaUsuario(Usuario usuario) {
        return UsuarioRepository.save(usuario);
    }
    
    //Deletar usuário
    public void deleteUsuario(int id) {
        UsuarioRepository.deleteById(id);
    }
 
    //Procurar por email e senha
    public Optional<Usuario> findByEmailAndPass(String email, String pass) {
        return UsuarioRepository.findByEmailAndPass(email, pass);
    }
    
    //Procurar usuários por tipo
    public List<Usuario> findUsuariosByTipo(int tipoId) {
        List<Usuario> usuarios = UsuarioRepository.findByTipo_Id(tipoId);
        // Log para verificar os dados
        usuarios.forEach(usuario -> System.out.println("Usuario: " + usuario.getNome() + ", Tipo: " + usuario.getTipo().getDescricao()));
        return usuarios;
    }
    
    //Procurar por tipo Ativos
    public List<Usuario> findUsuariosAtivosByTipo(int tipoId) {
        return UsuarioRepository.findByTipo_IdAndAtivoTrue(tipoId);
    }

    //Procurar por tipo Inativos
    public List<Usuario> findUsuariosInativosByTipo(int tipoId) {
        return UsuarioRepository.findByTipo_IdAndAtivoFalse(tipoId);
    }

    //Procurar CPF
    public boolean existsByCpf(String cpf) {
        return UsuarioRepository.existsByCpf(cpf);
    }
    
    //Procurar Email
    public boolean existsByEmail(String email) {
        return UsuarioRepository.existsByEmail(email);
    }

  }
    