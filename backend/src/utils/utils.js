/**
 * It extracts the total number of pages in a link.
 * The links are usally in this format "<"
 * @param {*} link
 */
function extractNumberOfPagesFromLink(link) {
    const linkArray = link.split(',');
    const lastLink = linkArray.find(la => la.includes('rel="last"'));
    if (lastLink) {
        const pageMatches = lastLink.match(/&page=[0-9]+/g);
        if (pageMatches.length === 1 && pageMatches[0].includes('=')) {
            return pageMatches[0].split('=')[1];
        }
    }
    return 0;
}

export default {
    extractNumberOfPagesFromLink
}