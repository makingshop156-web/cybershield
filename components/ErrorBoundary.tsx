"use client";
import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "@/components/ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-lg font-semibold text-cyber-text mb-2">
              Có lỗi xảy ra
            </h2>
            <p className="text-sm text-cyber-muted mb-6 leading-relaxed">
              Hệ thống gặp sự cố không mong muốn. Đừng lo, dữ liệu của bạn vẫn an toàn.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="primary" onClick={this.handleReset}>
                Thử lại
              </Button>
              <Button variant="ghost" onClick={() => window.location.reload()}>
                Tải lại trang
              </Button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-xs text-cyber-muted cursor-pointer">
                  Chi tiết lỗi (Dev)
                </summary>
                <pre className="mt-2 text-xs text-cyber-red bg-cyber-bg rounded-lg p-3 overflow-auto max-h-40">
                  {this.state.error.message}
                  {"\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
