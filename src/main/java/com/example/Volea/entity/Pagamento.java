package com.example.Volea.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonCreator;
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
@Table (name = "payment")
public class Pagamento {


    @Id  
    @Column(name = "id", updatable = false, nullable = false) 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Usuario usuario;

    @Column (name = "valor_original")
    private double valorOriginal;
    
    @Column (name = "valor_desconto")
    private double valorDesconto;
    
    @Column (name = "valor_imposto")
    private double valorImposto;

    @Column (name = "valor_total")
    private double valorTotal;

    @Column (name = "data_vencimento")
    private Date dataVencimento;
    
    @Column (name = "data_pagamento")
    private Date dataPagamento;

    @JsonCreator
    public Pagamento(int id) {
        this.id = id;
    }
    @JsonValue
    public int getIdJson() {
        return id;
    }

}
