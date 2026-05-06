import { userHandlers } from '@/mock-server/handlers/user.handlers';
import { setupServer } from 'msw/node';

export const server = setupServer(...userHandlers);