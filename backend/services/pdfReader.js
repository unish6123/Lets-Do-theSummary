// This module reads text from a PDF file using pdfjs-dist library.
// the actual this pdfjs-dist library uses modules and found in mjs files.

//so I couldn't use it by using require, I had to use import statement to import the module.

const extractTextFromPages = async (pdfPath, startPage, endPage) => {
    const pdfjs = await import('pdfjs-dist/build/pdf.mjs'); // Dynamic import
    const pdf = await pdfjs.getDocument(pdfPath).promise;
    let text = '';

    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        text += `Page ${pageNum}:\n${pageText}\n\n`;
    }

    return text;
};

export default extractTextFromPages

