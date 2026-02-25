import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const usePreventBackAfterLogout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isNavigatingBack = false;

        const handlePopState = (event) => {
            const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
            
            // If user has logged out, prevent back navigation to protected routes only
            if (hasLoggedOut === 'true') {
                const protectedPaths = ['/HR/dashboard', '/hr/dashboard'];
                const currentPath = window.location.pathname;
                
                // Check if trying to navigate back to dashboard routes
                if (protectedPaths.some(path => currentPath.toLowerCase().includes(path.toLowerCase()))) {
                    event.preventDefault();
                    isNavigatingBack = true;
                    window.history.replaceState(null, null, '/');
                    navigate('/', { replace: true });
                    return false;
                }
            }
        };

        const handleBeforeUnload = () => {
            const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
            if (hasLoggedOut === 'true' && isNavigatingBack) {
                // Clear browser history only when navigating back
                window.history.replaceState(null, null, '/');
            }
        };

        // Add event listeners
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Don't prevent normal navigation to login/auth pages
        // Only prevent if trying to access dashboard directly after logout
        const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
        if (hasLoggedOut === 'true') {
            const dashboardPaths = ['/HR/dashboard', '/hr/dashboard'];
            if (dashboardPaths.some(path => location.pathname.toLowerCase().includes(path.toLowerCase()))) {
                navigate('/', { replace: true });
            }
        }

        // Cleanup
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [navigate, location.pathname]);
};