package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.StatusEntity;
import com.prestabanco.mortgageloanbackend.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {

    @Autowired
    private StatusRepository statusRepository;

    public List<StatusEntity> getStates() {
        return statusRepository.findAll();
    }

    public StatusEntity getState(Long id) {
        return statusRepository.findById(id).get();
    }
}
