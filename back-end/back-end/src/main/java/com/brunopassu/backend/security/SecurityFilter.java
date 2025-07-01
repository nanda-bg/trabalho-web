package com.brunopassu.backend.security;

import com.brunopassu.backend.service.AuthService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final FirebaseAuth firebaseAuth;
    private final AuthService authService;

    public SecurityFilter(FirebaseAuth firebaseAuth, AuthService authService) {
        this.firebaseAuth = firebaseAuth;
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = extractToken(request);
        try {
            if (token != null) {
            String userId = authService.verifyToken(token); // VALIDA TOKEN VIA FIREBASE E OBTÉM UID
            // Criar autenticação Spring Security
            UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userId, null, Collections.emptyList());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            request.setAttribute("userId", userId); // ADICIONA UID AO REQUEST PARA USO NOS CONTROLLERS

            }
        } catch (FirebaseAuthException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.getWriter().write("{error:UNAUTHORIZED,message:Token inválido}");
            return;
        }
        filterChain.doFilter(request, response);
    }

    // EXTRAI TOKEN DO HEADER "Authorization: Bearer <token>"
    private String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    // DEFINE QUAIS ROTAS NÃO PASSAM PELO FILTRO
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/auth/")
                || path.startsWith("/api/public/")
                || path.startsWith("/swagger-ui/")
                || path.startsWith("/swagger-ui.html")
                || path.startsWith("/v3/api-docs");

    }

}

