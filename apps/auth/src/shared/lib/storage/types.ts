export interface IStorageKeys {
  ACCESS_TOKEN: string;
  REFRESH_TOKEN: string;
  USER_PREFERENCES: string;
}

export interface IStorageData {
  [key: string]: unknown;
}