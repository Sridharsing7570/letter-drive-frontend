import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/utility";

function LetterCard({ letter, onDelete }) {
    return (
        <div className="card hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{letter.title}</h3>
                <div className="text-gray-600 mb-4 h-16 overflow-hidden">
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                letter.content.substring(0, 100) +
                                (letter.content.length > 100 ? "..." : ""),
                        }}
                    />
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    Last updated: {formatRelativeTime(letter.updatedAt)}
                </p>
                <div className="flex justify-between">
                    <Link
                        to={`/editor/${letter._id}`}
                        className="btn bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => onDelete(letter._id)}
                        className="btn bg-red-100 text-red-700 hover:bg-red-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LetterCard;
