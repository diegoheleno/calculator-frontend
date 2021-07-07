import { message } from "antd"
import { defaultAction, Action } from "../entity/action.entity"
import { CreateActionBody, FetchActionListResponse, FetchActionResponse } from "../dtos/action.dto"

const baseUrl = 'http://localhost:5555/calculator/action'

export async function fetchActionByStage(resultId: string): Promise<Action[]> {
    try {
        const res = await fetch(`${baseUrl}?resultId=${resultId}`)
        const response: FetchActionListResponse = await res.json()

        if (response.status == 200) {
            return response.data
        } else {
            message.error(response.message);
            return response.data;
        }
    }
    catch {
        return [];
    }
}

export async function createAction(action: CreateActionBody[]): Promise<Action> {
    const request = {
        method: 'POST',
        body: JSON.stringify(action),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const promise = await fetch(baseUrl, request);
    const response: FetchActionResponse = await promise.json()

    if (response.status == 201) {
        return response.data
    } else {
        message.error(response.message);
        return defaultAction;
    }
}

const service = {
    createAction,
    fetchActionByStage
}

export default service