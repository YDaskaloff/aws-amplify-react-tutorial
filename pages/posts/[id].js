import { API } from 'aws-amplify';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import '../../configureAmplify';
import { listPosts, getPost } from '../../src/graphql/queries';

const Post = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-5xl mt-4 font-semibold tracking-wide">
                {post.title}
            </h1>
            <p className="text-sm font-light my-4">
                {post.username}
                {' '}
                -
                {' '}
                {post.createdAt}
            </p>
            <ReactMarkdown className="prose" >
                {post.content}
            </ReactMarkdown>
        </div>
    );
};

export const getStaticPaths = async () => {
    const postData = await API.graphql({
        query: listPosts,
    });

    const paths = postData.data.listPosts.items.map((post) => ({ params: { id: post.id } }));

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps = async ({ params: { id } }) => {
    const postData = await API.graphql({
        query: getPost,
        variables: { id },
    });

    return {
        props: {
            post: postData.data.getPost,
        },
        revalidate: 1,
    };
};

export default Post;