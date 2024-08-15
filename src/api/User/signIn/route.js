export async function POST2(user) {
    try {
        const response = await fetch('http://localhost:5000/api/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            }),
        });
        const data = await response.json();

        if (response.status === 201) {
            return data;
        } else {
            if (data.error) {
                const errorMessage = data.error && data.error.message ? data.error.message : 'An unspecified error occurred';
                throw new Error(errorMessage);
            } else {
                throw new Error('An error occurred');
            }
        }
    } catch (error) {
        // console.log(error);
        return { success: false, error: error.message};
    }
}