package com.prestabanco.mortgageloanbackend.repositories;

import com.prestabanco.mortgageloanbackend.entities.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity, Long> {

    @Query(value = "SELECT * \n" +
            "FROM document\n" +
            "WHERE id_application = :id_application\n" +
            "AND document_type = :document_type;", nativeQuery = true)
    public DocumentEntity findByIdApplicationDocumentType(@Param("id_application") Long id_application, @Param("document_type") Integer document_type);
}
