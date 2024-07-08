// export async function DELETE(id) {
//     try {
//         const res = await fetch(`http://localhost:5000/api/blog/delete/${id}`, {
//             method: 'DELETE',
//             // headers: { "Content-Type": "application/json" },
//         });

//         const data = await res.json();
//         if (res.status === 201) {
//             return data;
//         } else {
//             throw new Error(data);
//         }
//     } catch (err) {
//         alert("Error-", err);
//         console.log(err);
//     };


// }

export async function DELETE(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/blog/delete/${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error:", error.message); // Log the error message
        throw error; // Re-throw the error so it can be handled in the component
    }
}
