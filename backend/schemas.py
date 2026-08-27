"""
Shared Pydantic schemas for LandGuard AI.
"""

from pydantic import BaseModel, Field, ConfigDict


class MessageResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    detail: str


class PaginationRequest(BaseModel):
    page: int = Field(
        default=1,
        ge=1,
    )

    page_size: int = Field(
        default=20,
        ge=1,
        le=100,
    )


class PaginationResponse(BaseModel):
    page: int
    page_size: int
    total: int
    total_pages: int


class UserResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    user_id: str
    username: str
    full_name: str
    role: str
    state: str | None = None
    district: str | None = None
    status: str
    created_at: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class HealthResponse(BaseModel):
    status: str