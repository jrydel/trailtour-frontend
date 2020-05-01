import React from 'react';

export const useFetch = (url, initData, errorCallback) => {

    const [value, setValue] = React.useState({
        loading: false,
        data: initData,
        error: ""
    });

    const [apiTrigger, setApiTrigger] = React.useState(false);
    const trigger = () => setApiTrigger(!apiTrigger);

    const setPartData = partData => setValue({ ...value, ...partData });

    React.useEffect(() => {
        setPartData({ loading: true })
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
            .then(json => setPartData({ loading: false, data: json, error: "" }))
            .catch(error => {
                setPartData({ loading: false, error: error })
                errorCallback(error);
            });
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
            const json = await response.json();
            console.log(json);
            throw Error();
        }
        successCallback();
    } catch (error) {
        errorCallback(error);
    }
}