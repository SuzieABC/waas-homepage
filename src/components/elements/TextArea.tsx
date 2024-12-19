interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}
export default function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div className="mb-4">
      <label>{label}</label>
      <textarea className="border p-2 w-full rounded text-black" {...props} />
    </div>
  );
}
