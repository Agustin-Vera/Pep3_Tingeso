package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.UserEntity;
import com.prestabanco.mortgageloanbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity saveUser(UserEntity user) {
        if(userRepository.findByRut(user.getRut()) != null) {
            return null;
        }
        return userRepository.save(user);
    }

    public List<UserEntity> getUsers() {
        return userRepository.findAll();
    }

    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    public UserEntity getUserByRut(String rut) {
        return userRepository.findByRut(rut);
    }

    public UserEntity updateUser(UserEntity user) {
        return userRepository.save(user);
    }
}
