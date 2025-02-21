export async function postComment({ blogId, user, comment, token }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/api/blog/comments/${blogId}`, {
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
        const data = await res.json();
        if (data.Success) {
            return { data: data.updatedBlog, "Success": true };
        }
        else {
            return { data, "Success": false };
        }
    } catch (err) {
        console.log({ err: err.message || err.toString() });
        return err.message || err.toString();
    }
}

