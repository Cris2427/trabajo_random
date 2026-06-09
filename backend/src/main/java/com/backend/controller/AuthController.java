package com.backend.controller;

import com.backend.DTO.AuthResponse;
import com.backend.DTO.LoginRequest;
import com.backend.model.Usuario;
import com.backend.repository.UsuarioRepository;
import com.backend.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> opt = usuarioRepository.findByUsername(request.getUsername());

        if (opt.isEmpty() ||
            !passwordEncoder.matches(request.getPassword(), opt.get().getPassword())) {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        Usuario usuario = opt.get();
        String token = jwtService.generarToken(usuario.getUsername());
        return ResponseEntity.ok(new AuthResponse(token, usuario.getUsername(), usuario.getNombre()));
    }
}
