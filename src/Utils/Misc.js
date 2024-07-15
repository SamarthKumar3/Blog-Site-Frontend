export function capitalize(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

export function formatDate(dateString) {
    const date = new Date(dateString);

    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={index} className="font-bold">{part}</span>
                ) : (
                    part
                )
            )}
        </>
    );
};