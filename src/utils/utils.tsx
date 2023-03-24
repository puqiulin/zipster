export function covertFileSizeToHuman(bytes: number) {
    if (bytes === 0) return '0 Bytes';

    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + units[i];
}

export function getParentDirectory(filePath: string) {
    const pathSeparatorRegex = /\/|\\/;
    const pathParts = filePath.split(pathSeparatorRegex);
    pathParts.pop();
    return pathParts.join('/');
}