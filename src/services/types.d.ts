interface ApiResponse<T> {
    data?: T;
    error?: { code: string; message: string };
    success: boolean;
}