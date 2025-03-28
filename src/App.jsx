import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./component/AuthProvider";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import PrivateRoute from "./component/routes/PrivateRoute";
import LetterEditor from "./component/LetterEditor";
import NotFound from "./component/NotFound";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <div className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/editor"
                                element={
                                    <PrivateRoute>
                                        <LetterEditor />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/editor/:id"
                                element={
                                    <PrivateRoute>
                                        <LetterEditor />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
