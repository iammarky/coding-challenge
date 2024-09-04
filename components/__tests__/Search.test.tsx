import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../Search';

const mockData = [
  { id: 1, name: 'Lord Barbatos' },
  { id: 2, name: 'Poseidon Seaking' },
  { id: 3, name: 'Balder Bright' },
];

describe('Search component', () => {
  test('renders all items initially', () => {
    render(<Search data={mockData} />);
    expect(screen.getByText('Lord Barbatos')).toBeInTheDocument();
    expect(screen.getByText('Poseidon Seaking')).toBeInTheDocument();
    expect(screen.getByText('Balder Bright')).toBeInTheDocument();
  });

  test('filters items based on search query', async () => {
    render(<Search data={mockData} />);
    await userEvent.type(screen.getByPlaceholderText('Search...'), 'Poseidon');
    expect(screen.getByText('Poseidon Seaking')).toBeInTheDocument();
    expect(screen.queryByText('Lord Barbatos')).not.toBeInTheDocument();
  });

  test('displays no results if no matches are found', async () => {
    render(<Search data={mockData} />);
    await userEvent.type(screen.getByPlaceholderText('Search...'), 'XYZ');
    expect(screen.queryByText('Lord Barbatos')).not.toBeInTheDocument();
    expect(screen.queryByText('Poseidon Seaking')).not.toBeInTheDocument();
    expect(screen.queryByText('Balder Bright')).not.toBeInTheDocument();
  });
});
