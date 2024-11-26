package com.example.Volea.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.dto.ClasseDTO;
import com.example.Volea.entity.Classe;
import com.example.Volea.entity.Esporte;
import com.example.Volea.entity.Usuario;
import com.example.Volea.repository.ClasseRepository;
import com.example.Volea.repository.EsporteRepository;
import com.example.Volea.repository.UsuarioRepository;

@Service
public class ClasseService {
    
    @Autowired
    private ClasseRepository ClasseRepository;

    @Autowired
    private EsporteRepository esporteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Classe> findAllClasse(){
        return ClasseRepository.findAll();       
    }


    public Optional<Classe> findClasseById(int id) {
        return ClasseRepository.findById(id);
    }


    public Classe saveClasse(Classe classe) {
        // Salva a Classe no banco de dados e retorna a classe salva
        return ClasseRepository.save(classe);
    }


    public Classe atualizaClasse(Classe classe) {
        return ClasseRepository.save(classe);
    }
    

    public void deleteClasse(int id) {
        ClasseRepository.deleteById(id);
    }
    
//     public boolean matricularAluno(int turmaId, int usuarioId) {
//     Optional<Classe> turmaOpt = ClasseRepository.findById(turmaId);
//     // Buscar o usuário pelo ID
//     Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);

//     // Verificar se a turma e o usuário existem
//     if (turmaOpt.isPresent() && usuarioOpt.isPresent()) {
//         Classe turma = turmaOpt.get();
//         Usuario usuario = usuarioOpt.get();

//         // Verificar se o usuário é do tipo aluno
//         if (usuario.getTipo() != null && usuario.getTipo().getId() == 2) {  // Supondo que "2" seja o ID do tipo "aluno"
//             // Verificar se o aluno já está matriculado
//             if (turma.getAlunos().contains(usuario)) {
//                 throw new IllegalStateException("O aluno já está matriculado nesta turma.");
//             }

//             if (turma.getAlunos().stream().anyMatch(a -> a.getId() == usuario.getId())) {
//                 // Retorne false ou uma mensagem indicando que o aluno já está matriculado
//                 return false;  // Ou outra lógica apropriada
//             }
//             // Verificar se a turma está cheia (exemplo: limite de 30 alunos)
//             int limiteAlunos = 30; // Ajuste conforme necessário
//             if (turma.getAlunos().size() >= limiteAlunos) {
//                 throw new IllegalStateException("A turma está cheia.");
//             }

//             // Matricular o aluno
//             turma.getAlunos().add(usuario);
//             ClasseRepository.save(turma); // Salvar as alterações na turma

//             return true;
//         } else {
//             throw new IllegalArgumentException("O usuário não é um aluno.");
//         }
//     }

//     // Se a turma ou o usuário não existirem
//     throw new NoSuchElementException("Turma ou aluno não encontrados.");
// }

// public boolean matricularAluno(int turmaId, int usuarioId) {
//     Optional<Classe> turmaOpt = ClasseRepository.findById(turmaId);
//     // Buscar o usuário pelo ID
//     Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);

//     // Verificar se a turma e o usuário existem
//     if (turmaOpt.isPresent() && usuarioOpt.isPresent()) {
//         Classe turma = turmaOpt.get();
//         Usuario usuario = usuarioOpt.get();

//         // Verificar se o usuário é do tipo aluno
//         if (usuario.getTipo() != null && usuario.getTipo().getId() == 2) {  // Supondo que "2" seja o ID do tipo "aluno"
//             // Verificar se o aluno já está matriculado
//             if (turma.getAlunos().contains(usuario)) {
//                 throw new IllegalStateException("O aluno já está matriculado nesta turma.");
//             }

//             // Verificar se a turma está cheia (exemplo: limite de 30 alunos)
//             int limiteAlunos = 30; // Ajuste conforme necessário
//             if (turma.getAlunos().size() >= limiteAlunos) {
//                 throw new IllegalStateException("A turma está cheia.");
//             }

//             // Matricular o aluno
//             turma.getAlunos().add(usuario);
//             ClasseRepository.save(turma); // Salvar as alterações na turma

//             return true;
//         } else {
//             throw new IllegalArgumentException("O usuário não é um aluno.");
//         }
//     }

//     // Se a turma ou o usuário não existirem
//     throw new NoSuchElementException("Turma ou aluno não encontrados.");
// }
public boolean matricularAluno(int turmaId, int usuarioId) {
    Optional<Classe> turmaOpt = ClasseRepository.findById(turmaId);
    Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);

    if (turmaOpt.isPresent() && usuarioOpt.isPresent()) {
        Classe turma = turmaOpt.get();
        Usuario usuario = usuarioOpt.get();

        // Verificar se o usuário é do tipo aluno
        if (usuario.getTipo() != null && usuario.getTipo().getId() == 2) {
            // Verificar se o aluno já está matriculado
            if (turma.getAlunos().stream().anyMatch(a -> a.getId() == usuarioId)) {
                return false; // Aluno já matriculado
            }

            // Verificar se a turma está cheia
            int limiteAlunos = 30; // Ajuste conforme necessário
            if (turma.getAlunos().size() >= limiteAlunos) {
                return false; // Turma cheia
            }

            // Matricular o aluno
            turma.getAlunos().add(usuario);
            ClasseRepository.save(turma); // Salvar alterações

            return true; // Matrícula realizada com sucesso
        } else {
            return false; // O usuário não é um aluno
        }
    }

    return false; // Caso a turma ou o usuário não existam
}






  

}
    