export async function postComment({ blogId, user, comment, token }) {
    try {
        const res = await fetch(`http://localhost:5000/api/blog/comments/${blogId}`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId: user,
                comment: comment
            }),
        });
        const text = await res.text();

        if (text) {
            const data = JSON.parse(text);
            if (res.status === 200) {
                return data;
            } else {
                throw new Error(data.error || data.message || 'Unknown error occurred');
            }
        } else {
            throw new Error('Empty response from server');
        }
    } catch (err) {
        console.log({ err: err.message || err.toString() });
        return;
    }
}

