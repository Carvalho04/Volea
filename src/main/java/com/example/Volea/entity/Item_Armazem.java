package com.example.Volea.entity;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString

@Entity
@Table(name = "item_storage")
public class Item_Armazem {

    @Id  
    @Column(name = "id", updatable = false, nullable = false) 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    

    @JsonProperty("descricao")
    @Column(name = "descricao")
    private String descricao;

    @Column (name = "ativo", nullable = false)
    private boolean ativo = true;
    
    @ManyToOne
    @JoinColumn(name = "item_id")
    @JsonBackReference
    private Armazem armazem;
  

    // @JsonCreator
    // public Item_Armazem(int id) {
    //     this.id = id;
    // }
    // @JsonValue
    // public int getIdJson() {
    //     return id;
    // }
}
