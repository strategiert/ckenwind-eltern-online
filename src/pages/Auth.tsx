
import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginForm from '@/components/auth/LoginForm';

const Auth = () => {
  return (
    <>
      <Helmet>
        <title>Admin Login | Rückenwind Eltern</title>
        <meta name="description" content="Admin login for blog management" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <LoginForm />
    </>
  );
};

export default Auth;
