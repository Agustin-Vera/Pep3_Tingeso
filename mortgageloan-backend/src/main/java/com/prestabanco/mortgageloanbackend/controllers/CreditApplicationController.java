package com.prestabanco.mortgageloanbackend.controllers;

import com.prestabanco.mortgageloanbackend.entities.CreditApplicationEntity;
import com.prestabanco.mortgageloanbackend.entities.SavingsAccountEntity;
import com.prestabanco.mortgageloanbackend.services.BusinessLogicService;
import com.prestabanco.mortgageloanbackend.services.CreditApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/creditApplication")
@CrossOrigin("*")
public class CreditApplicationController {

    @Autowired
    private CreditApplicationService creditApplicationService;
    @Autowired
    private BusinessLogicService bussinessLogicService;

    @PostMapping("/")
    public ResponseEntity<?> saveCreditApplication(@RequestBody CreditApplicationEntity creditApplication) {
        System.out.println("Aplicacion: " + creditApplication);
        CreditApplicationEntity newCreditApplication = creditApplicationService.saveCreditApplication(creditApplication);
        if(newCreditApplication == null) {
            return ResponseEntity.badRequest().body("Error, no existe un usuario registrado con el rut indicado");
        }
        return ResponseEntity.ok(newCreditApplication);
    }

    @GetMapping("/")
    public ResponseEntity<List<CreditApplicationEntity>> getCreditApplications() {
        List<CreditApplicationEntity> creditApplications = creditApplicationService.getCreditApplications();
        return ResponseEntity.ok(creditApplications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CreditApplicationEntity> getCreditApplicationById(@PathVariable Long id) {
        CreditApplicationEntity creditApplication = creditApplicationService.getCreditApplicationById(id);
        return ResponseEntity.ok(creditApplication);
    }

    @PutMapping("/")
    public ResponseEntity<CreditApplicationEntity> updateCreditApplication(@RequestBody CreditApplicationEntity creditApplication) {
        CreditApplicationEntity updatedCreditApplication = creditApplicationService.updateCreditApplication(creditApplication);
        return ResponseEntity.ok(updatedCreditApplication);
    }

    @GetMapping("/simulate")
    public ResponseEntity<Integer> simulateCreditApplication(@RequestParam double amount, @RequestParam int term, @RequestParam Long type) {
        Integer simulated = bussinessLogicService.simulateCreditApllication(amount, term, type);
        return ResponseEntity.ok(simulated);
    }

    // Controlar Reglas de Negocio
    @GetMapping("/evaluate/R1/{id}")
    public ResponseEntity<?> evaluateR1CreditApplication(@PathVariable Long id, @RequestParam double income) {
        // Se retorna un mapa llave valor con un boolean para distinguir estado de aprobacion
        // y un mensaje para indicarle porque es aceptada o rechazada al ejecutivo
        Map<String, Object> evaluation = bussinessLogicService.evaluateR1(id, income);
        return ResponseEntity.ok(evaluation);
    }

    @GetMapping("/evaluate/R4/{id}")
    public ResponseEntity<?> evaluateR4CreditApplication(@PathVariable Long id, @RequestParam double income, @RequestParam double debts) {
        Map<String, Object> evaluation = bussinessLogicService.evaluateR4(id, income, debts);
        return ResponseEntity.ok(evaluation);
    }


    @GetMapping("/evaluate/R5/{id}")
    public ResponseEntity<?> evaluateR5CreditApplication(@PathVariable Long id, @RequestParam double propertyValue) {
        Map<String, Object> evaluation = bussinessLogicService.evaluateR5(id, propertyValue);
        return ResponseEntity.ok(evaluation);
    }

    @GetMapping("/evaluate/R6/{id}")
    public ResponseEntity<?> evaluateR6CreditApplication(@PathVariable Long id, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate birthDate) {
        Map<String, Object> evaluation = bussinessLogicService.evaluateR6(id, birthDate);
        return ResponseEntity.ok(evaluation);
    }

    @PostMapping("evaluate/R7/{id}")
    public ResponseEntity<?> evaluateR77CreditApplication(@PathVariable long id, @RequestBody SavingsAccountEntity savingsAccount) {
        System.out.println(savingsAccount);
        Map<String, Object> evaluation = bussinessLogicService.evaluateR7(id, savingsAccount);
        return ResponseEntity.ok(evaluation);
    }

    @PutMapping("/evaluate/totalCosts/{id}")
    public ResponseEntity<?> updateTotalCostsCreditApplication(@PathVariable Long id) {
        CreditApplicationEntity creditApplication = bussinessLogicService.calculateTotalCostsCreditApplication(id);
        return ResponseEntity.ok(creditApplication);
    }



}
