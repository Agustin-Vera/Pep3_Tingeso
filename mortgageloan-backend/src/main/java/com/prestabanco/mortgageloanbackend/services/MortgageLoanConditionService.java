package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.MortgageLoanConditionEntity;
import com.prestabanco.mortgageloanbackend.repositories.MortgageLoanConditionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MortgageLoanConditionService {

    @Autowired
    private MortgageLoanConditionRepository mortgageLoanConditionRepository;

    public MortgageLoanConditionEntity getMortgageLoanConditionById(Long id) {
        return mortgageLoanConditionRepository.findById(id).get();
    }
}
