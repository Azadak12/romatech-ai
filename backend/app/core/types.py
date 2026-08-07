import uuid

from sqlalchemy.types import CHAR, TypeDecorator


class GUID(TypeDecorator):
    """Portable UUID column stored as a 32-char hex string (no dashes).

    MySQL has no native UUID type, so UUIDs are stored as CHAR(32) and
    converted to/from Python uuid.UUID objects at the boundary.
    """

    impl = CHAR(32)
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        if not isinstance(value, uuid.UUID):
            value = uuid.UUID(str(value))
        return value.hex

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        return uuid.UUID(value)
