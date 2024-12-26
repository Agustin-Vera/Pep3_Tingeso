package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.UserEntity;
import com.prestabanco.mortgageloanbackend.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void whenSaveUser_thenCorrect() {
        // Given
        UserEntity user = new UserEntity();
        user.setRut("13466711-3");
        user.setName("Marco");
        user.setLastname("Asensio");
        user.setEmail("marco@gmail.com");
        user.setPassword("123456");

        when(userRepository.findByRut("13466711-3")).thenReturn(null);
        when(userRepository.save(user)).thenReturn(user);

        // When
        UserEntity newUser = userService.saveUser(user);

        // Then
        assertThat(newUser).isNotNull();
        assertThat(newUser.getRut()).isEqualTo("13466711-3");
        assertThat(newUser.getName()).isEqualTo("Marco");
        assertThat(newUser.getLastname()).isEqualTo("Asensio");
        assertThat(newUser.getEmail()).isEqualTo("marco@gmail.com");
        assertThat(newUser.getPassword()).isEqualTo("123456");
    }

    // Usuario existente
    @Test
    void whenSaveUser_thenReturnNull() {
        // Given
        UserEntity user = new UserEntity();
        user.setRut("13466711-3");
        user.setName("Marco");
        user.setLastname("Asensio");
        user.setEmail("marco@gmail.com");
        user.setPassword("123456");

        when(userRepository.findByRut("13466711-3")).thenReturn(user);

        // When
        UserEntity result = userService.saveUser(user);

        // Then
        assertThat(result).isNull();
    }

    @Test
    public void whenGetUsers_thenCorrect() {
        //Given
        List<UserEntity> users = new ArrayList<>();
        users.add(new UserEntity(null, "13466711-3", "Cristiano", "Ronaldo", "cristiano@gmail.com", "password1"));
        users.add(new UserEntity(null, "23456789-0", "Lionel", "Messi", "lionel@gmail.com", "password2"));

        when(userRepository.findAll()).thenReturn(users);

        // When
        List<UserEntity> result = userService.getUsers();

        // Then
        assertThat(result).isNotNull();
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getName()).isEqualTo("Cristiano");
        assertThat(result.get(0).getLastname()).isEqualTo("Ronaldo");
        assertThat(result.get(0).getEmail()).isEqualTo("cristiano@gmail.com");
        assertThat(result.get(1).getName()).isEqualTo("Lionel");
        assertThat(result.get(1).getLastname()).isEqualTo("Messi");
        assertThat(result.get(1).getEmail()).isEqualTo("lionel@gmail.com");

    }

    @Test
    public void whenGetUserById_thenCorrect() {
        // Given
        UserEntity user = new UserEntity(1L, "13466711-3", "Marco", "Asensio", "marco@gmail.com", "123456");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // When
        UserEntity foundUser = userService.getUserById(1L);

        // Then
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getRut()).isEqualTo("13466711-3");
        assertThat(foundUser.getName()).isEqualTo("Marco");
        assertThat(foundUser.getLastname()).isEqualTo("Asensio");
        assertThat(foundUser.getEmail()).isEqualTo("marco@gmail.com");
    }

    @Test
    public void whenGetUserByRut_thenCorrect() {
        // Given
        UserEntity user = new UserEntity(1L, "13466711-3", "Marco", "Asensio", "marco@gmail.com", "123456");

        when(userRepository.findByRut("13466711-3")).thenReturn(user);

        // When
        UserEntity foundUser = userService.getUserByRut("13466711-3");

        // Then
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getRut()).isEqualTo("13466711-3");
        assertThat(foundUser.getName()).isEqualTo("Marco");
        assertThat(foundUser.getLastname()).isEqualTo("Asensio");
        assertThat(foundUser.getEmail()).isEqualTo("marco@gmail.com");
    }


    @Test
    public void whenUpdateUser_thenCorrect() {
        // Given
        UserEntity user = new UserEntity(null, "13466711-3", "Cristiano", "Ronaldo", "cristiano@gmail.com", "password1");

        when(userRepository.save(user)).thenReturn(user);
        userService.saveUser(user);

        user.setName("Jorge");
        user.setLastname("Zamorano");
        user.setEmail("jorge@gmail.com");
        user.setPassword("123456");

        when(userRepository.save(user)).thenReturn(user);

        // When
        UserEntity updatedUser = userService.updateUser(user);

        // Then
        assertThat(updatedUser).isNotNull();
        assertThat(updatedUser.getRut()).isEqualTo("13466711-3");
        assertThat(updatedUser.getName()).isEqualTo("Jorge");
        assertThat(updatedUser.getLastname()).isEqualTo("Zamorano");
        assertThat(updatedUser.getEmail()).isEqualTo("jorge@gmail.com");
        assertThat(updatedUser.getPassword()).isEqualTo("123456");
    }

}
