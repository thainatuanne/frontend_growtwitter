import { Box, Button, Container, Grid, TextField } from '@mui/material'
import '../pages/sign-up.css';
import { useState } from "react";
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export function SignUp (){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [username, setUsername] = useState("");

    const [errors, setError] = useState({
        nome: false,
        email: false,
        senha: false,
        username: false
    })
    
    const navigate = useNavigate();

    async function handleCadastro(e: React.FormEvent){
        e.preventDefault();

    const newError = {
        nome: nome.trim() === "",
        email: email.trim() === "",
        senha: senha.trim() === "",
        username: username.trim() === ""
    }

    setError(newError);

    if(Object.values(newError).some((erro) => erro)) {
        return;
    }
  
    try {
        const response = await api.post("/sign-up", {
            nome,
            email,
            senha,
            username
        });

        const mensagem = response.data.message;
        alert(mensagem);


        navigate("/login");
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const mensagemError = error.response.data.mensagem;

        if(mensagemError){
            alert(mensagemError);
        } else{
            alert("Erro ao realizar login");
        }
    }
  }

    return(
        <>
        <Box className="body-signup">
            <Container className='signup-container'>
                <Grid container>
                    <Grid size={7} className="signup-box info">
                        <h1>Growtwitter</h1>
                        <h4>Trabalho final do bloco intermediário</h4>
                        <p>O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.</p>
                    </Grid>
                    <Grid size={5} className='signup-form form'>
                        <h2>Criar uma conta</h2>
                        <Box component="form" onSubmit={handleCadastro} sx={{ '& .MuiTextField-root': { width: '100%' } }} noValidate autoComplete="off">
                            <TextField label="Nome completo" variant="outlined" sx={{marginBottom: 2}} value={nome} onChange={(e) => setNome(e.target.value)} error={errors.nome} helperText={errors.nome ? "Preencha o Nome" : ""} />
                            <TextField label="E-mail" type="email" variant="outlined" sx={{marginBottom: 2}} value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} helperText={errors.email ? "Preencha o E-mail" : ""} />
                            <TextField label="Senha" type="password" autoComplete="current-password" sx={{marginBottom: 2}} value={senha} onChange={(e) => setSenha(e.target.value)} error={errors.senha} helperText={errors.senha ? "Preencha a Senha" : ""} />
                            <TextField label="Usuário" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} error={errors.username} helperText={errors.username ? "Preencha o Usuário" : ""} />
                        <Button type="submit" variant="contained" disableElevation>Entrar</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            </Box>
        </>
    )
}