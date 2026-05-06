import { USER_API_ENDPOINTS } from '@entities/user';
import { buildUser, createUserDto } from '@entities/user/lib/factories/user-factory';
import { http, HttpResponse } from 'msw';

export const userHandlers = [
  // GET
  http.get(USER_API_ENDPOINTS.USER.CURRENT, () => {
    const user = createUserDto({
      firstName: 'Тест',
      lastName: 'Пользователь',
      isEmailVerified: false,
    });

    return HttpResponse.json(user, { status: 200 });
  }),

  // PATCH
  http.patch(USER_API_ENDPOINTS.USER.UPDATE, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const updatedUser = buildUser({
      verified: true,
      active: true,
      ...body,
    });

    return HttpResponse.json(updatedUser, { status: 200 });
  }),

  // POST
  http.post(USER_API_ENDPOINTS.USER.CHANGE_PASSWORD, async ({ request }) => {
    const { currentPassword, newPassword } = (await request.json()) as {
      currentPassword: string;
      newPassword: string;
    };

    if (!currentPassword || !newPassword) {
      return HttpResponse.json(
        { message: 'Invalid data' },
        { status: 400 }
      );
    }

    if (currentPassword === 'wrong') {
      return HttpResponse.json(
        { message: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  // POST
  http.post(USER_API_ENDPOINTS.USER.RESEND_VERIFY_EMAIL, () => {
    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  // GET
  http.get(USER_API_ENDPOINTS.USER.VERIFY_EMAIL_BY_LINK, ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (token === 'expired') {
      return HttpResponse.json(
        { message: 'Token expired' },
        { status: 410 }
      );
    }

    const verifiedUser = buildUser({
      verified: true,
      firstName: 'Верифицированный',
      role: token === 'admin-token' ? 'admin' : 'user',
    });

    return HttpResponse.json(verifiedUser, { status: 200 });
  }),
];