import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { getTokens } from '../utils/tokenStorage';
import {authService} from '../services/authService';

const WelcomeScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('usuário');
  const [expiration, setExpiration] = useState<string>('Desconhecida');
  const navigate = useNavigate();
const handleLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };
  useEffect(() => {
    const tokens = getTokens();

    if (!tokens || !tokens.accessToken) {
      navigate('/login');
      return;
    }

    const emailFromStorage = localStorage.getItem('user_email');
    const expiresAt = new Date(tokens.expiresAt);

    setEmail(emailFromStorage || 'usuário');
    setExpiration(expiresAt.toLocaleString('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'short'
    }));
  }, [navigate]);

  const handleGoToDashboard = () => navigate('/dashboard');



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={52} />
        <h1 className="text-3xl font-bold mb-2">Seja bem-vindo(a)!</h1>
        <p className="text-gray-700 text-lg mt-2">
          <strong>{email}</strong>, seu token expira em:
        </p>
        <p className="text-indigo-700 font-semibold text-lg mt-1">{expiration}</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-md transition duration-200"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
