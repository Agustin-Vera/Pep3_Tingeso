package com.prestabanco.mortgageloanbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Entity(name = "status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusEntity {
    // estados para la solicitud
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_status;

    private String name;
    private String description;
}
