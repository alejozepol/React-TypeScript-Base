import React from 'react';
import { render } from '@testing-library/react';

import FiltersCamp from './';

describe('FiltersCamp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FiltersCamp />);
    expect(baseElement).toBeTruthy();
  });
});
