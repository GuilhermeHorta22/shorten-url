function Input(props) {
    return (
        <input 
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent 
            transition-all duration-200 text-lg" 
            {...props} 
        />
    );
}

export default Input;