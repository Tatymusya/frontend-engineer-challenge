import { User } from '@entities/user';
import {
  createActiveUserDto,
  createInactiveUserDto,
  createUserDto,
  createUserWithFullName,
} from '@entities/user/lib/factories/user-factory';
import { describe, expect, it } from 'vitest';

describe('User (snapshot)', () => {
  it('creates user with minimal data', () => {
    const user = new User(createUserDto());
    expect(user).toMatchSnapshot();
  });

  it('handles full name correctly', () => {
    const user = new User(createUserWithFullName('Иван', 'Иванов'));
    expect(user.fullName).toBe('Иван Иванов');
    expect(user.displayName).toBe('Иван Иванов');
    expect(user).toMatchInlineSnapshot(`
      User {
        "data": {
          "createdAt": "2025-09-21T02:45:05.146Z",
          "email": "Derek_Volkman53@yahoo.com",
          "firstName": "Иван",
          "id": "c13477b2-82ce-4927-96de-65932bc9fae7",
          "isEmailVerified": false,
          "lastActiveAt": null,
          "lastName": "Иванов",
          "phone": undefined,
          "role": "user",
        },
      }
    `);
  });

  it('shows displayName as email if no name', () => {
    const user = new User(createUserDto());
    expect(user.displayName).toBe(user.email);
    expect(user).toMatchInlineSnapshot(`
      User {
        "data": {
          "createdAt": "2025-12-10T15:56:43.001Z",
          "email": "Miguel.Larson@yahoo.com",
          "firstName": null,
          "id": "5735a5cc-df1e-45de-8034-a128bda9b4e7",
          "isEmailVerified": false,
          "lastActiveAt": null,
          "lastName": null,
          "phone": undefined,
          "role": "user",
        },
      }
    `);
  });

  it('marks active user as online', () => {
    const user = new User(createActiveUserDto());
    expect(user.isOnline).toBe(true);
    expect(user).toMatchInlineSnapshot(`
      User {
        "data": {
          "createdAt": "2025-10-12T12:38:57.726Z",
          "email": "Kara67@yahoo.com",
          "firstName": null,
          "id": "641770bb-b60e-4c25-b952-2d4976eb413e",
          "isEmailVerified": false,
          "lastActiveAt": "2025-12-31T23:56:00.000Z",
          "lastName": null,
          "phone": undefined,
          "role": "user",
        },
      }
    `);
  });

  it('marks inactive user as offline', () => {
    const user = new User(createInactiveUserDto());
    expect(user.isOnline).toBe(false);
    expect(user).toMatchInlineSnapshot(`
      User {
        "data": {
          "createdAt": "2025-05-19T03:13:35.293Z",
          "email": "Herman45@hotmail.com",
          "firstName": null,
          "id": "6ce4fdb5-edf0-405f-822c-1b70cc20c347",
          "isEmailVerified": false,
          "lastActiveAt": "2025-12-31T23:35:00.000Z",
          "lastName": null,
          "phone": undefined,
          "role": "user",
        },
      }
    `);
  });

  it('recognizes admin role', () => {
    const user = new User(createUserDto({ role: 'admin' }));
    expect(user.isAdmin()).toBe(true);
    expect(user.isModerator()).toBe(false);
    expect(user).toMatchInlineSnapshot(`
      User {
        "data": {
          "createdAt": "2025-09-17T22:10:20.816Z",
          "email": "Crystal.Schumm79@yahoo.com",
          "firstName": null,
          "id": "d79a793b-6343-42c4-b2a6-aa433100339e",
          "isEmailVerified": false,
          "lastActiveAt": null,
          "lastName": null,
          "phone": undefined,
          "role": "admin",
        },
      }
    `);
  });

  it('recognizes moderator role', () => {
    const user = new User(createUserDto({ role: 'moderator' }));
    expect(user.isModerator()).toBe(true);
    expect(user.isAdmin()).toBe(false);
    expect(user).toMatchInlineSnapshot(`
      User {
        "data": {
          "createdAt": "2025-06-23T12:08:45.537Z",
          "email": "Erik_Metz@yahoo.com",
          "firstName": null,
          "id": "ec547661-9bc6-4c7b-a36d-d30b56cfe2ca",
          "isEmailVerified": false,
          "lastActiveAt": null,
          "lastName": null,
          "phone": undefined,
          "role": "moderator",
        },
      }
    `);
  });

  it('updates data correctly', () => {
    const user = new User(createUserDto());
    user.update({ firstName: 'Петр', phone: '+79991234567' });
    expect(user.firstName).toBe('Петр');
    expect(user.phone).toBe('+79991234567');
    expect(user).toMatchInlineSnapshot(`
      User {
        "data": {
          "createdAt": "2025-12-12T12:28:39.113Z",
          "email": "Don_Gorczany19@gmail.com",
          "firstName": "Петр",
          "id": "92f8724c-4b4e-44ef-a25a-e216f0291593",
          "isEmailVerified": false,
          "lastActiveAt": null,
          "lastName": null,
          "phone": "+79991234567",
          "role": "user",
        },
      }
    `);
  });

  it('hasPhone returns true when phone is set', () => {
    const user = new User(createUserDto({ phone: '+79991234567' }));
    expect(user.hasPhone()).toBe(true);
    expect(user).toMatchInlineSnapshot(`
      User {
        "data": {
          "createdAt": "2025-07-18T23:45:09.641Z",
          "email": "Trystan_Crist@hotmail.com",
          "firstName": null,
          "id": "86095415-1005-4183-bf4a-87a2c2a30aaa",
          "isEmailVerified": false,
          "lastActiveAt": null,
          "lastName": null,
          "phone": "+79991234567",
          "role": "user",
        },
      }
    `);
  });
});