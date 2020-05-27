import React, { Component, } from "react";
import GoogleAnalytics from "react-ga";

GoogleAnalytics.initialize("UA-167777796-1");

const withTracker = (WrappedComponent, options = {}) => {
    const trackPage = page => {
        GoogleAnalytics.set({
            page,
            ...options,
        });
        GoogleAnalytics.pageview(page);
    };

    React.useEffect(() => {
        trackPage(props.location.pathname + props.location.search);
    }, [props.location.pathname, props.location.search]);

    return <WrappedComponent {...this.props} />;
};

export default withTracker;