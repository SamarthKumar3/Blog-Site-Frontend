export async function updateLikes({ blogId, userId,token }) {
    try {
        const res = await fetch(`http://localhost:5000/api/blog/likes/${blogId}`, {
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