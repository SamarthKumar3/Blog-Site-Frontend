// export async function POST(sendData) {
//     try {
//         const response = await fetch('http://localhost:5000/api/user/signup', {
//             method: 'POST',
//             body: sendData
//         });
//         const data = await response.json();
//         if (response.status === 201) {
//             return data;
//         } else {
//             if (data.error && data.error.err) {
//                 throw new Error(data.error.err.message);
//             } else {
//                 throw new Error('An error occurred');
//             }
//         }
//     }
//     catch (err) {
//         console.log(err);
//         return { success: false, error: err.message };
//     }
// }

export async function POST(sendData) {
    try {
        const response = await fetch('http://localhost:5000/api/user/signup', {
            method: 'POST',
            body: sendData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {  // Check if the response status is 200–299
            return { success: true, data };  // Wrap the data in a success object
        } else {
            // Check if the API returned a specific error message
            const errorMessage = data.error?.err?.message || 'An error occurred';
            throw new Error(errorMessage);
        }
    } catch (err) {
        console.log(err);
        return { success: false, error: err.message };  // Return a consistent error object
    }
}
