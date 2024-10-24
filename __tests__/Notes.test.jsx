import React from 'react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notes from '../Notes'; 

const server = setupServer(
  http.get('/notes', () => {
    return HttpResponse.json([{ id: 1, content: 'First note' }]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays notes', async () => {
  render(<Notes />);

  fireEvent.click(screen.getByText('Load Notes')); 

  const noteElement = await screen.findByRole('listitem');

  expect(noteElement).toHaveTextContent('First note');
  expect(screen.getByRole('button')).toBeDisabled(); 
});

test('handles server error', async () => {
  server.use(
    http.get('/notes', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<Notes />);

  fireEvent.click(screen.getByText('Load Notes'));

  const alertElement = await screen.findByRole('alert'); 
  
  expect(alertElement).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toBeDisabled(); 
});