import React from 'react';

interface SectionHeaderProps {
    title: string;
    description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
    return (
        <div>
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900">{title}</h2>
            {description && <p className="mt-1 text-md text-gray-500">{description}</p>}
        </div>
    );
};

export default SectionHeader;