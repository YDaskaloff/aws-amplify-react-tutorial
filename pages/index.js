import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';

import { listPosts } from '../src/graphql/queries';

export default function Home() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const postData = await API.graphql({
            query: listPosts,
        });

        setPosts(postData.data.listPosts.items);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1 className="text-sky-400 text-6xl font-bold underline">
                My posts
            </h1>

            {
        posts.map((post) => (
            <p key={post.id}>{post.title}</p>
        ))
      }
        </div>
    );
}
