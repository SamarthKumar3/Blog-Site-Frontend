export async function POST3(sendData, token) {
    try {
        const trimmedToken = token.trim();
        const res = await fetch('http://localhost:5000/api/blog/create/new', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${trimmedToken}`,
            },
            body: sendData 
        });

        const data = await res.json();
        if (res.status === 201) {
            return data;
        } else {
            throw new Error(data.message || 'Unknown error occurred');
        }
    } catch (err) {
        console.log({ err: err.message || err.toString() });
        return;
    }
}
