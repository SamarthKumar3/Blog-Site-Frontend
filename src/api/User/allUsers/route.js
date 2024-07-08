export async function GET() {
    try {
        const response = await fetch('http://localhost:5000/api/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}