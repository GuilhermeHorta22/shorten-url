function Button({children, className, ...props})
{
    return (
        <button className={`px-8 py-3 font-bold text-white rounded-2xl 
        transition-all duration-300 transform hover:scale-105 active:scale-95 
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg flex items-center justify-center ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button;