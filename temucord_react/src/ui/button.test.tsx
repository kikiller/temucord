import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
    it('muestra el botón Log in', () => {
        render(<Button>Log in</Button>);

        expect(
            screen.getByRole('button', { name: /log in/i })
        ).toBeInTheDocument();
    });

    it('tiene la clase base inline-flex', () => {
        render(<Button>Log in</Button>);

        const button = screen.getByRole('button', { name: /log in/i });

        expect(button).toHaveClass('inline-flex');
    });
});