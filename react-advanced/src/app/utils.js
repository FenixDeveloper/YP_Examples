

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