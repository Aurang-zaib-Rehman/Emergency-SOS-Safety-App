// components/Loader.jsx
export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="w-8 h-8 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}