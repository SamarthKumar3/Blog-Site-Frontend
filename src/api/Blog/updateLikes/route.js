export async function updateLikes (blogId) {
    try{
        const res = await fetch(`http://localhost:5000/api/blog/likes/${blogId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            throw new Error(data);
        }
    }
    catch(err){
        console.log("Error", {err});
        return;
    }
}