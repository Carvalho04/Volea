package com.example.Volea.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
@Table(name = "classe")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")

public class Classe {

    @Id  
    @Column(name = "id", updatable = false, nullable = false) 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column(name = "nome")
    private String nome;
    
    @Column(name = "descricao")
    private String descricao;

    @JsonIdentityInfo(
    generator = ObjectIdGenerators.PropertyGenerator.class, 
    property = "id")
    @ManyToMany
    @JoinTable(name = "classe_alunos", 
               joinColumns = @JoinColumn(name = "classe_id"), 
               inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private List<Usuario> alunos;
    

    @Column(name = "ativo", nullable = false)
    private boolean ativo = true;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference(value="classe-esporte")
    @JoinColumn(name = "id_esporte")
    private Esporte esporte;

    @OneToMany(mappedBy = "classe")
    @JsonManagedReference(value="classe-aula")
    private List<Aula> aulas;
    
    @OneToMany(mappedBy = "classe")
    @JsonManagedReference(value="classe-chamada")
    private List<Chamada> chamadas;
}
