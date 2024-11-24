package com.example.Volea.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonValue;

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
@Table(name = "graduation")
public class Graduacao {

    
    @Id  
    @Column(name = "id", updatable = false, nullable = false) 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "descricao")
    private String desc;

    @OneToMany(mappedBy = "graduacao")
    @JsonManagedReference
    private List <Usuario> usuarios;
    
    // @JsonCreator
    // public Graduacao(int id) {
    //     this.id = id;
    // }
    // @JsonValue
    // public int getIdJson() {
    //     return id;
    // }

    @Override
    public String toString() {
        return "Graduacoes{id=" + id + ", desc='" + desc + "'}";
    }


}
