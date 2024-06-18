import { useCallback, useState } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);

        try {
            const response = await fetch(url, { method, body, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '[useHttp] some response error');
            }

            return data;
        } catch (err) {
            setError(err.message);
            
            throw err;
        } finally {
            setLoading(false);
        }
    });

    return { loading, request, error };
}