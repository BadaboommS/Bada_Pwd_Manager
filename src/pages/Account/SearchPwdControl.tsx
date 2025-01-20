import React, { useState } from 'react';

interface SearchPwdControlProps {
    onSearch: (query: string) => void;
}

export default function SearchPwdControl({ onSearch }: SearchPwdControlProps) {
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
            />
        </div>
    );
}