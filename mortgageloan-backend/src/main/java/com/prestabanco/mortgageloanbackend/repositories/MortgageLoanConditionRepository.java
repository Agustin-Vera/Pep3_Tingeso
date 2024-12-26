package com.prestabanco.mortgageloanbackend.repositories;

import com.prestabanco.mortgageloanbackend.entities.MortgageLoanConditionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MortgageLoanConditionRepository extends JpaRepository<MortgageLoanConditionEntity, Long> {
}
