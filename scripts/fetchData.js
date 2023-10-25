export async function fetchData(jsonDataUrl) {
    try {
        const response = await fetch(jsonDataUrl);
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData; // Return the JSON data
        } else {
            console.error('Failed to fetch JSON data');
            return null;
        }
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}
