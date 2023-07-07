export const getIdFromUrl = (url: string | undefined): string | undefined => {
    return url!.split('/').pop();
}
