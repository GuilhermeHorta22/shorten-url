function Label({children, ...props})
{
    return (
        <label className="mt-5 block font-semibold mb-0 select-none text-neutral-700 p-2" {...props}>
            {children}
        </label>
    );
}

export default Label;