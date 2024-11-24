// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import org.springframework.stereotype.Service;
// import java.util.Date;

// @Service
// public class JwtService {

//     @Value("${jwt.secret}")
//     private String secretKey;

//     @Value("${jwt.expiration}")
//     private long expirationTime;

//     // Método para gerar o token JWT
//     public String generateToken(String email) {
//         return Jwts.builder()
//                 .setSubject(email)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
//                 .signWith(SignatureAlgorithm.HS256, secretKey)
//                 .compact();
//     }

//     // Método para verificar a validade do token
//     public boolean validateToken(String token) {
//         try {
//             // Aqui usamos Jwts.parser() para validar o token
//             Jwts.parser()  // Não usamos o JwtParserBuilder diretamente
//                 .setSigningKey(secretKey)  // Define a chave secreta
//                 .parseClaimsJws(token);  // Valida o token
//             return true;
//         } catch (Exception e) {
//             return false;  // Retorna falso se ocorrer uma exceção (token inválido)
//         }
//     }

//     // Método para obter o e-mail do usuário do token
//     public String extractEmail(String token) {
//         // Aqui usamos Jwts.parser() para obter o parser e validar o token
//         Claims claims = Jwts.parser()  // Aqui ainda usamos Jwts.parser() para obter o parser
//                 .setSigningKey(secretKey)  // Define a chave secreta
//                 .parseClaimsJws(token)  // Extrai os claims do token
//                 .getBody();
//         return claims.getSubject();  // Retorna o e-mail do usuário
//     }
// }
