interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
  fullScreen?: boolean;
}

export default function ErrorMessage({ 
  message = 'Произошла ошибка при загрузке данных', 
  retry,
  fullScreen = false 
}: ErrorMessageProps) {
  const containerClass = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-meatra-dark'
    : 'flex items-center justify-center py-20';

  return (
    <div className={containerClass}>
      <div className="text-center max-w-md px-4">
        <div className="text-red-400 mb-4">
          <svg 
            className="w-16 h-16 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <p className="text-red-400 text-[clamp(16px,2vw,20px)] font-geist-sans mb-6">
          {message}
        </p>
        {retry && (
          <button 
            onClick={retry}
            className="bg-meatra-red hover:bg-[#D33] text-white px-6 py-3 rounded-[10px] text-[clamp(14px,1.5vw,18px)] font-geist-sans transition-all duration-300"
          >
            Попробовать снова
          </button>
        )}
      </div>
    </div>
  );
}
