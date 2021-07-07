import { message } from "antd"
import {  defaultOperation, Operation } from "../entity/operation.entity"
import { CreateOperationBody, FetchOperationListResponse, FetchOperationResponse, UpdateOperationBody } from "../dtos/operation.dto"

const baseUrl = 'http://localhost:5555/calculator/operation'

export async function fetchOperationByStage(stageId: string): Promise<Operation[]> {
    try {
        const res = await fetch(`${baseUrl}?stageId=${stageId}`)
        const response: FetchOperationListResponse = await res.json()

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

export async function createOperation(operation: CreateOperationBody): Promise<Operation> {
    const request = {
        method: 'POST',
        body: JSON.stringify(operation),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const promise = await fetch(baseUrl, request);
    const response: FetchOperationResponse = await promise.json()

    if (response.status == 201) {
        return response.data
    } else {
        message.error(response.message);
        return defaultOperation;
    }
}

export async function updateOperation(operation: UpdateOperationBody): Promise<Operation> {
    const request = {
        method: 'PUT',
        body: JSON.stringify(operation),
        headers: {
            'Content-Type': 'application/json'
        },
    }

    const promise = await fetch(baseUrl, request)
    const response: FetchOperationResponse = await promise.json()

    if (response.status == 201) {
        return response.data
    } else {
        message.error(response.message);
        return defaultOperation;
    }
}

const service = {
    createOperation,
    updateOperation,
    fetchOperationByStage
}

export default service