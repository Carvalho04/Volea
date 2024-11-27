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

import com.example.Volea.dto.PagamentoDTO;
import com.example.Volea.entity.Pagamento;
import com.example.Volea.repository.PagamentoRepository;
import com.example.Volea.service.PagamentoService;

@RestController
@RequestMapping("api/pagamentos")
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @GetMapping
    public List<Pagamento> getAllPagamentos() {
        return pagamentoService.findAllPagamento();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagamento> getPagamentoById(@PathVariable int id) {
        Optional<Pagamento> pagamento = pagamentoService.findPagamentoById(id);
        return pagamento.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ativos")
    public List<Pagamento> getPagamentosAtivos() {
        return pagamentoService.getPagamentosAtivos();
    }

    @GetMapping("/inativos")
    public List<Pagamento> getPagamentosInativos() {
        return pagamentoService.getPagamentosInativos();
    }   

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarPagamento(@PathVariable int id) {
        Optional<Pagamento> pagamentoOptional = pagamentoService.findPagamentoById(id);
        if (pagamentoOptional.isPresent()) {
            Pagamento pagamento = pagamentoOptional.get();
            pagamento.setAtivo(true); 
            pagamentoService.savePagamento(pagamento); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarPagamento(@PathVariable int id) {
        Optional<Pagamento> pagamentoOptional = pagamentoService.findPagamentoById(id);
        if (pagamentoOptional.isPresent()) {
            Pagamento pagamento = pagamentoOptional.get();
            pagamento.setAtivo(false); 
            pagamentoService.savePagamento(pagamento);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public Pagamento createPagamento(@RequestBody Pagamento pagamento) {
        return pagamentoService.savePagamento(pagamento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePagamento(@PathVariable int id) {
        pagamentoService.deletePagamento(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pagamento> updatePagamento(@PathVariable int id, @RequestBody PagamentoDTO pagamentoDTO) {
        Optional<Pagamento> existingPagamentoOptional = pagamentoService.findPagamentoById(id);
        
        if (existingPagamentoOptional.isPresent()) {
            Pagamento existingPagamento = existingPagamentoOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (pagamentoDTO.getValorOriginal() > 0) {
                existingPagamento.setValorOriginal(pagamentoDTO.getValorOriginal());
            }
            if (pagamentoDTO.getValorDesconto() > 0) {
                existingPagamento.setValorDesconto(pagamentoDTO.getValorDesconto());
            }
            if (pagamentoDTO.getValorImposto() > 0) {
                existingPagamento.setValorImposto(pagamentoDTO.getValorImposto());
            }
            if (pagamentoDTO.getValorTotal() > 0) {
                existingPagamento.setValorTotal(pagamentoDTO.getValorTotal());
            }
            if (pagamentoDTO.getDataPagamento() != null) {
                existingPagamento.setDataPagamento(pagamentoDTO.getDataPagamento());
            }
            if (pagamentoDTO.getDataVencimento() != null) {
                existingPagamento.setDataVencimento(pagamentoDTO.getDataVencimento());
            }

            Pagamento updatedPagamento = pagamentoService.atualizaPagamento(existingPagamento);
            return ResponseEntity.ok(updatedPagamento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
