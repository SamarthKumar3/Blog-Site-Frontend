export async function postComment({blogId, commentAuthor, commentContent}) {
    try {
        const res = await fetch(`http://localhost:5000/api/blog/comments/${blogId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:commentAuthor,
                comment:commentContent,
            }),
        });
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            throw new Error(data.error || 'Unknown error occurred');
        }
    } catch (err) {
        console.log({ err: err.message || err.toString() });
        return;
    }
}

