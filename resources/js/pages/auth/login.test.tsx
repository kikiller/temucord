import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './login';

let mockProcessing = false;
let mockErrors: Record<string, string> = {};

vi.mock('@inertiajs/react', () => ({
    Head: () => null,
    Link: ({ children, href, ...props }: any) => (
        <a href={typeof href === 'string' ? href : '#'} {...props}>
            {children}
        </a>
    ),
    Form: ({ children, className }: any) => (
        <form className={className} data-testid="login-form">
            {children({
                processing: mockProcessing,
                errors: mockErrors,
            })}
        </form>
    ),
}));

vi.mock('@/routes', () => ({
    register: () => '/register',
}));

vi.mock('@/routes/login', () => ({
    store: {
        form: () => ({
            action: '/login',
            method: 'post',
        }),
    },
}));

vi.mock('@/routes/password', () => ({
    request: () => '/forgot-password',
}));

describe('Login page', () => {
    beforeEach(() => {
        mockProcessing = false;
        mockErrors = {};
    });

    it('muestra email, password y botón de login', () => {
        render(<Login canResetPassword={true} canRegister={true} />);

        expect(
            screen.getByRole('textbox', { name: /email address/i }),
        ).toBeInTheDocument();

        const passwordInput = screen.getByLabelText(/^password$/i, {
            selector: 'input',
        });

        expect(passwordInput).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: /log in/i }),
        ).toBeInTheDocument();
    });

    it('marca email y password como requeridos', () => {
        render(<Login canResetPassword={true} canRegister={true} />);

        expect(
            screen.getByRole('textbox', { name: /email address/i }),
        ).toBeRequired();

        const passwordInput = screen.getByLabelText(/^password$/i, {
            selector: 'input',
        });

        expect(passwordInput).toBeRequired();
    });

    it('muestra el link Forgot password cuando aplica', () => {
        render(<Login canResetPassword={true} canRegister={false} />);

        expect(
            screen.getByRole('link', { name: /forgot password\?/i }),
        ).toBeInTheDocument();
    });

    it('muestra el link Sign up cuando aplica', () => {
        render(<Login canResetPassword={false} canRegister={true} />);

        expect(
            screen.getByRole('link', { name: /sign up/i }),
        ).toBeInTheDocument();
    });

    it('muestra errores del formulario', () => {
        mockErrors = {
            email: 'El correo es obligatorio',
            password: 'La contraseña es obligatoria',
        };

        render(<Login canResetPassword={false} canRegister={false} />);

        expect(
            screen.getByText('El correo es obligatorio'),
        ).toBeInTheDocument();

        expect(
            screen.getByText('La contraseña es obligatoria'),
        ).toBeInTheDocument();
    });

    it('deshabilita el botón cuando processing es true', () => {
        mockProcessing = true;

        render(<Login canResetPassword={false} canRegister={false} />);

        expect(
            screen.getByRole('button', { name: /log in/i }),
        ).toBeDisabled();
    });

    it('muestra el mensaje de status cuando existe', () => {
        render(
            <Login
                canResetPassword={false}
                canRegister={false}
                status="Tu contraseña fue restablecida"
            />,
        );

        expect(
            screen.getByText('Tu contraseña fue restablecida'),
        ).toBeInTheDocument();
    });
});