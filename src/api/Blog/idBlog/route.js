export async function GET(id) {
    try{
        const res = await fetch(`http://localhost:5000/api/blog/${id}`)
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

// export async function GET(id) {
//     try {
//         const res = await fetch(`http://localhost:5000/api/blog/${id}`);

//         if (!res.ok) {
//             throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const contentLength = res.headers.get('Content-Length');
//         if (contentLength && parseInt(contentLength, 10) === 0) {
//             // No content in the response, so return null or an appropriate value.
//             return null;
//         }

//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error("Error:", error);
//         return null;
//     }
// }
