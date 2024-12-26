package com.prestabanco.mortgageloanbackend.services;


import com.prestabanco.mortgageloanbackend.entities.DocumentEntity;
import com.prestabanco.mortgageloanbackend.repositories.DocumentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;

@ExtendWith(MockitoExtension.class)
public class DocumentTest {

    @Mock
    private DocumentRepository documentRepository;

    @InjectMocks
    private DocumentService documentService;

    @Mock
    private MultipartFile multipartFile;


    @Test
    void testSaveDocument_thenCorrect() throws IOException {
        // Given

        // Archivo Multipart
        when(multipartFile.getOriginalFilename()).thenReturn("identificacion.pdf");
        when(multipartFile.getContentType()).thenReturn("application/pdf");
        when(multipartFile.getBytes()).thenReturn("Contenido archivo".getBytes());

        // Documento para comparar
        DocumentEntity document = new DocumentEntity();
        document.setId_document(1L);
        document.setIdApplication(3L);
        document.setName("identificacion.pdf");
        document.setType("application/pdf");
        document.setData("Contenido archivo".getBytes());
        document.setDocumentType(1);

        //when(documentRepository.save(document)).thenReturn(document);
        when(documentRepository.save(any(DocumentEntity.class))).thenReturn(document);

        // When
        DocumentEntity newDocument = documentService.saveDocument(3L, multipartFile, 1);

        // Then
        assertThat(newDocument.getId_document()).isEqualTo(document.getId_document());
        assertThat(newDocument.getIdApplication()).isEqualTo(document.getIdApplication());
        assertThat(newDocument.getName()).isEqualTo("identificacion.pdf");
        assertThat(newDocument.getType()).isEqualTo("application/pdf");
        assertThat(newDocument.getData()).isEqualTo("Contenido archivo".getBytes());
        assertThat(newDocument.getDocumentType()).isEqualTo(1);
    }

    @Test
    public void testGetDocByIdAppDocType_thenCorrect() {
        // Given
        Long idApplication = 1L;
        Integer documentType = 2;
        DocumentEntity expectedDocument = new DocumentEntity();
        expectedDocument.setId_document(1L);
        expectedDocument.setIdApplication(idApplication);
        expectedDocument.setDocumentType(documentType);

        // When
        when(documentRepository.findByIdApplicationDocumentType(idApplication, documentType))
                .thenReturn(expectedDocument);

        // Then
        DocumentEntity result = documentService.getDocByIdAppDocType(idApplication, documentType);
        assertEquals(expectedDocument, result);
    }

    @Test
    public void testGetDocByIdAppDocType_NotFound_thenNull() {
        // Given
        Long idApplication = 1L;
        Integer documentType = 2;

        // Configura el mock para devolver null solo para estos valores específicos
        when(documentRepository.findByIdApplicationDocumentType(eq(idApplication), eq(documentType)))
                .thenReturn(null);

        // When
        DocumentEntity result = documentService.getDocByIdAppDocType(idApplication, documentType);

        // Then
        assertNull(result, "El resultado debe ser null cuando no se encuentra el documento");
    }

}
