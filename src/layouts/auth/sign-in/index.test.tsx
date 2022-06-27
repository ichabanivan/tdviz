import { render, screen } from '@testing-library/react';

import { Provider } from '../../../app';

import { SignIn } from './index';

describe('[PAGE] sign-in', () => {
  test('Page is presented in the document', () => {
    render(<Provider>
      <SignIn />
    </Provider>);

    const page = screen.getByTestId('screen-sign-in');
    const SubmitButton = screen.getByTestId('sign-in-submit');
    const InputEmail = screen.getByTestId('input-email');
    const InputPassword = screen.getByTestId('input-password');

    expect(page).toBeInTheDocument();
    expect(InputEmail).toBeInTheDocument();
    expect(SubmitButton).toBeInTheDocument();
    expect(InputPassword).toBeInTheDocument();
  });
});
