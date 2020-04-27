import React from 'react';

export const useFetch = (url, options, initData) => {

    const [value, setValue] = React.useState({
        data: initData,
        loading: false,
        error: ""
    });

    const [trigger, setTrigger] = React.useState(false);
    const triggerFetch = () => setTrigger(!trigger);

    const setPartial = (part) => setValue({ ...value, ...part });

    React.useEffect(() => {
        setPartial({ loading: true });
        fetch(url, options)
            .then(res => res.json())
            .then(json => setPartial({ data: json, loading: false }))
            .catch(err => setPartial({ error: "Unable to load API data: " + err, loading: false }))
    }, [trigger]);

    return [value, triggerFetch];
}