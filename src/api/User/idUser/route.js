export async function GET(id) {
    const url = `${process.env.NEXT_PUBLIC_backend_url}/api/user/${id}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}