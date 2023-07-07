export const getError = (error: unknown): Error =>  {
    if (error instanceof Error) return error;
    return error as Error;
}
