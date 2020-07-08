import {Base64} from "js-base64";
import {credentials} from "./credentials";

export class GitHubApiResponse {
    statusOk = false;
    isLoaded = false;
    json = [];
    error = null;
}

export const getAuthenticated = (url) => {
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + Base64.encode(credentials.username + ":" + credentials.password));
    return fetch(url, { method: 'GET', headers: headers });
}

export const get = (url) => new Promise((resolve) => {
    let apiResponse = new GitHubApiResponse();
    getAuthenticated(url).then(response => {
        apiResponse.statusOk = response.ok;
        response.json().then(
            (result) => {
                apiResponse.isLoaded = true;
                apiResponse.json = result;
                resolve(apiResponse);
            },
            (error) => {
                apiResponse.isLoaded = true;
                apiResponse.error = error;
                resolve(apiResponse);
            }
        )}).catch(error => {
            apiResponse.error = error;
            resolve(apiResponse);
        });
    }
);
