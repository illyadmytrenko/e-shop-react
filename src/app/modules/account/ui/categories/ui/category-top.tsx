interface CategoryTopProps {
  h5: string;
  p: string;
}

export function CategoryTop({ h5, p }: CategoryTopProps) {
  return (
    <div className="mb-6">
      <h5 className="font-bold text-xl mb-2">{h5}</h5>
      <p className="text-gray-500">{p}</p>
    </div>
  );
}
