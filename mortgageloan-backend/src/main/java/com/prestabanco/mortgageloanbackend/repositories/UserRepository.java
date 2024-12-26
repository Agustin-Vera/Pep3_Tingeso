package com.prestabanco.mortgageloanbackend.repositories;

import com.prestabanco.mortgageloanbackend.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    public UserEntity findByRut(String rut);
}
