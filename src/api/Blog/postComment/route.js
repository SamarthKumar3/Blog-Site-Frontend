export async function postComment({id, author, content}) {

    try {
        const res = await fetch(`http://localhost:5000/api/blog/comment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author,
                content,
            }),
        });
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            throw new Error(data);
        }
    } catch (err) {
        console.log({err});
        return;
    }
}

