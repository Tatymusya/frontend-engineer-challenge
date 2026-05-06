export type ErrorLevel = 'info' | 'warning' | 'error';

export interface IAppError {
  id: string;
  type: IErrorType;
  message: string;
  details?: unknown;
  timestamp: number;
  stack?: string;
  context?: Record<string, unknown>;
  originalError?: unknown;
  level?: ErrorLevel;
  hasSentToReporter?: boolean;
}

export enum IErrorType {
  NETWORK = 'network',
  VALIDATION = 'validation',
  BUSINESS = 'business',
  SYSTEM = 'system',
  AUTH = 'auth',
  UNKNOWN = 'unknown'
}

export interface IErrorHandlerOptions {
  captureContext?: boolean;
  notifyUser?: boolean;
  logToConsole?: boolean;
  originalError?: unknown;
  context?: Record<string, unknown>;
}