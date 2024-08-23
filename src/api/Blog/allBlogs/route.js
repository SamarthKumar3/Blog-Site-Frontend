export async function GET() {
    try{
        const res = await fetch('http://localhost:5000/api/blog/all-blogs', {
            next: { revalidate: 10 },
        })
        const data = await res.json();
    
        return data.blogs;
    }
    catch(err){
        console.log("Error", err);
    }
}

