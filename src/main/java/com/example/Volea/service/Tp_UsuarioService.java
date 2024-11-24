package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Tp_Usuario;
import com.example.Volea.repository.Tp_UsuarioRepository;

@Service
public class Tp_UsuarioService {
    
    @Autowired
    private Tp_UsuarioRepository tp_UserRepository;


    public List<Tp_Usuario> findAllTpUser(){
        return tp_UserRepository.findAll();       
    }


    public Optional<Tp_Usuario> findTpUserById(int id) {
        return tp_UserRepository.findById(id);
    }

    public Tp_Usuario saveTpUser(Tp_Usuario tpuser) {
        return tp_UserRepository.save(tpuser);
    }

    public Tp_Usuario AtualizaTpUser(Tp_Usuario tpuser) {
        // Não altere o ID durante uma atualização
        return tp_UserRepository.save(tpuser);
    }
    

    public void deleteTpUser(int id) {
        tp_UserRepository.deleteById(id);
    }

   

}
    