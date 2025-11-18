export function formatDate(date?: Date) {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}