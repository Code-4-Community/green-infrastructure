import { Zodios } from '@zodios/core'
import { userApi } from './api';

export const createApiClient = (baseUrl: string) => new Zodios(baseUrl, userApi);
