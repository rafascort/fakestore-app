import { useCallback, useEffect, useRef, useState } from 'react';
import { getErrorMessage } from '../services/api';

// Hook que concentra o ciclo "carregando -> sucesso | erro" de uma requisição.
//
// - request: função que devolve uma Promise com os dados. Deve ser estável
//   (use useCallback); quando ela muda, a requisição é refeita automaticamente.
// - fallbackMessage: mensagem exibida quando o erro não traz uma mensagem própria.
// - initialData: valor de `data` antes do 1º sucesso e após uma falha.
//
// Retorna { data, loading, error, reload }.
export default function useFetch(request, { fallbackMessage, initialData = null } = {}) {
  const initialRef = useRef(initialData);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const execute = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setData(await request());
    } catch (err) {
      setData(initialRef.current);
      setError(getErrorMessage(err, fallbackMessage));
    } finally {
      setLoading(false);
    }
  }, [request, fallbackMessage]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, reload: execute };
}
