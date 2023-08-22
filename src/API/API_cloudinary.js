const API_cloudinary = () => {
    const CLOUDNAME = 'dzkdgm4c7';
    return {
        API_KEY : '954784476125919',
        folderName: 'WorkShop 1',
        presetName: 'Workshop1',
        API_upload: `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`
    }
}
export default API_cloudinary