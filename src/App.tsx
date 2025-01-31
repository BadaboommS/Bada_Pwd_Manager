import React from 'react';
import { Routes, Route, HashRouter } from 'react-router';
import PublicRouter from './pages/Public/PublicRouter';
import AccountRouter from './pages/Account/AccountRouter';
import AuthGuard from './helpers/AuthGuard';
import GeneralContextProvider from './context/GeneralContextProvider';

import './style/main.css';

const App = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <GeneralContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter />} />
          <Route path="/account/*" element={
            <AuthGuard>
              <AccountRouter />
            </AuthGuard>
          } />
        </Routes>
      </HashRouter>
    </GeneralContextProvider>
  </div>
);

export default App;