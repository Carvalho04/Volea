// package com.example.Volea.config;

// import com.example.Volea.service.JwtService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import java.io.IOException;

// @Component
// public class JwtAuthenticationFilter extends OncePerRequestFilter {

//     @Autowired
//     private JwtService jwtService;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//         String token = getTokenFromRequest(request);

//         if (token != null && jwtService.validateToken(token)) {
//             String email = jwtService.extractEmail(token);
//             // Você pode adicionar o email ou outro dado no contexto para usar no controller
//             request.setAttribute("email", email);  // Exemplo de adicionar o e-mail do usuário
//         }

//         filterChain.doFilter(request, response);
//     }

//     // Método para obter o token da requisição
//     private String getTokenFromRequest(HttpServletRequest request) {
//         String header = request.getHeader("Authorization");
//         if (header != null && header.startsWith("Bearer ")) {
//             return header.substring(7);
//         }
//         return null;
//     }
// }
