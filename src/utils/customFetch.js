import axios from "axios";

export default async function customFetch(
    url,
    method = "GET",
    data = {},
    customeHeaders = {},
    onDownloadProgress = null,
    cancelToken = null,
    errorCallback = null,
    onUploadProgress = null
) {
    const headers = {
        "content-type": "application/x-www-form-urlencoded",
        ...customeHeaders,
    };
    let response;
    let options = {
        method,
        url,
        data,
        headers,
    };
    if (onDownloadProgress) {
        options.onDownloadProgress = onDownloadProgress;
    }
    // if (onUploadProgress) {
    //   options.onUploadProgress = onUploadProgress;
    // }
    if (cancelToken) {
        options.cancelToken = cancelToken;
    }
    try {
        response = await axios(options);
    } catch (e) {
        // console.log(e);
        response = e.response;
        if (errorCallback && typeof errorCallback === "function") {
            errorCallback();
        }
    }
    return response;
}
