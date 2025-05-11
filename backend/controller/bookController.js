

import extractTextFromPages from "../services/pdfReader.js";
import generateAIResponse from "../services/geminiPrompting.js";
import contentPageNumbers from "../constants/contentPageNumbers.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const parseTOC = (tocText) => {
    const lines = tocText.split('\n');
    const toc = [];
    const tocRegex = /^(?:\d+\.\s*)?(.+?)\s+(\d{1,3})$/;

    for (const line of lines) {
        const match = line.match(tocRegex);
        if (match) {
            toc.push({ title: match[1].trim(), page: parseInt(match[2], 10) });
        }
    }

    return toc;
};


const getBookSummary = async (req, res) => {
    const { contentId } = req.params;
    const data = contentPageNumbers[contentId];

    if (!data) {
        return res.status(400).json({ success: false, message: "Invalid content ID" });
    }

    const [startPage, endPage, bookUrl] = data;
    const pdfPath = path.join(__dirname, '..', 'public', 'pdfs', bookUrl);

    try {
       
        const fullText = await extractTextFromPages(pdfPath, startPage, endPage);
        const summaryPrompt = `Summarize the following content in 300 words:\n${fullText}`;
        const summary = await generateAIResponse(summaryPrompt);

      
        const tocText = await extractTextFromPages(pdfPath, 1, 3);
        const tocArray = parseTOC(tocText);

        const sections = [];

        for (let i = 0; i < tocArray.length; i++) {
            const start = tocArray[i].page;
            const end = i < tocArray.length - 1 ? tocArray[i + 1].page - 1 : start + 2;

           
            const sectionText = await extractTextFromPages(pdfPath, start, end);
            const sectionPrompt = `Summarize this section in 150 words:\n${sectionText}`;
            const sectionSummary = await generateAIResponse(sectionPrompt);

            sections.push({
                title: tocArray[i].title,
                startPage: start,
                endPage: end,
                summary: sectionSummary,
            });
        }

        res.json({
            success: true,
            toc: tocArray,
            summary,
            sections,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAvailableBooks = (req, res) => {
    const books = Object.keys(contentPageNumbers).map(key => {
        const [startPage, endPage, bookUrl] = contentPageNumbers[key]; 
        return {
            id: key,
            title: key.toUpperCase(),
            pdfUrl: bookUrl || null, 
        };
    });

    res.json({ success: true, books });
};


export { getBookSummary, getAvailableBooks };
