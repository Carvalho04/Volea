package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.dto.PagamentoDTO;
import com.example.Volea.entity.Desconto;
import com.example.Volea.entity.Esporte;
import com.example.Volea.entity.Pagamento;
import com.example.Volea.entity.Plano;
import com.example.Volea.entity.Usuario;
import com.example.Volea.repository.DescontoRepository;
import com.example.Volea.repository.EsporteRepository;
import com.example.Volea.repository.PagamentoRepository;
import com.example.Volea.repository.PlanoRepository;
import com.example.Volea.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class PagamentoService {
    
    @Autowired
    private PagamentoRepository PagamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PlanoRepository planoRepository;

    @Autowired
    private DescontoRepository descontoRepository;



    public List<Pagamento> findAllPagamento(){
        return PagamentoRepository.findAll();       
    }

    // public Pagamento criarPagamento(Pagamento pagamento, int alunoId) {
    //     Usuario usuario = usuarioRepository.findById(alunoId)
    //         .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + alunoId));
    //     pagamento.setUsuario(usuario);
    //     return PagamentoRepository.save(pagamento);
    // }

    @Transactional
    public void criarPagamento(PagamentoDTO dto, int alunoId) {
        // Cria um novo objeto Pagamento
        Pagamento pagamento = new Pagamento();
        pagamento.setValorImposto(dto.getValorImposto());
        pagamento.setValorTotal(dto.getValorTotal());
        pagamento.setDataVencimento(dto.getDataVencimento());
        pagamento.setDataPagamento(dto.getDataPagamento());
        pagamento.setAtivo(true);
    
        // Busca o plano e o desconto usando os IDs passados no DTO
        Plano plano = planoRepository.findById(dto.getPlanoId()).orElseThrow();
        Desconto desconto = descontoRepository.findById(dto.getDescontoId()).orElse(null);
    
        // Busca o aluno pelo alunoId
        Usuario aluno = usuarioRepository.findById(alunoId).orElseThrow();
    
        // Associa o aluno, plano e desconto ao pagamento
        pagamento.setPlano(plano);
        pagamento.setDesconto(desconto);
        pagamento.setUsuario(aluno);
    
        // Salva o pagamento no banco
        PagamentoRepository.save(pagamento);
    }
    


    public Optional<Pagamento> findPagamentoById(int id) {
        return PagamentoRepository.findById(id);
    }

    public Pagamento savePagamento(Pagamento pagamento) {
        return PagamentoRepository.save(pagamento);
    }

    public Pagamento atualizaPagamento(Pagamento pagamento) {
        return PagamentoRepository.save(pagamento);
    }
    

    public void deletePagamento(int id) {
        PagamentoRepository.deleteById(id);
    }

   //Buscando por ativos e inativos
   public List<Pagamento> getPagamentosAtivos() {
        return PagamentoRepository.findByAtivoTrue();
    }

    public List<Pagamento> getPagamentosInativos() {
        return PagamentoRepository.findByAtivoFalse();
    }   

}
    