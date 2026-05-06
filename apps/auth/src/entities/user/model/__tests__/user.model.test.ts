import { User } from '@entities/user';
import {
  createActiveUserDto,
  createInactiveUserDto,
  createUserDto
} from '@entities/user/lib/factories/user-factory';
import { describe, expect, it } from 'vitest';

describe('User: success cases', () => {
  it('should return full name when both firstName and lastName exist', () => {
    const user = new User(createUserDto({ firstName: 'Таня', lastName: 'Корнева' }));
    expect(user.fullName).toBe('Таня Корнева');
  });

  it('should return displayName as email if no name', () => {
    const user = new User(createUserDto({ firstName: '', lastName: '' }));
    expect(user.displayName).toBe(user.email);
  });

  it('should return true for isOnline if active less than 5 min ago', () => {
    const user = new User(createActiveUserDto());
    expect(user.isOnline).toBe(true);
  });

  it('should return false for isOnline if active more than 5 min ago', () => {
    const user = new User(createInactiveUserDto());
    expect(user.isOnline).toBe(false);
  });

  it('should return true for isAdmin if role is admin', () => {
    const user = new User(createUserDto({ role: 'admin' }))
    expect(user.isAdmin()).toBe(true);
  });

  it('should update firstName and phone', () => {
    const user = new User(createUserDto({ firstName: 'Таня', lastName: 'Корнева' }));
    user.update({ firstName: 'Петр', phone: '+79991234567' });
    expect(user.firstName).toBe('Петр');
    expect(user.phone).toBe('+79991234567');
  });
});

describe('User: failure cases', () => {

});