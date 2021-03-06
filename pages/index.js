import { useState } from 'react';
import Head from 'next/head'
import LoginForm from 'components/LoginForm'
import RegisterForm from 'components/RegisterForm';

export default function Home() {
  const [login, setLogin] = useState(true);
  return (
    <div className="container">
      <Head>
        <title>Login with NextAuth</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="home">
      {login ? (
            <>
              <LoginForm />
              <div className="form sign" style={{ marginTop: '16px' }}>
                Do not have an account{' '}
                <button className="home__button" onClick={() => setLogin(false)}>
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <RegisterForm />
              <div className="form sign" style={{ marginTop: '16px' }}>
                You already have an account?{' '}
                <button className="home__button" onClick={() => setLogin(true)}>
                  Login
                </button>
              </div>
            </>
          )}
      </main>

    </div>
  )
}
