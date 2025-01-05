import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputLabel } from './InputLabel';

describe('InputLabel Component', () => {
  it('renders the label with correct text', () => {
    render(<InputLabel htmlFor="test-input" label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('associates the label with the correct htmlFor', () => {
    render(<InputLabel htmlFor="test-input" label="Test Label" />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('shows asterisk when required is true', () => {
    render(<InputLabel htmlFor="test-input" label="Test Label" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show asterisk when required is false', () => {
    render(<InputLabel htmlFor="test-input" label="Test Label" />);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<InputLabel htmlFor="test-input" label="Test Label" required />);
    expect(asFragment()).toMatchSnapshot();
  });
});
