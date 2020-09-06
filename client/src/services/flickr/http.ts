export interface HttpResponse<T> extends Response {
    jsonBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(request);

    try {
        response.jsonBody = await response.json();
    } catch (error) {
        throw new Error('JSON parse error');
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}
