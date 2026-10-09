import React from 'react';

export function Login() {
    return (
        <main className="container mt-4">
            <section className="login-section">
                <h2>Sign In</h2>
                <form>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />

                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account?<a href="#">Create an account</a></p>
            </section>
            {/* Placeholder for displaying the logged-in user's name */}
            <h2 className="display-6 text-center">Welcome, user!</h2>
        </main>
    );
}