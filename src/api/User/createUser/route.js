export async function POST(sendData) {
    try {
        const response = await fetch('http://localhost:5000/api/user/signup', {
            method: 'POST',
            body: sendData
        });
        const data = await response.json();
        if (response.status === 201) {
            return data;
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
