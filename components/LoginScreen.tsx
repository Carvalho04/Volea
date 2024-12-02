// 'use client';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import api from "@/service/api";
// import axios from "axios";

// export function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null); // Alterado para aceitar string ou null
//   const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
//   const [fieldError, setFieldError] = useState<string | null>(null); // Novo estado para erros de campo
//   const router = useRouter();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setFieldError("Complete os dois campos!"); // Define o erro se algum campo estiver vazio
//       return;
//     }

//     setFieldError(null); // Limpa o erro de campo caso todos os campos estejam preenchidos

//     try {
//       const response = await api.post("/api/auth/login", {
//         email,
//         pass: password,
//       });

//       const redirectPath = response.data; // Supondo que o caminho seja retornado no corpo
//       router.push(redirectPath);
//     } catch (err) {
//       if (axios.isAxiosError(err) && err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Credenciais inválidas");
//       }
//     }
//   };

  

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="/" prefetch={false} className="flex items-center gap-2">
//             <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
//             <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
//               Volea
//             </span>
//           </Link>
//           <Link href="/">
//           <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
//             <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
//             Voltar
//           </Button>
//           </Link>
//         </div>
//       </header>


//       {/* Main Content */}
//       <main className="flex flex-grow items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
//             <CardDescription className="text-center">
//               Entre com seu e-mail e senha para acessar sua conta
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">E-mail</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   placeholder="Email@example.com"
//                   type="email"
//                   className="pl-10"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="pass">Senha</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="pass"
//                   placeholder="Senha"
//                   type={showPassword ? "text" : "password"} // Altera o tipo conforme o estado do checkbox
//                   className="pl-10"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="showPassword"
//                 checked={showPassword}
//                 onChange={() => setShowPassword(!showPassword)}
//               />
//               <Label htmlFor="showPassword">Mostrar senha</Label>
//             </div>
//             {fieldError && <p className="text-sm text-red-600 text-center">{fieldError}</p>} {/* Exibe o erro de campo */}
//             {error && <p className="text-sm text-red-600 text-center">{error}</p>}
//             <Button className="w-full" onClick={handleLogin}>
//               <LogIn className="mr-2 h-4 w-4" /> Entrar
//             </Button>
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-4">
//             <Link href="/login/recuperarSenha" className="text-sm text-center text-blue-500 hover:underline">
//               Esqueceu sua senha?
//             </Link>
//           </CardFooter>
//         </Card>
//       </main>

//       {/* Footer */}
//       <footer className="bg-[#114494] text-[#f9b800] py-4">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext"; // Importando o contexto de autenticação
import api from "@/service/api";
import axios from "axios";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Alterado para aceitar string ou null
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const [fieldError, setFieldError] = useState<string | null>(null); // Novo estado para erros de campo
  const { setUser } = useAuth(); // Obtendo a função setUser do contexto
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setFieldError("Complete os dois campos!");
      return;
    }
  
    setFieldError(null);
  
    try {
      const response = await api.post("/api/auth/login", {
        email,
        pass: password,
      });
  
      const userData = response.data;
      console.log("Dados do usuário recebidos:", userData); // Verifique o formato dos dados aqui
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData)); // Salve o objeto corretamente
        setUser(userData); // Atualize o estado do usuário
        router.push("/alunos/perfil"); // Redirecione para o perfil
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Credenciais inválidas");
      }
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" prefetch={false} className="flex items-center gap-2">
            <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
              Volea
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
              <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="Email@example.com"
                  type="email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pass">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pass"
                  placeholder="Senha"
                  type={showPassword ? "text" : "password"} // Altera o tipo conforme o estado do checkbox
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <Label htmlFor="showPassword">Mostrar senha</Label>
            </div>
            {fieldError && <p className="text-sm text-red-600 text-center">{fieldError}</p>} {/* Exibe o erro de campo */}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            <Button className="w-full" onClick={handleLogin}>
              <LogIn className="mr-2 h-4 w-4" /> Entrar
            </Button>
          </CardContent>
          {/* <CardFooter className="flex flex-col space-y-4">
            <Link href="/login/recuperarSenha" className="text-sm text-center text-blue-500 hover:underline">
              Esqueceu sua senha?
            </Link>
          </CardFooter> */}
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-[#114494] text-[#f9b800] py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
