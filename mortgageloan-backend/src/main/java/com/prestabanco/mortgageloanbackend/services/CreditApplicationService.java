package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.CreditApplicationEntity;
import com.prestabanco.mortgageloanbackend.repositories.CreditApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class CreditApplicationService {

    @Autowired
    private CreditApplicationRepository creditApplicationRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MortgageLoanConditionService mortgageLoanConditionService;

    // Solicitar un credito
    public CreditApplicationEntity saveCreditApplication(CreditApplicationEntity creditApplicationEntity) {
        creditApplicationEntity.setState(1);
        creditApplicationEntity.setStateDescription("En Revisión Inicial");
        if(userService.getUserByRut(creditApplicationEntity.getRutUser()) != null){
            return creditApplicationRepository.save(creditApplicationEntity);
        }
        return null;
    }

    public List<CreditApplicationEntity> getCreditApplications() {
        return creditApplicationRepository.findAll();
    }

    public CreditApplicationEntity getCreditApplicationById(Long id) {
        return creditApplicationRepository.findById(id).get();
    }

    public CreditApplicationEntity updateCreditApplication(CreditApplicationEntity creditApplicationEntity) {
        return creditApplicationRepository.save(creditApplicationEntity);
    }

}
