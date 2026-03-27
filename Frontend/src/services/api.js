const API_URL = import.meta.env.VITE_API_URL;

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