package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.DocumentEntity;
import com.prestabanco.mortgageloanbackend.repositories.DocumentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository docRepository;

    public DocumentEntity saveDocument(Long idApplication, MultipartFile doc, Integer documentType) throws IOException {
        DocumentEntity newDoc = new DocumentEntity();
        newDoc.setName(doc.getOriginalFilename());
        newDoc.setType(doc.getContentType());
        newDoc.setData(doc.getBytes());
        newDoc.setIdApplication(idApplication);
        newDoc.setDocumentType(documentType);
        return docRepository.save(newDoc);
    }

    @Transactional
    public DocumentEntity getDocByIdAppDocType(Long idApplication, Integer documentType) {
        return docRepository.findByIdApplicationDocumentType(idApplication, documentType);
    }

}
