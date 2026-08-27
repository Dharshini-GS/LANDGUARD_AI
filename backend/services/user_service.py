from datetime import datetime, timezone

from sqlalchemy.orm import Session

from ..models.user import User
from ..services.auth_service import hash_password


def user_to_dict(user: User) -> dict:
    return {
        "user_id": user.user_id,
        "username": user.username,
        "full_name": user.full_name,
        "role": user.role,
        "state": user.state,
        "district": user.district,
        "status": user.status,
        "created_at": user.created_at,
    }


def apply_user_scope(query, current_user: User):
    """
    Apply state/district access restrictions.

    ADMIN users can access all users.
    Other users are restricted to their assigned
    state and district when those values are not ALL.
    """

    if str(current_user.role).upper() == "ADMIN":
        return query

    state = getattr(current_user, "state", None)
    district = getattr(current_user, "district", None)

    if state and str(state).upper() != "ALL":
        query = query.filter(User.state == state)

    if district and str(district).upper() != "ALL":
        query = query.filter(User.district == district)

    return query


def get_users(
    db: Session,
    current_user: User,
    page: int = 1,
    page_size: int = 20,
    role: str | None = None,
    state: str | None = None,
    district: str | None = None,
    user_status: str | None = None,
):
    query = db.query(User)

    query = apply_user_scope(
        query,
        current_user,
    )

    if role:
        query = query.filter(
            User.role == role
        )

    if state:
        query = query.filter(
            User.state == state
        )

    if district:
        query = query.filter(
            User.district == district
        )

    if user_status:
        query = query.filter(
            User.status == user_status
        )

    total = query.count()

    offset = (page - 1) * page_size

    users = (
        query
        .order_by(User.user_id)
        .offset(offset)
        .limit(page_size)
        .all()
    )

    total_pages = (
        (total + page_size - 1) // page_size
        if total > 0
        else 0
    )

    return {
        "items": [
            user_to_dict(user)
            for user in users
        ],
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
    }


def get_user(
    db: Session,
    current_user: User,
    user_id: str,
):
    query = (
        db.query(User)
        .filter(
            User.user_id == user_id
        )
    )

    query = apply_user_scope(
        query,
        current_user,
    )

    user = query.first()

    if not user:
        return None

    return user_to_dict(user)


def get_user_object(
    db: Session,
    current_user: User,
    user_id: str,
):
    query = (
        db.query(User)
        .filter(
            User.user_id == user_id
        )
    )

    query = apply_user_scope(
        query,
        current_user,
    )

    return query.first()


def create_user(
    db: Session,
    current_user: User,
    data: dict,
):
    if str(current_user.role).upper() != "ADMIN":
        return None

    existing_username = (
        db.query(User)
        .filter(
            User.username == data["username"]
        )
        .first()
    )

    if existing_username:
        raise ValueError(
            "Username already exists"
        )

    existing_id = (
        db.query(User)
        .filter(
            User.user_id == data["user_id"]
        )
        .first()
    )

    if existing_id:
        raise ValueError(
            "User ID already exists"
        )

    user = User(
        user_id=data["user_id"],
        username=data["username"],
        password_hash=hash_password(
            data["password"]
        ),
        full_name=data["full_name"],
        role=data["role"],
        state=data["state"],
        district=data["district"],
        status=data.get(
            "status",
            "Active",
        ),
        created_at=datetime.now(
            timezone.utc
        ).strftime(
            "%Y-%m-%d %H:%M:%S"
        ),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user_to_dict(user)


def update_user(
    db: Session,
    current_user: User,
    user_id: str,
    data: dict,
):
    if str(current_user.role).upper() != "ADMIN":
        return None

    user = (
        db.query(User)
        .filter(
            User.user_id == user_id
        )
        .first()
    )

    if not user:
        return None

    if data.get("full_name") is not None:
        user.full_name = data["full_name"]

    if data.get("role") is not None:
        user.role = data["role"]

    if data.get("state") is not None:
        user.state = data["state"]

    if data.get("district") is not None:
        user.district = data["district"]

    if data.get("status") is not None:
        user.status = data["status"]

    if data.get("password"):
        user.password_hash = hash_password(
            data["password"]
        )

    db.commit()
    db.refresh(user)

    return user_to_dict(user)


def user_overview(
    db: Session,
    current_user: User,
):
    query = db.query(User)

    query = apply_user_scope(
        query,
        current_user,
    )

    users = query.all()

    by_role = {}
    by_status = {}

    for user in users:
        role = user.role
        user_status = user.status

        by_role[role] = (
            by_role.get(role, 0) + 1
        )

        by_status[user_status] = (
            by_status.get(user_status, 0) + 1
        )

    active_users = sum(
        1
        for user in users
        if str(user.status).lower() == "active"
    )

    return {
        "total_users": len(users),
        "active_users": active_users,
        "by_role": by_role,
        "by_status": by_status,
    }