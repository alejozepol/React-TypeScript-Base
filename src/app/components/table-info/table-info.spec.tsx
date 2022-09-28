import React from 'react';
import { render } from '@testing-library/react';

import TableInfo from './';

describe('TableInfo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableInfo />);
    expect(baseElement).toBeTruthy();
  });
});
