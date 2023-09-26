import { API, Auth } from 'aws-amplify';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { postsByUsername } from '../src/graphql/queries';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const { username, attributes: { sub: userId } } = user;

        const postData = await API.graphql({
            query: postsByUsername,
            variables: {
                username: `${userId}::${username}`
            },
        });

        setPosts(postData.data.postsByUsername.items);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1 className="text-sky-400 text-3xl font-semibold tracking-wide mt-6 mb-2">
                My posts
            </h1>

            { posts.map(
                (post) => (
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        <div className="cursor-pointer border-b border-gray-300 mt-8 pb-4">
                            <h2 className="text-xl font-semibold">
                                {post.title}
                            </h2>
                            <p className="text-gray-500 mt-2" >
                                Author:
                                {' '}
                                {post.username}
                            </p>
                        </div>
                    </Link>
                )
            )}
        </div>
    );
};

export default MyPosts;