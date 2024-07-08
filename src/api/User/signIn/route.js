export async function POST2(props) {
    const url = `http://localhost:5000/api/user/signin`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: props.email,
                password: props.password
            })
        });
        const data = await response.json();
        if (response.status === 201) {
            return {success:true, data: data};
        } else {
            throw data.error.err;
        }
    } catch (error) {
        return { success: false, error };;
    }
}