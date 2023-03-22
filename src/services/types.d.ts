declare namespace CmdType {
    interface changeThemeParam {
        theme: string,
    }

    interface decompressionParam {
        filePath: string,
    }

    interface compressionParam {
        filesPath: string[],
    }

    interface openParam {
        path: string,
    }

    interface fileInfoParam {
        filePath: string,
    }

    interface filesInfoParam {
        filesPath: string[],
    }
}

declare namespace CmdResponseType {
    interface fileInfo {
        fileName: string,
        fileType: string,
        fileSize: number,
    }
}
