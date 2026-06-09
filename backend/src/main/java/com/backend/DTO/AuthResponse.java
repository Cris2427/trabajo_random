package com.backend.DTO;

public class AuthResponse {
    private String token;
    private String username;
    private String nombre;


    public AuthResponse(String token, String username, String nombre) {
        this.token = token;
        this.username = username;
        this.nombre = nombre;
    }

    public String getToken() { return token; }
    public String getUsername() { return username; }
    public String getNombre() { return nombre; }
}
