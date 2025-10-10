type Props = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

export default function Input({ error, className = "", ...rest }: Props) {
  return (
    <div>
      <input
        {...rest}
        className={
          "w-full p-3 bg-black border rounded-md text-sm text-white outline-none transition " +
          (error ? "border-red-500 focus:border-red-500 " : "border-gray-700 focus:border-pink-500 ") +
          className
        }
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
