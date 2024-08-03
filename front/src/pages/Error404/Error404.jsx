import React, { useEffect } from 'react';
import './_Error404.css';
import { useNavigate } from 'react-router-dom';

// Error404 component: Displays a 404 error page and redirects to home after 5 seconds
export default function Error404(){
    // Hook to programmatically navigate
    const navigate = useNavigate();

    // Effect hook to set up redirection timer
    useEffect(() => {
        // Set a timer to redirect after 5 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000)
    
        // Cleanup function to clear the timer if component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);

    // Render the error message and redirection notice
    return (
        <>
        <div id="error404">
            <h2>Page Introuvable</h2>
            <p>Vous allez être redirigé vers la page d'accueil dans 5 secondes</p>
        </div>
        </>
    )
}