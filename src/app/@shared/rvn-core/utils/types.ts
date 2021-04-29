export type CreateOrEdit = "create" | "edit";

export interface IApiResponseWrapper {
    status: "success" | "failure";
    statusCode: number,
    data: any;
    message: string;
}