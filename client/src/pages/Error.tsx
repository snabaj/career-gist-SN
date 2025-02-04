import { useRouteError } from 'react-router-dom';

// Define an interface for the expected properties of the error object
interface RouteError extends Error {
  statusText?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;  // Cast the error to the RouteError type
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
