package com.example.Volea.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table (name = "sport")
public class Esporte {


    @Id  
    @Column(name = "id", updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private int id;
    
    @Column(name = "descricao")
    private String descricao;
    
    @Nullable
    @OneToMany(mappedBy = "esporte")
    private List <Classe> classes;

    
    // @JsonCreator
    // public Esporte(int id) {
    //     this.id = id;
    // }
    // @JsonValue
    // public int getIdJson() {
    //     return id;
    // }

}
