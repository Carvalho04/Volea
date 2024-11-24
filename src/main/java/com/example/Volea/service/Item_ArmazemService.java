package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Item_Armazem;
import com.example.Volea.repository.Item_ArmazemRepository;

@Service
public class Item_ArmazemService {
    
    @Autowired
    private Item_ArmazemRepository Item_ArmazemRepository;


    public List<Item_Armazem> findAllItem_Armazem(){
        return Item_ArmazemRepository.findAll();       
    }


    public Optional<Item_Armazem> findItem_ArmazemById(int id) {
        return Item_ArmazemRepository.findById(id);
    }

    public Item_Armazem saveItem_Armazem(Item_Armazem item_Armazem) {
        return Item_ArmazemRepository.save(item_Armazem);
    }

    public Item_Armazem atualizaItem_Armazem(Item_Armazem item_Armazem) {
        return Item_ArmazemRepository.save(item_Armazem);
    }
    

    public void deleteItem_Armazem(int id) {
        Item_ArmazemRepository.deleteById(id);
    }

   

}
    