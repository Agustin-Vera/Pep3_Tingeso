package com.prestabanco.mortgageloanbackend.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavingsAccountEntity {
    // DTO
    private double income;      // ingresos del usuario
    private double balance;   // saldo de la cuenta
    private List<Double> savings;   // estados de los ultimos 12 meses de la cuenta
    private List<Double> deposits;  // depositos de los ultimos 12 meses de la cuenta
    LocalDate date;
}
