import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
//import { useSession } from 'next-auth/client';

const LoginForm = () => {
  //const [session] = useSession();
  const loginForm = useRef();
  const [error, setError] = useState();
  const [formProcessing, setFormProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    console.log("handle");
  }
  return (
    <div
      className="form sign"
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      initial={{ opacity: 0, scale: 0, translateY: 180 }}
      exit={{ opacity: 0, scale: 0, translateY: 180 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}>
      <form onSubmit={handleSubmit} ref={loginForm}>
        <div className="form__header">Login to your account</div>
        {error && <div className="form__error">{error}</div>}
        <div className="form__field">
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            className="form__input"
            type="text"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form__field">
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="form__button" disabled={formProcessing}>
          {formProcessing ? 'Checking...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
