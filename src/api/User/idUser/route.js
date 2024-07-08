export async function GET(id) {
    const url = `http://localhost:5000/api/user/${id}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (res.status === 200) {
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}