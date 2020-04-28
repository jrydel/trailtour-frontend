import React from 'react';

export const useFetch = (url, initData, errorCallback) => {

    const [value, setValue] = React.useState({
        data: initData,
        loading: false
    });
    const [trigger, setTrigger] = React.useState(false);
    const triggerFetch = () => setTrigger(!trigger);

    const setPartData = partData => setValue({ ...value, ...partData });

    const get = () => {
        setPartData({ loading: true });
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error();
                } else {
                    return response.json();
                }
            })
            .then(data => setPartData({ data: data, loading: false }))
            .catch(error => { console.log(error); errorCallback("Nepodařilo se načíst data.") });
    }

    React.useEffect(get, [trigger]);

    return [value, triggerFetch];
}

export const postApiRequest = async (url, data, errorCallback, successCallback) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw Error();
        } else {
            successCallback();
        }
    } catch (err) {
        errorCallback("Nepodařilo se zpracovat data.");
    }
}