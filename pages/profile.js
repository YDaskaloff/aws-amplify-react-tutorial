import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    
    const checkUser = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    if (!user) return null;

    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
                Profile
            </h1>
            <h1 className="font-medium text-gray-500 my-2">
                Username: {user.username}
            </h1>
            <p className="font-sm text-gray-500 mb-6">
                Email: {user.attributes.email}
            </p>
            <AmplifySignOut />
        </div>
    )
}

export default withAuthenticator(Profile);