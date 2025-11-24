export const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};