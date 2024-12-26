package com.prestabanco.mortgageloanbackend.controllers;

import com.prestabanco.mortgageloanbackend.entities.MortgageLoanConditionEntity;
import com.prestabanco.mortgageloanbackend.services.MortgageLoanConditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mortgageLoanCondition")
@CrossOrigin("*")
public class MorgageLoanConditionController {

    @Autowired
    MortgageLoanConditionService servMortgageLoanCond;

    @GetMapping("/{id}")
    public ResponseEntity<MortgageLoanConditionEntity> getMortgageLoanConditionById(@PathVariable Long id) {
        MortgageLoanConditionEntity condition = servMortgageLoanCond.getMortgageLoanConditionById(id);
        return ResponseEntity.ok(condition);
    }

}
