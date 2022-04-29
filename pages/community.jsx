import React from 'react'
import Header from 'components/Header';
import { useSession, signOut } from 'next-auth/react';

const CommunityPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Header />
      <div className="container">
        {session ? <h1>Siemanko {session.user.name}</h1> : <h1>Ziomus nie jestes zalogowany!!</h1>}
      </div>
    </div>
  )
}

export default CommunityPage;