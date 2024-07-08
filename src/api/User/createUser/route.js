// export async function POST(props) {
//     try {
//         const response = await fetch('http://localhost:5000/api/user/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: props.name,
//                 email: props.email,
//                 password: props.password
//             })
//         });
//         const data = await response.json();
//         if (response.status === 201) {
//             return data;
//         } else {
//             throw new Error(data);
//         }
//     }
//     catch (err) {
//         console.log({err});
//         return;
//     }
// }

export async function POST(props) {
    try {
        const response = await fetch('http://localhost:5000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: props.name,
                email: props.email,
                password: props.password
            })
        });
        const data = await response.json();
        if (response.status === 201) {
            return {success:true, data: data};
        } else {
            if (data.error && data.error.err) {
                throw new Error(data.error.err.message);
            } else {
                throw new Error('An error occurred');
            }
        }
    }
    catch (err) {
        console.log(err);
        return { success: false, error: err.message };
    }
}
