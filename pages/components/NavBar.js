import { Auth, Hub } from 'aws-amplify';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import '../../configureAmplify';

const NavBar = () => {
    const [signedUser, setSignedUser] = useState(false);

    const authListener = async () => {
        Hub.listen('auth', (data) => {
            switch (data.payload.event) {
                case 'signIn':
                    setSignedUser(true);
                    break;
                case 'signOut':
                    setSignedUser(false);
                    break;
                default:
                    break;
            }
        });

        try {
            await Auth.currentAuthenticatedUser();
            setSignedUser(true);
        } catch (err) {
            setSignedUser(false);
        }
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500 border-gray-300">
            {[
                ['Home', '/'],
                ['Create Post', '/create-post'],
                ['Profile', '/profile'],
            ].map(([title, url]) => (
                <Link legacyBehavior href={url} key={title}>
                    <a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate hover:text-slate-900">
                        {title}
                    </a>
                </Link>
            ))}
            {signedUser && (
                <Link legacyBehavior href="/my-posts">
                    <a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate hover:text-slate-900">
                        My Posts
                    </a>
                </Link>
            )}
        </nav>
    );
};

export default NavBar;
