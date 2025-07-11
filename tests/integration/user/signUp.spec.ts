import { describe, it, expect, vi, beforeEach } from 'vitest'

type RegisterPayload = { email: string; password: string; username: string };

function checkRequiredFields(payload: RegisterPayload, fields: string[]) {
    for (const field of fields) {
        if (!payload[field as keyof RegisterPayload]) {
            throw new Error('All required fields must be filled');
        }
    }
}

function signUpFactory({ useStrapiAuth, useRouter }: {
    useStrapiAuth: () => {
        register: (payload: { email: string, password: string, username: string }) => Promise<unknown>
    },
    useRouter: () => { push: (path: string) => Promise<void> }
}) {
    return async (payload: RegisterPayload) => {
        checkRequiredFields(payload, ['email', 'password', 'username']);
        const router = useRouter();
        const { register } = useStrapiAuth();
        await register(payload);
        await router.push('/');
    }
}

describe('signUp', () => {
    let register: ReturnType<typeof vi.fn>;
    let push: ReturnType<typeof vi.fn>;
    let useStrapiAuth: () => { register: typeof register };
    let useRouter: () => { push: typeof push };
    let signUp: (payload: RegisterPayload) => Promise<void>;

    beforeEach(() => {
        register = vi.fn().mockResolvedValue({ user: { id: 2 } });
        push = vi.fn().mockResolvedValue(undefined);
        useStrapiAuth = () => ({ register });
        useRouter = () => ({ push });
        signUp = signUpFactory({ useStrapiAuth, useRouter });
    });

    it('register succeeds with valid data', async () => {
        // Arrange
        const payload = { email: 'new@mail.com', password: 'abcdef', username: 'newuser' };

        // Act
        await signUp(payload);

        // Assert
        expect(register).toHaveBeenCalledWith(payload);
        expect(push).toHaveBeenCalledWith('/');
    });

    it('register fails if email is taken', async () => {
        // Arrange
        register.mockRejectedValueOnce(new Error('Email taken'));
        const payload = { email: 'taken@mail.com', password: 'pass', username: 'user' };

        // Act
        await expect(signUp(payload)).rejects.toThrow('Email taken');

        // Assert
        expect(push).not.toHaveBeenCalled();
    });

    it('register fails if fields are missing', async () => {
        // Arrange
        const payload = { email: '', password: '', username: '' };

        // Act
        await expect(signUp(payload)).rejects.toThrow('All required fields must be filled');

        // Assert
        expect(push).not.toHaveBeenCalled();
    });
});
