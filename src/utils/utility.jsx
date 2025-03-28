export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    // Format: Month Day, Year
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return "just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    // If more than a week, use the standard format
    return formatDate(dateString);
};
