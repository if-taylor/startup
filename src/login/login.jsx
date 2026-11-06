
import React from 'react';

export function Login({ userName, onLogin, onLogout }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [creatingAccount, setCreatingAccount] = React.useState(false);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            setError('Please enter an email and password.');
            return;
        }

        setLoading(true);
        setError('');

        const endpoint = creatingAccount
            ? '/api/auth/create'
            : '/api/auth/login';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            setPassword('');
            onLogin(data.email);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/logout', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            onLogout();
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="container mt-4">
            <section className="login-section">
                {userName ? (
                    <>
                        <h2>Account</h2>
                        <p>Signed in as {userName}</p>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loading}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <h2>{creatingAccount ? 'Create Account' : 'Sign In'}</h2>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? 'Please wait...' :
                                    creatingAccount ? 'Create Account' : 'Login'}
                            </button>
                        </form>

                        <p>
                            {creatingAccount
                                ? 'Already have an account? '
                                : "Don't have an account? "}
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setCreatingAccount(!creatingAccount);
                                    setError('');
                                }}
                            >
                                {creatingAccount ? 'Sign in' : 'Create an account'}
                            </a>
                        </p>
                    </>
                )}

                {error && <p role="alert">{error}</p>}
            </section>
        </main>
    );
}
