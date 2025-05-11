import extractTextFromPages from "../services/pdfReader.js";
import generateAIResponse from "../services/geminiPrompting.js";
import contentPageNumbers from "../constants/contentPageNumbers.js";

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

const getSectionsWithContent = async (bookUrl, tocArray) => {
    const sections = [];

    for (let i = 0; i < tocArray.length; i++) {
        const startPage = tocArray[i].page;
        const endPage = (i < tocArray.length - 1) ? tocArray[i + 1].page - 1 : startPage + 2;

        const content = await extractTextFromPages(bookUrl, startPage, endPage);
        sections.push({
            title: tocArray[i].title,
            startPage,
            endPage,
            content,
        });
    }

    return sections;
};

const getAiResponse = async (req, res) => {
    const { contentId } = req.body;
    if (!contentId || !contentPageNumbers[contentId]) {
        return res.json({ success: false, message: "Content ID is missing or invalid" });
    }

    const startPage = contentPageNumbers[contentId][0];
    const endPage = contentPageNumbers[contentId][1];
    const bookUrl = contentPageNumbers[contentId][2];

    try {
        // Step 1: Full text for AI summary
        const fullText = await extractTextFromPages(bookUrl, startPage, endPage);
        const prompt = "summarize all the pages in 300 words\n" + fullText;
        const aiSummary = await generateAIResponse(prompt);

        // Step 2: TOC and section-wise content
        const tocText = await extractTextFromPages(bookUrl, 1, 3);
        const tocArray = parseTOC(tocText);
        const sections = await getSectionsWithContent(bookUrl, tocArray);

        return res.json({
            success: true,
            summary: aiSummary,
            toc: tocArray,
            sections,
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default getAiResponse;
