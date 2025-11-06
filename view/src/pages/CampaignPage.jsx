import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function CatalogPage() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [nomeCampanha, setNomeCampanha] = useState('');
  const [descricaoCampanha, setDescricaoCampanha] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const fetchCampanhas = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/campanhas_proxy/campanhas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
        }
        throw new Error('Falha ao buscar campanhas.');
      }

      const data = await response.json();
      setCampanhas(data.campanhas);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampanhas();
  }, []);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!nomeCampanha) {
      setFormError('O nome da campanha é obrigatório.');
      return;
    }

    setFormLoading(true);
    setFormError('');

    try {
      const response = await fetch('/api/campanhas_proxy/campanhas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: nomeCampanha,
          descricao: descricaoCampanha
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar campanha.');
      }

      setCampanhas(prevCampanhas => [data.campanha, ...prevCampanhas]);
      setNomeCampanha('');
      setDescricaoCampanha('');

    } catch (err) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full dark:bg-gray-900 dark:text-white p-4 md:p-8">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Painel do Mestre
        </h1>
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
          Sair
        </Button>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <aside className="md:col-span-1">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Nova Campanha</h2>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label htmlFor="nomeCampanha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nome da Campanha
                </label>
                <Input
                  id="nomeCampanha"
                  type="text"
                  placeholder="A Lenda do Dragão"
                  value={nomeCampanha}
                  onChange={(e) => setNomeCampanha(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="descricaoCampanha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descrição (Opcional)
                </label>
                <textarea
                  id="descricaoCampanha"
                  placeholder="Uma breve descrição da sua aventura..."
                  value={descricaoCampanha}
                  onChange={(e) => setDescricaoCampanha(e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
              </div>
              
              {formError && (
                <div className="text-sm text-red-700 dark:text-red-400">
                  {formError}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={formLoading}>
                {formLoading ? 'Criando...' : 'Criar Campanha'}
              </Button>
            </form>
          </div>
        </aside>

        <section className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Minhas Campanhas</h2>
          
          {loading && <p>Carregando campanhas...</p>}
          
          {error && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20 text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-4">
              {campanhas.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  Você ainda não participa de nenhuma campanha. Crie uma ao lado!
                </p>
              ) : (
                campanhas.map((campanha) => (
                  <div key={campanha.id} className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">{campanha.nome}</h3>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        campanha.papel === 'mestre' 
                          ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                          : 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {campanha.papel}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {campanha.descricao || 'Nenhuma descrição fornecida.'}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}