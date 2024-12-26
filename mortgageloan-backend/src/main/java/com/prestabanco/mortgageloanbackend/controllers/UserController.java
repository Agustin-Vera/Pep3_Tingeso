package com.prestabanco.mortgageloanbackend.controllers;

import com.prestabanco.mortgageloanbackend.entities.UserEntity;
import com.prestabanco.mortgageloanbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> saveUser(@RequestBody UserEntity user) {
        UserEntity userNew = userService.saveUser(user);
        if (userNew == null) {
            return ResponseEntity.badRequest().body("Error, ya existe un usuario con el rut indicado");
        }

        return ResponseEntity.ok(userNew);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserEntity>> listUsers() {
        List<UserEntity> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        UserEntity user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/")
    public ResponseEntity<UserEntity> updateUser(@RequestBody UserEntity user) {
        UserEntity userUpdated = userService.updateUser(user);
        return ResponseEntity.ok(userUpdated);
    }

}
