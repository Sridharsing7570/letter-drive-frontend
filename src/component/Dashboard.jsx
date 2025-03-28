import { useState } from "react";
import { Link } from "react-router-dom";
import useLetters from "./api/useLetters";
import LetterCard from "./LetterCard";
import ConfirmDialog from "./ConfirmDialog";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";

function Dashboard() {
    const { letters, loadingLetters, error, deleteLetter } = useLetters();
    const [letterToDelete, setLetterToDelete] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleDeleteClick = (id) => {
        setLetterToDelete(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteLetter(letterToDelete);
            setIsConfirmOpen(false);
            setLetterToDelete(null);
        } catch (error) {
            alert("Failed to delete the letter. Please try again.");
        }
    };

    if (loadingLetters) {
        return (
            <div className="h-64 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">My Letters</h1>
                <Link to="/editor">
                    <Button variant="primary">Create New Letter</Button>
                </Link>
            </div>

            <ErrorAlert message={error} />

            {letters.length === 0 ? (
                <div className="card p-8 text-center">
                    <p className="text-gray-600 mb-4">You haven't created any letters yet.</p>
                    <Link to="/editor">
                        <Button variant="success">Create your first letter</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    // Continuing from where we left off...
                    {letters.map((letter) => (
                        <LetterCard key={letter._id} letter={letter} onDelete={handleDeleteClick} />
                    ))}
                </div>
            )}

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Letter"
                message="Are you sure you want to delete this letter? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                confirmVariant="danger"
            />
        </div>
    );
}

export default Dashboard;
