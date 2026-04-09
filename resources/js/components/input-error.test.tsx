import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InputError from './input-error';

describe('InputError', () => {
    it('muestra el mensaje de error cuando existe', () => {
        render(<InputError message="El correo es obligatorio" />);

        expect(
            screen.getByText('El correo es obligatorio')
        ).toBeInTheDocument();
    });

    it('no muestra nada cuando no recibe mensaje', () => {
        const { container } = render(<InputError />);

        expect(container).toBeEmptyDOMElement();
    });

    it('tiene la clase de color para error', () => {
        render(<InputError message="Error de prueba" />);

        expect(
            screen.getByText('Error de prueba')
        ).toHaveClass('text-red-600');
    });
});