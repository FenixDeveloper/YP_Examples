import * as XLSX from "xlsx";

export function importExcelFile(file) {
    console.log(`dropped: `, file);
    return new Promise((resolve, reject) => {
        function onReaderLoad(event) {
            try {
                const wb = XLSX.read(event.target.result);
                const ws = wb.Sheets[wb.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }

        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsArrayBuffer(file);
    });
}

export function exportExcelFile(data, fileName) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, fileName, {type: 'xlsx', compression: true});
}

export function exportJsonFile(content, fileName) {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(content, null, 2)], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

export function numToAlpha(number, result = ""){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let charIndex = number % alphabet.length
    let quotient = number / alphabet.length

    if(charIndex === 0){
        charIndex = alphabet.length
        quotient--;
    }
    result = alphabet.charAt(charIndex - 1) + result;
    return (quotient >= 1) ? numToAlpha(Math.floor(quotient), result) : result;
}

export function iterate2D(startRow, endRow, startColumn, endColumn) {
    const items = [];
    for (let r = startRow; r <= endRow; r++) {
        for (let c = startColumn; c <= endColumn; c++) {
            items.push(`${numToAlpha(c)}${r}`);
        }
    }
    return items;
}

export function iterate(from, to, alpha = false) {
    const items = [];
    for (let i = from; i <= to; i++) items.push(alpha ? numToAlpha(i) : i);
    return items;
}

export function getTableSize(width, height, cellWidth, cellHeight) {
    return {
        width,
        height,
        rows: Math.floor(height / cellHeight),
        columns: Math.floor(width / cellWidth)
    };
}