import Link from 'next/link';
//import axios from 'axios';
import { useState, useEffect } from 'react';
//import { useSession } from 'next-auth/client';

const Header = () => {
  //const [session] = useSession();
  //const [user, setUser] = useState({});
  const [session, setSession] = useState(false);
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
          <div className="header__actions-user">
            {/* <span>{session ? user.name : ''}</span> */}
            <span>User Name</span>
            <div className="header__image">
              {/* <img src={session ? user.imageUrl : ''} alt="" /> */}
              <img src="" alt="" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
