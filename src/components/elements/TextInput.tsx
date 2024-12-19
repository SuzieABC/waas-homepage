interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({ label, ...props }: TextInputProps) {
  return (
    <div className="mb-4">
      <label>{label}</label>
      <input className="border p-2 w-full rounded text-black" {...props} />
    </div>
  );
}
