export async function getAllUsers() {
    try {
        const response = await fetch('http://localhost:5000/api/user',{
            next: { revalidate: 10 },
        });
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}