export async function DeleteComment({commentId, blogId, token}) {

    try {
        const res = await fetch(`http://localhost:5000/api/blog/comment/${commentId}/delete/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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
