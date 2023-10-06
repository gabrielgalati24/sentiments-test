import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { MantineProvider } from '@mantine/core';
import RegisterPage from './Register';

describe('LoginPage', () => {
    afterEach(cleanup);
    it('renders inputs and button', () => {
        render(
            <MantineProvider>
                <RegisterPage />
            </MantineProvider>
        )

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const emailInput = screen.getByPlaceholderText('Email');



        expect(document.body.contains(usernameInput)).toBe(true);
        expect(document.body.contains(passwordInput)).toBe(true);
        expect(document.body.contains(emailInput)).toBe(true);

    });

    it('handles input change', () => {
        render(
            <MantineProvider>
                <RegisterPage />
            </MantineProvider>
        )

        const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');


    });


});
