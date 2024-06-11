import {checkIsEmptyObject} from "./check";
import XLSX, {WorkBook} from "xlsx";

export const transformRawDataToExcelBuffer = async (rawData: Array<{ [key: string]: any }>): Promise<Buffer> => {
    if (checkIsEmptyObject(rawData)) {
        return Buffer.from('');
    }
    // Extract headers from the first object
    const headers = Object.keys(rawData[0]);

    // Map the rawData to an array of arrays (rows)
    const rows = rawData.map(item => headers.map(header => item[header]));

    // Combine headers and rows
    const data = [headers, ...rows];

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook: WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write the workbook to a buffer
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
}

export const transformRawDataToCSVBuffer = async (rawData: Array<{ [key: string]: any }>) => {
    if (rawData.length === 0) return Buffer.from('');

    // Extract headers from the first object
    const headers = Object.keys(rawData[0]);

    // Create CSV header row
    const headerRow = headers.join(',') + '\n';

    // Create CSV rows
    const dataRows = rawData.map(item => headers.map(header => item[header]).join(',')).join('\n');

    // Combine header and rows into a single CSV string
    const csvString = headerRow + dataRows;

    // Convert CSV string to Buffer
    return Buffer.from(csvString);
}
