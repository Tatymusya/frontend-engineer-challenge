import type { RegisterData, RegisterResponse } from './types';

/**
 * Registers a new user with the provided data
 * @param userData - The user registration data
 * @returns Promise containing registration response
 */
export async function registerUser(userData: RegisterData): Promise<RegisterResponse> {
  try {
    // In a real application, this would make an API call to your backend
    // For demonstration purposes, we're simulating the API call
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validation would typically happen on the backend
    if (!userData.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    
    // Mock successful registration
    console.log('Registering user:', userData);
    
    return {
      success: true,
      message: 'User registered successfully',
      userId: Math.random().toString(36).substring(7) // Mock user ID
    };
  } catch (error) {
    console.error('Registration error:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}