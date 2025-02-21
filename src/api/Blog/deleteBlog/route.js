export async function DELETE(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/api/blog/delete/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error:", error.message);
        throw error; 
    }
}
