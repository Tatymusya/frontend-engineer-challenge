import { API_ERROR_MESSAGE } from '@shared/config/api/constants';
import type { IAppError } from '@shared/config/api/types/api.types';
import type { AxiosError } from 'axios';
import axios from 'axios';

interface IBackendErrorDTO {
  message: string;
  status: number;
}

export function normalizeAxiosError(error: unknown): IAppError {
  if (!axios.isAxiosError(error)) {
    return {
      kind: 'unknown',
      message: API_ERROR_MESSAGE.UNKNOWN_ERROR,
      cause: error,
    };
  }

  const axiosError = error as AxiosError<IBackendErrorDTO>;

  if (axiosError.code === 'ERR_CANCELED') {
    return {
      kind: 'canceled',
      message: API_ERROR_MESSAGE.CANCELED_ERROR,
      cause: error,
    };
  }

  if (axiosError.code === 'ECONNABORTED') {
    return {
      kind: 'timeout',
      message: API_ERROR_MESSAGE.TIMEOUT_ERROR,
      cause: error,
    };
  }

  if (!axiosError.response) {
    return {
      kind: 'network',
      message: API_ERROR_MESSAGE.NETWORK_ERROR,
      cause: error,
    };
  }

  const data = axiosError.response.data;
  const status = data?.status ?? axiosError.response.status;
  const message = data?.message?.trim() || `HTTP ошибка ${status}`;

  return {
    kind: 'http',
    httpStatus: status,
    message,
    cause: error,
  }
}