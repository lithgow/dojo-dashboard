import {Base64} from "js-base64";
import {credentials} from "./settings";

export const refreshInterval = 10000;

export const forksUrl = "https://api.github.com/repos/xp-dojo-classes/tdd-bank-account-java/forks?per_page=1000";
export const actionsUrlFrom = (repoUrl) => { return `${repoUrl}/actions`; }
export const commitsUrlFrom = (repoUrl) => { return `${repoUrl}/commits`; }
export const workflowsUrlFrom = (repoUrl) => { return `${actionsUrlFrom(repoUrl)}/workflows`; }
export const workflowRunUrlFrom = (repoUrl, workflowId) => {
    return `${workflowsUrlFrom(repoUrl)}/${workflowId}/runs?per_page=1`;
}
export const artifactsUrlFrom = (repoUrl, buildId) => {
    return `${actionsUrlFrom(repoUrl)}/runs/${buildId}/artifacts`;
}

export class GitHubApiResponse {
    statusOk = false;
    isLoaded = false;
    json = [];
    error = null;
    headers = null;
}

export const getRaw = (url) => {
    const headers = new Headers();
    headers.set('Accept', 'application/vnd.github.v3+json');
    headers.set('Authorization', 'Basic ' + Base64.encode(credentials.username + ":" + credentials.password));
    return fetch(url, { method: 'GET', headers: headers });
}

export const get = (url) => new Promise((resolve) => {
    const apiResponse = new GitHubApiResponse();
    getRaw(url).then(response => {
        apiResponse.statusOk = response.ok;
        apiResponse.headers = response.headers;
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
