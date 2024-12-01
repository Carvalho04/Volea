package com.example.Volea.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Desconto;
import com.example.Volea.repository.DescontoRepository;

@Service
public class DescontoService {
    
    @Autowired
    private DescontoRepository DescontoRepository;


    public List<Desconto> findAllDesconto(){
        return DescontoRepository.findAll();       
    }


    public Optional<Desconto> findDescontoById(int id) {
        return DescontoRepository.findById(id);
    }

    public Desconto saveDesconto(Desconto desconto) {
        return DescontoRepository.save(desconto);
    }

    public Desconto atualizaDesconto(Desconto desconto) {
        return DescontoRepository.save(desconto);
    }
    

    public void deleteDesconto(int id) {
        DescontoRepository.deleteById(id);
    }

   //Buscando por ativos e inativos
   public List<Desconto> getDescontosAtivos() {
        return DescontoRepository.findByAtivoTrue();
    }

    public List<Desconto> getDescontosInativos() {
        return DescontoRepository.findByAtivoFalse();
    }    

   

}
