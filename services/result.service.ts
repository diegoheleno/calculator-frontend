import { message } from "antd"
import { defaultResult, Result } from "../entity/result.entity"
import { CreateResultBody, FetchResultResponse, UpdateResultBody } from "../dtos/result.dto"

const baseUrl = 'http://localhost:5555/calculator/result'

export async function fetchResultByStage(stageId: number): Promise<Result> {
    try {
        const res = await fetch(`${baseUrl}?stageId=${stageId}`)
        const response: FetchResultResponse = await res.json()

        if (response.status == 200) {
            return response.data
        } else {
            message.error(response.message);
            return response.data;
        }
    }
    catch {
        return defaultResult;
    }
}

export async function createResult(result: CreateResultBody): Promise<Result> {
    const request = {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const promise = await fetch(baseUrl, request);
    const response: FetchResultResponse = await promise.json()

    if (response.status == 201) {
        return response.data
    } else {
        message.error(response.message);
        return defaultResult;
    }
}

export async function updateResult(result: UpdateResultBody): Promise<Result> {
    const request = {
        method: 'PUT',
        body: JSON.stringify(result),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const promise = await fetch(baseUrl, request)
    const response: FetchResultResponse = await promise.json()

    if (response.status == 201) {
        return response.data
    } else {
        message.error(response.message);
        return defaultResult;
    }
}

const service = {
    createResult,
    updateResult,
    fetchResultByStage
}

export default service