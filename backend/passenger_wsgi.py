import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

from a2wsgi import ASGIMiddleware  # noqa: E402
from app.main import app as fastapi_app  # noqa: E402

# Hostinger's hPanel "Setup Python App" runs on Phusion Passenger, which
# speaks WSGI, not ASGI — a2wsgi bridges our FastAPI app across.
application = ASGIMiddleware(fastapi_app)
