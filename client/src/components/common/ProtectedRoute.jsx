import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
    const { isAuthenticated } = useSelector((state) => state.HRReducer || {});
    
    // Also check if user has manually logged out
    const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
    
    useEffect(() => {
        // If user has logged out, clear any remaining auth state
        if (hasLoggedOut === 'true' && isAuthenticated) {
            sessionStorage.clear();
            localStorage.clear();
        }
    }, [hasLoggedOut, isAuthenticated]);
    
    // Check if user is logged in and hasn't manually logged out
    if (!isAuthenticated || hasLoggedOut === 'true') {
        // Replace history so back button won't work
        return <Navigate to={redirectTo} replace={true} />;
    }
    
    return children;
};

export default ProtectedRoute;