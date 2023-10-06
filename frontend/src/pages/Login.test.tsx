import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import LoginPage from './Login';
import { MantineProvider } from '@mantine/core';

describe('LoginPage', () => {
    afterEach(cleanup);
    it('renders inputs and button', () => {
        render(
            <MantineProvider>
                <LoginPage />
            </MantineProvider>
        )

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');



        expect(document.body.contains(usernameInput)).toBe(true);
        expect(document.body.contains(passwordInput)).toBe(true);

    });

    it('handles input change', () => {
        render(
            <MantineProvider>
                <LoginPage />
            </MantineProvider>
        )

        const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        expect(usernameInput.value).toBe('testuser');


    });


});
