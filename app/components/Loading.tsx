interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ text = 'Загрузка...', fullScreen = false }: LoadingProps) {
  const containerClass = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-meatra-dark'
    : 'flex items-center justify-center py-20';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-meatra-gold mb-4"></div>
        <p className="text-meatra-light-gray text-[clamp(16px,2vw,20px)] font-geist-sans">
          {text}
        </p>
      </div>
    </div>
  );
}
