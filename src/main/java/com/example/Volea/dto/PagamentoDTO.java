package com.example.Volea.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Date;

import com.example.Volea.entity.Pagamento;

@Getter
@Setter
public class PagamentoDTO {

    private int id;
    private double valorImposto;
    private double valorTotal;
    private Date dataVencimento;
    private Date dataPagamento;
    private String status;
    private boolean ativo;

    private int planoId;
    private int alunoId;
    private int descontoId;

    public PagamentoDTO toPagamentoDTO(Pagamento pagamento) {
    PagamentoDTO dto = new PagamentoDTO();
    dto.setId(pagamento.getId());
    dto.setValorImposto(pagamento.getValorImposto());
    dto.setValorTotal(pagamento.getValorTotal());
    dto.setDataVencimento(pagamento.getDataVencimento());
    dto.setDataPagamento(pagamento.getDataPagamento());
    dto.setAtivo(pagamento.isAtivo());

    // Adiciona os IDs
    if (pagamento.getPlano() != null) {
        dto.setPlanoId(pagamento.getPlano().getId());
    }
    if (pagamento.getDesconto() != null) {
        dto.setDescontoId(pagamento.getDesconto().getId());
    }

    return dto;
}


}
