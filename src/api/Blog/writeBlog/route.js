export async function POST3(sendData, token) {
    try {
        const res = await fetch('http://localhost:5000/api/blog/create/new', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: sendData
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 201) {
            return data;
        }
        else {
            throw new Error(data.error || 'Unknown error occurred');
        }
    }
    catch (err) {
        console.log({ err: err.message || err.toString() });
        return;
    }
}