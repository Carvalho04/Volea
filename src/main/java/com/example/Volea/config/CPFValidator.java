package com.example.Volea.config;

import java.util.regex.Pattern;

public class CPFValidator {

    public static boolean isValidCPF(String cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replaceAll("\\D", "");

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length() != 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais (ex.: 111.111.111-11, que é inválido)
        if (cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        int soma = 0;
        for (int i = 0; i < 9; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (10 - i);
        }
        int resto = soma % 11;
        int primeiroDigitoVerificador = (resto < 2) ? 0 : 11 - resto;

        // Calcula o segundo dígito verificador
        soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += Character.getNumericValue(cpf.charAt(i)) * (11 - i);
        }
        resto = soma % 11;
        int segundoDigitoVerificador = (resto < 2) ? 0 : 11 - resto;

        // Verifica se os dígitos verificadores estão corretos
        return cpf.charAt(9) == Character.forDigit(primeiroDigitoVerificador, 10) &&
               cpf.charAt(10) == Character.forDigit(segundoDigitoVerificador, 10);
    }

    public static void main(String[] args) {
        String cpf = "123.456.789-09";
        System.out.println("CPF " + cpf + " é válido? " + isValidCPF(cpf));
    }
}
