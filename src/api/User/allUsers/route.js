export async function getAllUsers() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/api/user`,{
            next: { revalidate: 10 },
        });
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}