const API_URL = 'http://127.0.0.1:5000';

export const getInsights = async (data) => {
    const res = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
    }
    const json = await res.json();
    return json;
};