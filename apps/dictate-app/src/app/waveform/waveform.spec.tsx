import { render } from '@testing-library/react';

import Waveform from './waveform';

describe('Waveform', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Waveform />);
    expect(baseElement).toBeTruthy();
  });
});
