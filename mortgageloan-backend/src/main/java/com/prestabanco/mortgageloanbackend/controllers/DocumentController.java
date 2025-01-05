package com.prestabanco.mortgageloanbackend.controllers;

import com.prestabanco.mortgageloanbackend.entities.DocumentEntity;
import com.prestabanco.mortgageloanbackend.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/documents")
@CrossOrigin("*")
public class DocumentController {
    @Autowired
    private DocumentService docService;

    @PostMapping("/")
    public ResponseEntity<String> addDocument(@RequestParam("idApplication") Long idApplication, @RequestParam("documents") MultipartFile[] documents, @RequestParam("documentType") Integer[] documentTypes) {
        try {
            for (int i = 0; i < documents.length; i++) {
                MultipartFile document = documents[i];
                System.out.println(document.getOriginalFilename());
                Integer documentType = documentTypes[i];
                docService.saveDocument(idApplication, document, documentType);
            }
            return ResponseEntity.ok("Documentos subido con exito");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{idApplication}/{documentType}")
    public ResponseEntity<Map<String, Object>> getDocumentByIdAppDocType(@PathVariable("idApplication") Long idApplication, @PathVariable("documentType") Integer documentType) {
        try {
            DocumentEntity document = docService.getDocByIdAppDocType(idApplication, documentType);

            Map<String, Object> response = new HashMap<>();
            response.put("name", document.getName()); 
            response.put("data", document.getData());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
