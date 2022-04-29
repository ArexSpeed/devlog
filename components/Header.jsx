import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  //const [user, setUser] = useState({});
  console.log(session, 'session');
  return (
    <header className="header">
      <div className="header__logo">
        <span>CapDev</span>
      </div>
      {!session ? (
        <div className="header__actions">
          <Link href="/" passHref>
            <a className="header__actions-login">Login</a>
          </Link>
        </div>
      ) : (
        <div className="header__actions">
          <button
            className="nav__item"
            onClick={() =>
              signOut({
                callbackUrl: `/`
              })
            }>
            <Link href="/" passHref>
              <a className="nav__link">
                <span>Logout</span>
              </a>
            </Link>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
