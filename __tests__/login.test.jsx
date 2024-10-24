import React from 'react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login'; 

const server = setupServer(
  http.post('/login', (req, res, ctx) => {
    const { username, password } = req.body;


    if (username === 'testuser' && password === 'password123') {
      return res(ctx.json({ message: 'Login successful' }));
    }
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('successful login', async () => {
  render(<Login />);

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'testuser' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByText(/login/i));

  const successMessage = await screen.findByRole('alert'); 
  expect(successMessage).toHaveTextContent('Login successful');
  expect(screen.getByRole('button')).toBeDisabled(); 
});

test('failed login', async () => {
  render(<Login />);

  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: 'wronguser' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'wrongpass' },
  });
  fireEvent.click(screen.getByText(/login/i));

  const errorMessage = await screen.findByRole('alert'); 
  expect(screen.getByRole('button')).not.toBeDisabled(); 
});
