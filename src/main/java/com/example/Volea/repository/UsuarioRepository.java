package com.example.Volea.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    

    //Achar por email e senha
    Optional<Usuario> findByEmailAndPass(String email, String pass);

    //Achar todos por tipo
    List<Usuario> findByTipo_Id(int tipoId);

    // Usuários ativos por tipo
    List<Usuario> findByTipo_IdAndAtivoTrue(int tipoId);

    // Usuários inativos por tipo
    List<Usuario> findByTipo_IdAndAtivoFalse(int tipoId);

    //Procurar por CPF
    boolean existsByCpf(String cpf);

    //Procurar por Email
    boolean existsByEmail(String email);
}
