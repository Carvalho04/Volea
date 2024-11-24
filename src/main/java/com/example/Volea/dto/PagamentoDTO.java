package com.example.Volea.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
public class PagamentoDTO {
    
    private double valorOriginal;
    
    private double valorDesconto;
    
    private double valorImposto;

    private double valorTotal;

    private Date dataVencimento;
    
    private Date dataPagamento;

}
