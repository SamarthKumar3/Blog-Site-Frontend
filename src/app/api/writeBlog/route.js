export async function POST(props) {
    try {
        const res = await fetch('http://localhost:5000/api/blog/create/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: props.title,
                content: props.content,
                creator: props.author
            })
        });
        const data = await res.json();
        if (res.status === 201) {
            return data;
        } else {
            throw new Error(data);
        }
    }
    catch (err) {
        alert(err);
        return;
    }
}