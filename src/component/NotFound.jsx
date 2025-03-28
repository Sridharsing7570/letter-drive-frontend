import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-2xl text-gray-600 mb-8">Page not found</p>
            <p className="text-gray-500 mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary">
                Go back home
            </Link>
        </div>
    );
}

export default NotFound;
