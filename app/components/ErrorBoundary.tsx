'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Send error to monitoring service (e.g., Sentry)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // TODO: Send to error monitoring service
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-meatra-dark text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-meatra-gray rounded-[20px] p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-meatra-gold mb-4">
              Что-то пошло не так
            </h1>
            <p className="text-gray-300 mb-6">
              Произошла ошибка при загрузке страницы. Мы уже работаем над исправлением.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-black/20 rounded-lg p-4 mb-4 text-sm">
                <summary className="cursor-pointer font-medium mb-2">
                  Детали ошибки (только для разработки)
                </summary>
                <pre className="text-red-400 overflow-auto">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="btn-primary"
              >
                Попробовать снова
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="btn-outline"
              >
                На главную
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC для оборачивания компонентов
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
): React.ComponentType<P> {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}
