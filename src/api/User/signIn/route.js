export async function POST2(user) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_backend_url}/api/user/signin`, {
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
            return {data, success: true};
        } else {
            if (data.error) {
                const errorMessage = data.error && data.error.message ? data.error.message : 'An unspecified error occurred';
                throw new Error(errorMessage);
            } else {
                throw new Error('An error occurred');
            }
        }
    } catch (error) {
        return { success: false, error: error.message};
    }
}