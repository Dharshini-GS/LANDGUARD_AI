"""
SQLite database connection and query utilities
"""

import sqlite3
import os
from utils.config import DATABASE_PATH

def get_db_connection():
    """Returns a SQLite connection with Row factory enabled and Foreign Keys active."""
    conn = sqlite3.connect(DATABASE_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def execute_query(query: str, params: tuple = (), fetch_one: bool = False, fetch_all: bool = True):
    """Utility helper to execute SELECT queries and return dictionaries."""
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(query, params)
        if fetch_one:
            row = cursor.fetchone()
            return dict(row) if row else None
        elif fetch_all:
            rows = cursor.fetchall()
            return [dict(r) for r in rows]
        return None
    finally:
        conn.close()

def execute_statement(query: str, params: tuple = ()):
    """Utility helper for INSERT/UPDATE/DELETE statements."""
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(query, params)
        conn.commit()
        return cursor.lastrowid
    finally:
        conn.close()
