import { message } from "antd"
import { defaultStage, Stage } from "../entity/stage.entity"
import { CreateStageBody, FetchStageResponse, UpdateStageBody } from "../dtos/stage.dto"

const baseUrl = 'http://localhost:5555/calculator/stage'

export async function fetchStageByLevel(level: number): Promise<Stage> {
    try {
        const res = await fetch(`${baseUrl}?level=${level}`)
        const response: FetchStageResponse = await res.json()

        if (response.status == 200) {
            return response.data
        } else {
            message.error(response.message);
            return response.data ?? defaultStage;
        }
    }
    catch {
        return { ...defaultStage, level, state: 0 };
    }
}

export async function createStage(stage: CreateStageBody): Promise<Stage> {
    const request = {
        method: 'POST',
        body: JSON.stringify(stage),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const promise = await fetch(baseUrl, request);
    const response: FetchStageResponse = await promise.json()

    if (response.status == 201) {
        return response.data
    } else {
        message.error(response.message);
        return defaultStage;
    }
}

export async function updateStage(stage: UpdateStageBody): Promise<Stage> {
    const request = {
        method: 'PUT',
        body: JSON.stringify(stage),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const promise = await fetch(baseUrl, request)
    const response: FetchStageResponse = await promise.json()

    if (response.status == 201) {
        return response.data
    } else {
        message.error(response.message);
        return defaultStage;
    }
}

const service = {
    createStage,
    updateStage,
    fetchStageByLevel,
}

export default service