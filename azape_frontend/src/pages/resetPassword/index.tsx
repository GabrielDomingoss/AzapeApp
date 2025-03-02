/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles.scss';
import AzapeLogo from '../../assets/logo.png';
import { Alert, Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Footer } from '../../components/footer';

export function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = useCallback( async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const data = { email, newPassword };
        try {
            if(error === true){
                setError(false);
            }
            const response = await api.post('proof/resetPassword', data);
            if(response.status === 200) {
                alert("Senha atualizada com sucesso")
                navigate('/login');
            }
        }
        catch(error: any) {
            setError(true);
            throw new Error(error?.response?.data.message)
        }
    },[email, error, navigate, newPassword]);

    return (
        <div className='resetPasswordMain'>
        <div className="resetPasswordContainer">
            <img src={AzapeLogo} alt="logo Azape" className='azapeLogoResetPassword'/>

            <form onSubmit={handleLogin}>
                {error && (
                    <Alert severity="error">Erro ao atualizar senha, por favor tente novamente.</Alert>
                )}
                <div>
                    <label>Email</label>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        size='small' 
                        fullWidth
                        required 
                        placeholder='Seu email' 
                    />
                </div>

                <div className='passwordFields'>
                    <label>Nova Senha</label>
                    <TextField 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} 
                        size='small'
                        fullWidth
                        type="password"
                        required
                        defaultValue={!newPassword ? "teste123" : newPassword}
                    />
                </div>

                <Button type='submit' variant='contained' className='saveButton'>Salvar</Button>
            </form>
        </div>
        <div className="dashboardContainer"></div>
        <Footer />
    </div>
    )
}