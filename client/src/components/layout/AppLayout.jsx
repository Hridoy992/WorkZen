import { Outlet } from 'react-router-dom';
import { usePreventBackAfterLogout } from '../../hooks/usePreventBackAfterLogout.js';

const AppLayout = () => {
  // Use the hook to prevent back navigation after logout
  usePreventBackAfterLogout();

  return <Outlet />;
};

export default AppLayout;