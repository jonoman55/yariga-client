/**
 * Check & Validate Image URL
 * @param url Image URL
 * @returns Valid Image
 */
export const checkImage = (url: any): boolean => {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
};
