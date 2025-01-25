import React, { useState } from 'react';

interface SearchPwdControlPropsInterface {
    onSearch: (query: string) => void;
}

export default function SearchPwdControl({ onSearch }: SearchPwdControlPropsInterface) {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search password entry..."
                className='w-full p-2 text-lg border border-solid border-white border-collapse border-spacing-1 text-black'
            />
        </div>
    );
}