import React from 'react';
import { useRouteError } from 'react-router-dom';
import '../App.css';

interface ErrorType {
  statusText?: string;
  message?: string;
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorType;
  console.error(error);

  const displayError = error?.statusText || error?.message || "Unknown error";

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p><i>{displayError}</i></p>
    </div>
  );
}

export default ErrorPage;
