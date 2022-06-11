import { render } from '@testing-library/react';

import OutputText from './output-text';

describe('OutputText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OutputText />);
    expect(baseElement).toBeTruthy();
  });
});
