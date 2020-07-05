import React from 'react';
import { render } from '@testing-library/react';
import HelloMessage from './Hello';

test('renders learn react link', () => {
  const { getByText } = render(<HelloMessage name="World!" />);
  const element = getByText(/Hello World!/i);
  expect(element).toBeInTheDocument();
});
