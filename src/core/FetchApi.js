import React from 'react';

export const useFetch = (url, initData, errorCallback) => {

    const [value, setValue] = React.useState({
        loading: false,
        data: initData
    });

    const [apiTrigger, setApiTrigger] = React.useState(false);
    const trigger = () => setApiTrigger(!apiTrigger);

    React.useEffect(() => {
        setValue({ loading: true, data: initData })
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Fetch returned: " + res.status);
                }
            })
            .then(json => setValue({ loading: false, data: json }));
    }, [apiTrigger]);

    return [value, trigger]
}

export const postApiRequest = async (url, data, successCallback, errorCallback) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw Error();
        }
        successCallback();
    } catch (error) {
        errorCallback(error);
    }
}