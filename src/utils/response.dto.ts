export interface ResponseDto<T> {
    status: number;
    data: T;
    message: string;
}