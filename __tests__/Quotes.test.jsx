import React from 'react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Quotes from '../Quotes'; 

const server = setupServer(
  http.get('/quotes', () => {
    return HttpResponse.json({ quote: 'The only limit to our realization of tomorrow is our doubts of today.' });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays a quote', async () => {
  render(<Quotes />);

  fireEvent.click(screen.getByText('Load Quote')); 

  const quoteElement = await screen.findByRole('heading'); 

  expect(quoteElement).toHaveTextContent('The only limit to our realization of tomorrow is our doubts of today.');
  expect(screen.getByRole('button')).toBeDisabled(); 
});

test('handles server error', async () => {
  server.use(
    http.get('/quotes', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<Quotes />);

  fireEvent.click(screen.getByText('Load Quote'));

  const alertElement = await screen.findByRole('alert'); 

  expect(alertElement).toHaveTextContent('Oops!!,  failed to fetch!'); 
  expect(screen.getByRole('button')).not.toBeDisabled(); 
});
