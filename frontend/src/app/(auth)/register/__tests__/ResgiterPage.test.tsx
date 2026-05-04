import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../page';
import { useAppDispatch, useAppSelector, registerThunk, clearError } from '@/lib/store';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/lib/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
  registerThunk: jest.fn(),
  clearError: jest.fn(),
}));

describe('RegisterPage', () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    
  });
});
