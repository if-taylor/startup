import React from 'react';

export function Login({ userName, onLogin, onLogout }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            return;
        }

        localStorage.setItem('userName', email);
        onLogin(email);
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
                            onClick={() => {
                                localStorage.removeItem('userName');
                                onLogout();
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <h2>Sign In</h2>

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />

                            <button type="submit">
                                Login
                            </button>
                        </form>

                        <p>
                            Don't have an account?
                            <a href="#">Create an account</a>
                        </p>
                    </>
                )}
            </section>
        </main>
    );
}