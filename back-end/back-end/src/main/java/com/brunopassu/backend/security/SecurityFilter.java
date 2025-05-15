package com.brunopassu.backend.security;

import com.brunopassu.backend.service.AuthService;
import com.google.firebase.auth.FirebaseAuthException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final AuthService authService;

    @Autowired
    public SecurityFilter(AuthService authService) {
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("==== SECURITY FILTER ====");
        System.out.println("URI: " + request.getRequestURI());

        // Exceção apenas para rotas específicas de autenticação, não para todas as rotas /auth
        if (request.getRequestURI().equals("/auth/register") ||
                request.getRequestURI().equals("/auth/login") ||
                request.getRequestURI().equals("/auth/exchange-token") ||
                request.getRequestURI().equals("/auth/verify-token") ||
                request.getMethod().equals("OPTIONS")) {

            System.out.println("Rota pública ou OPTIONS - Permitindo acesso sem verificação");
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("Rota protegida - Verificando token");

        // Verificar token de autenticação
        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization Header: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("Token não fornecido ou formato inválido");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token não fornecido");
            return;
        }

        String token = authHeader.substring(7);
        System.out.println("Token extraído: " + token.substring(0, Math.min(token.length(), 20)) + "...");

        try {
            System.out.println("Verificando token com Firebase...");
            String userId = authService.verifyToken(token);
            System.out.println("Token válido! UserId: " + userId);
            request.setAttribute("userId", userId);
            filterChain.doFilter(request, response);
        } catch (FirebaseAuthException e) {
            System.out.println("Erro ao verificar token: " + e.getMessage());
            System.out.println("Código de erro: " + e.getErrorCode());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token inválido: " + e.getMessage());
        }
    }



    /*
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Desabilitar temporariamente a verificação de segurança
        filterChain.doFilter(request, response);
        return;
    }

     */
}
