import React from 'react';

function MatchesLoading(Component) {
    return function MatchesLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <p style={{ fontSize: '25px', textAlign: 'center' }}>
                We are waiting for the data to load! ...
            </p>
        );
    };
}

export default MatchesLoading;
