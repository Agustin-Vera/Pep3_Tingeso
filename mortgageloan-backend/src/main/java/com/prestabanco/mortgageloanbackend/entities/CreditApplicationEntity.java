package com.prestabanco.mortgageloanbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Entity(name = "creditApplication")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditApplicationEntity {
    // solicitud de credito
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_application;

    private String rutUser;

    private Long type; // tipo es el id de la tabla condiciones de credito hipotecario
    private double amount; // monto
    private int term; // plazo

    private int state; // Estado: Para reglas de negocio

    private double monthlyInstallment; //Cuota mensual
    private double totalCost;
    private double commission;
    private double creditLifeInsurance;

    private double fireInsurance;
    private String stateDescription;




}
