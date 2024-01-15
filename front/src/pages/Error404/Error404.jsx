import React, { useEffect } from 'react';
import './_Error404.css';
import { useNavigate } from 'react-router-dom';

export default function Error404(){
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000)
    
    return () =>
    clearTimeout(timer);
    }, [navigate]);

    return (
        <>
        <div id="error404">
            <h2>Page Introuvable</h2>
            <p>Vous allez être redirigé vers la page d'accueil dans 5 secondes</p>
        </div>
        </>
    )
}
