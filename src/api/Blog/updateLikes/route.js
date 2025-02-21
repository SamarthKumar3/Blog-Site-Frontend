export async function updateLikes({ id, userId,token }) {
    try {
        const res = await fetch(`${process.env.backend_url}/api/blog/likes/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            throw new Error(data.error || 'Unknown error occurred');
        }
    }
    catch (err) {
        console.log({ err: err.message || err.toString() });
        if (err.message === 'User has already liked this post') {
            return { likedMessage: 'User has already liked this post' };
        }
    }
}