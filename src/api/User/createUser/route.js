export async function POST(sendData) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/api/user/signup`, {
            method: 'POST',
            body: sendData,
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();

        if (response.ok) {  
            return { success: true, data };  
        } else {
            const errorMessage = data.error?.err?.message || 'An error occurred';
            throw new Error(errorMessage);
        }
    } catch (err) {
        console.log(err);
        return { success: false, error: err.message };  
    }
}
