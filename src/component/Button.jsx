function Button({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    disabled = false,
    onClick,
    className = "",
}) {
    const baseClasses =
        "btn focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        outline:
            "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
    };

    const sizeClasses = {
        small: "px-2 py-1 text-sm",
        medium: "px-4 py-2",
        large: "px-6 py-3 text-lg",
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
