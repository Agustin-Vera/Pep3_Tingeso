package com.prestabanco.mortgageloanbackend.controllers;

import com.prestabanco.mortgageloanbackend.entities.StatusEntity;
import com.prestabanco.mortgageloanbackend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/states")
@CrossOrigin("*")
public class StatusController {

    @Autowired
    private StatusService statusService;

    @GetMapping
    public ResponseEntity<List<StatusEntity>> getStates() {
        List<StatusEntity> states = statusService.getStates();
        return ResponseEntity.ok(states);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusEntity> getStateById(@PathVariable Long id) {
        StatusEntity status = statusService.getState(id);
        return ResponseEntity.ok(status);
    }
}
