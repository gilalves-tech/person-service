export interface RequestHandler<TRequest, TResponse> {
	handle(request: TRequest): Promise<TResponse>;
}