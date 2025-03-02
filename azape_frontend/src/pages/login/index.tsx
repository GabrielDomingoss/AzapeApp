/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles.scss';
import AzapeLogo from '../../assets/logo.png';
import { Alert, Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/authProvider';
import api from '../../services/api';
import { Footer } from '../../components/footer';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const {setIsAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleLogin = useCallback( async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const data = { email, password };
        try {
            if(error === true){
                setError(false);
            }
            const response = await api.post('proof/session', data);
            if(response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.name);
                setIsAuthenticated(true);
                navigate('/dashboard');
            }
        }
        catch(error: any) {
            setError(true);
            throw new Error(error?.response?.data.message)
        }
    },[email, error, navigate, password, setIsAuthenticated]);

    return (
        <div className='loginMain'>
            <div className="loginContainer">
                <img src={AzapeLogo} alt="logo Azape" className='azapeLogo'/>

                <form onSubmit={handleLogin}>
                    {error && (
                        <Alert severity="error">Erro no Login, por favor tente novamente.</Alert>
                    )}
                    <div>
                        <label>Email</label>
                        <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            size='small' 
                            fullWidth
                            required 
                            placeholder='seuemail@exemplo.com' 
                        />
                    </div>

                    <div className='passwordFields'>
                        <label>Senha</label>
                        <TextField 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            size='small'
                            fullWidth
                            type="password"
                            required
                            defaultValue={!password ? "teste123" : password}
                        />
                    </div>

                    <div className='forgotPassword'>
                        <Link to={"/resetPassword"}>Esqueci a senha</Link>
                    </div>


                    <Button type='submit' variant='contained' className='loginButton'>Entrar</Button>
                </form>
            </div>
            <div className="dashboardContainer"></div>
            <Footer />
        </div>
    )
}