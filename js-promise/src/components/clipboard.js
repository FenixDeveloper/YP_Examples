
export function initClipboard({editor,copy,paste}) {
    const textEditor = document.getElementById(editor);
    const copyBtn = document.getElementById(copy);
    const pasteBtn = document.getElementById(paste);

    pasteBtn.addEventListener('click', () => {
        navigator.clipboard
            .readText()
            .then((clipText) => (textEditor.value = clipText));
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard
            .writeText(textEditor.value)
            .then(() => alert(`clipboard set to ${textEditor.value}`))
            .catch(() => alert('Can not set clipboard!'))
            .finally(() => textEditor.value = "");
    });
}