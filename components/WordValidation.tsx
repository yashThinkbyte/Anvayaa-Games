import React from "react";

interface WordValidationProps {
    message: string;
}

const WordValidation: React.FC<WordValidationProps> = ({ message }) => {
    return message ? (
        <div className="mt-4 font-semibold text-lg">{message}</div>
    ) : null;
};

export default WordValidation;
