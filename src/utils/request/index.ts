import Fetch from "../../fetch";

export default async (url: string, method: string, data: Record<string, any> = {}): Promise<any> => {

    const fetch = new Fetch(url).setMethod(method);

    if (method.toLowerCase() == "get") {
        fetch.setParam(data);
    } else {
        fetch.setBody(data);
    }

    return fetch.send().then((response: Response) => {
        return response;
    }).catch((error: Error) => {
       throw error;
    })
}