declare namespace CmdType {
    interface changeThemeParam {
        theme: string,
    }

    interface decompressionParam {
        filePath: string,
    }

    interface compressionParam {
        filesPath: string[],
        savePath: string
    }

    interface openParam {
        path: string,
    }

    interface fileInfoParam {
        filePath: string,
    }

    interface dirPathParam {
        dirPath: string,
    }

    interface filesInfoParam {
        filesPath: string[],
    }
}

declare namespace CmdResponseType {
    interface fileInfo {
        name: string,
        extension: string,
        size: number,
        path: string,
        isDir: boolean,
    }

}
