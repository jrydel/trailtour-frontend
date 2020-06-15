export const defaultGetOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
}

export const fetcher = (...args) => fetch(...args).then(res => {
    if (!res.ok) {
        throw new Error();
    }
    return res.json();
});