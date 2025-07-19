import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../Loading';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';

describe('Loading', () => {
  it('renders with default props', () => {
    const { container } = render(<Loading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('w-6', 'h-6', 'animate-spin', 'text-blue-600');
  });

  it('renders with custom text', () => {
    render(<Loading text="Please wait..." />);
    
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders without text when text prop is empty', () => {
    const { container } = render(<Loading text="" />);
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    const spinner = container.querySelector('svg');
    expect(spinner).toBeInTheDocument();
  });

  it('applies small size classes correctly', () => {
    const { container } = render(<Loading size="sm" />);
    
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('w-4', 'h-4');
    
    const text = screen.getByText('Loading...');
    expect(text).toHaveClass('text-sm');
  });

  it('applies medium size classes correctly', () => {
    const { container } = render(<Loading size="md" />);
    
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('w-6', 'h-6');
    
    const text = screen.getByText('Loading...');
    expect(text).toHaveClass('text-base');
  });

  it('applies large size classes correctly', () => {
    const { container } = render(<Loading size="lg" />);
    
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveClass('w-8', 'h-8');
    
    const text = screen.getByText('Loading...');
    expect(text).toHaveClass('text-lg');
  });

  it('applies custom className', () => {
    render(<Loading className="custom-class" />);
    
    const container = screen.getByText('Loading...').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<Loading />);
    
    const spinner = container.querySelector('svg');
    expect(spinner).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    expect(spinner).toHaveAttribute('fill', 'none');
    expect(spinner).toHaveAttribute('viewBox', '0 0 24 24');
  });
});