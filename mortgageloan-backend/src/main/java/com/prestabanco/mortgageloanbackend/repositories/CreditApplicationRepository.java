package com.prestabanco.mortgageloanbackend.repositories;

import com.prestabanco.mortgageloanbackend.entities.CreditApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditApplicationRepository extends JpaRepository<CreditApplicationEntity, Long> {

}
