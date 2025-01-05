export const getAvailableDateTimes = async (startDate: string, endDate: string): Promise<string[]> => {
    const apiUrl = `https://5b94bbb0-4b84-4173-8753-c9b46c84fc76.mock.pstmn.io/appointment_availabilities/available_times?start_date_time=${startDate}&end_date_time=${endDate}`;

    const getMockResponseName = (startDateStr: string): string => {
        const date = new Date(startDateStr);
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        if (month === 12 && year === 2024) {
            return 'Dec2024';
        } else if (month === 1 && year === 2025) {
            return 'Jan2025';
        } else if (month === 2 && year === 2025) {
            return 'Feb2025';
        } else {
            return 'Default';
        }
    };

    const mockResponseName = getMockResponseName(startDate);

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'x-mock-response-name': mockResponseName,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.data.available_times;
    } catch (error) {
        console.error('Error', error);
        return [];
    }
};
