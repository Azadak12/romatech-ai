from fastapi import HTTPException, status


def http_error(status_code: int, message: str, code: str = 'error') -> HTTPException:
    return HTTPException(status_code=status_code, detail={'error': {'code': code, 'message': message}})


def unauthorized(message: str = 'Not authenticated') -> HTTPException:
    return http_error(status.HTTP_401_UNAUTHORIZED, message, 'unauthorized')


def forbidden(message: str = 'Not permitted') -> HTTPException:
    return http_error(status.HTTP_403_FORBIDDEN, message, 'forbidden')


def not_found(message: str = 'Not found') -> HTTPException:
    return http_error(status.HTTP_404_NOT_FOUND, message, 'not_found')


def conflict(message: str) -> HTTPException:
    return http_error(status.HTTP_409_CONFLICT, message, 'conflict')


def bad_request(message: str) -> HTTPException:
    return http_error(status.HTTP_400_BAD_REQUEST, message, 'bad_request')
