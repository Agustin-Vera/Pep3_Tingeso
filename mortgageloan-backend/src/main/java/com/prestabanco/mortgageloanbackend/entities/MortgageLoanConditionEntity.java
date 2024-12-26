package com.prestabanco.mortgageloanbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="mortgageLoanCondition")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MortgageLoanConditionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String loanType; // Tipo de prestamo
    private int maximumTerm; // Plazo maximo (en años)
    private double maximumInterestRate; // Tasa de interes maxima de credito
    private double minimumInterestRate; // Tasa de interes minima de credito
    private double maximumFinancingAmount; // Porcentaje maximo de monto para financiamiento
    private double interestRate; // Tasa de interes actual (anual) para este tipo de credito
}
