import React from 'react';

export const useFetch = (url, initData, trigger, errorCallback) => {

    const [value, setValue] = React.useState({
        loading: false,
        data: initData
    });

    const setPartData = partData => setValue({ ...value, ...partData });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setPartData({ loading: true })
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    throw new Error("Fetch returned: " + response.status);
                }
                const json = await response.json();
                setPartData({ loading: false, data: json });
            } catch (error) {
                setPartData({ loading: false })
                errorCallback(error);
            }
        }
        fetchData();
    }, trigger); // eslint-disable-line react-hooks/exhaustive-deps

    return value;
}

export const postApiRequest = async (url, data, successCallback, errorCallback) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const json = await response.json();
            console.log(json);
            throw Error();
        }
        successCallback();
    } catch (error) {
        errorCallback(error);
    }
}