import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 h-16 w-16"></div>
            <div className="rounded-lg bg-gradient-to-r from-green-400 to-blue-500 h-48 w-48"></div>
        </div>
    );
};

export default Loading;

