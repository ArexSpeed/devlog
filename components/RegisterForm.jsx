import { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  //const [session] = useSession();
  const registerForm = useRef();
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(registerForm.current);
    const payload = {
      email: form.get('email'),
      name: form.get('fullname'),
      password: form.get('password'),
      position: form.get('position')
    };

    if (payload.password !== form.get('confirmpassword')) {
      setError('Given passwords not match');
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      setError("Congratulation you are registered");
      await signIn('credentials', {
        redirect: false,
        email: form.get('email'),
        password: form.get('password')
      });
      router.push('/community');
    } else {
      const payload = await response.json();
      setError(payload.error);
    }
  };
  
  return (
    <form action="#" onSubmit={handleSubmit} ref={registerForm} className="form sign">
      <div className="form__header">Create your new developer account</div>
        {error && <div className="form__error">{error}</div>}
        <div className="form__field">
          <label htmlFor="fullname" className="form__label">
            Full name
          </label>
          <input
            className="form__input"
            type="text"
            name="fullname"
            placeholder="Enter your fullname"
            required
          />
        </div>
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
        <div className="form__field">
          <label htmlFor="confirmpassword" className="form__label">
            Confirm Password
          </label>
          <input
            className="form__input"
            type="password"
            name="confirmpassword"
            placeholder="Repeat your password"
            required
          />
        </div>
        <div className="form__field">
          <label htmlFor="position" className="form__label">
            Position
          </label>
          <select className="form__selector" name="position">
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
          </select>
        </div>
        <button type="submit" className="form__button">
          Create account
        </button>
      </form>
  );
};

export default RegisterForm;
