import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkRequiredFields } from '../../utils/requiredFieldChecks'

type LoginPayload = { email: string; password: string };

function signInFactory({ useStrapiAuth, useRouter }: {
    useStrapiAuth: () => {
        login: (payload: { identifier: string, password: string }) => Promise<unknown>
    },
    useRouter: () => { push: (path: string) => Promise<void> }
}) {
    return async (payload: LoginPayload) => {
        checkRequiredFields(payload, ['email', 'password']);
        const router = useRouter();
        const { login } = useStrapiAuth();
        await login({ identifier: payload.email, password: payload.password });
        await router.push('/');
    }
}

describe('signIn', () => {
    let login: ReturnType<typeof vi.fn>;
    let push: ReturnType<typeof vi.fn>;
    let useStrapiAuth: () => { login: typeof login };
    let useRouter: () => { push: typeof push };
    let signIn: (payload: LoginPayload) => Promise<void>;

    beforeEach(() => {
        login = vi.fn().mockResolvedValue({ user: { id: 1 } });
        push = vi.fn().mockResolvedValue(undefined);
        useStrapiAuth = () => ({ login });
        useRouter = () => ({ push });
        signIn = signInFactory({ useStrapiAuth, useRouter });
    });

    it('login succeeds with valid credentials', async () => {
        // Arrange
        const payload = { email: 'test@mail.com', password: '123456' };

        // Act
        await signIn(payload);

        // Assert
        expect(login).toHaveBeenCalledWith({ identifier: payload.email, password: payload.password });
        expect(push).toHaveBeenCalledWith('/');
    });

    it('login fails with invalid credentials', async () => {
        // Arrange
        login.mockRejectedValueOnce(new Error('Invalid credentials'));
        const payload = { email: 'fail@mail.com', password: 'wrong' };

        // Act
        await expect(signIn(payload)).rejects.toThrow('Invalid credentials');

        // Assert
        expect(push).not.toHaveBeenCalled();
    });

    it('login fails if fields are missing', async () => {
        // Arrange
        const payload = { email: '', password: '' };

        // Act
        await expect(signIn(payload)).rejects.toThrow('All required fields must be filled');

        // Assert
        expect(push).not.toHaveBeenCalled();
    });
});
