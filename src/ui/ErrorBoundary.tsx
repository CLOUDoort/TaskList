import { Link, isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import { TiArrowBack } from 'react-icons/ti';

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center max-w-[70%] gap-5">
        <h3 className="text-h3">Something went wrong 😢</h3>
        <p className="font-paragraph">{errorMessage}</p>
        <Link to="/" replace onClick={() => navigate(-1)} className="flex items-center gap-2">
          <TiArrowBack size={25} />
          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
