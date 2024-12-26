package com.prestabanco.mortgageloanbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "document")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentEntity {
    // documento
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id_document;

    private Long idApplication; // id solicitation
    private String name;
    private String type;

    @Lob
    private byte[] data;
    private Integer documentType;

}
