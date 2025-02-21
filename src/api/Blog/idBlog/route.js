export async function GET(id) {
    try{
        const res = await fetch(`${process.env.backend_url}/api/blog/${id}`)
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            throw new Error(data);
        }
    }
    catch(err){
        console.log("Error", err);
        return;
    }
}