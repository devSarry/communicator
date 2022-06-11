import { render } from '@testing-library/react';

import Statusbar from './statusbar';

describe('Statusbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Statusbar />);
    expect(baseElement).toBeTruthy();
  });
});
