export const getAttendeesForDate = async (date: string) => {
    const response = await fetch(`/api/checkin?date=${date}`);
    if (response.ok) {
        return response.json().then(data => data);
    }
    return [];
}