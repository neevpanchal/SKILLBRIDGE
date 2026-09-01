import sqlite3
import os
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "data.db")


def _get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db():
    try:
        with _get_conn() as conn:
            conn.executescript("""
                CREATE TABLE IF NOT EXISTS topics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    icon TEXT DEFAULT '📖'
                );

                CREATE TABLE IF NOT EXISTS questions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    topic_id INTEGER NOT NULL,
                    question TEXT NOT NULL,
                    option_a TEXT NOT NULL,
                    option_b TEXT NOT NULL,
                    option_c TEXT NOT NULL,
                    option_d TEXT NOT NULL,
                    correct_option TEXT NOT NULL,
                    explanation TEXT,
                    FOREIGN KEY(topic_id) REFERENCES topics(id)
                );

                CREATE TABLE IF NOT EXISTS progress (
                    topic_id INTEGER PRIMARY KEY,
                    mastery REAL NOT NULL DEFAULT 0,
                    attempts INTEGER NOT NULL DEFAULT 0,
                    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(topic_id) REFERENCES topics(id)
                );
            """)

            # Seed if empty
            if conn.execute("SELECT COUNT(*) FROM topics").fetchone()[0] == 0:
                topics = [
                    (1, "Variables & Data Types", "Python Fundamentals", "📦"),
                    (2, "Conditional Logic (if/else)", "Control Flow", "🔀"),
                    (3, "Loops & Iterations (for/while)", "Control Flow", "🔁"),
                    (4, "Data Structures (Lists, Dicts)", "Core Collections", "📚"),
                    (5, "Functions & Scope", "Modular Code", "⚙️"),
                    (6, "Error Handling & Exceptions", "Robust Systems", "🛡️"),
                ]
                conn.executemany("INSERT INTO topics (id, name, subject, icon) VALUES (?, ?, ?, ?)", topics)

            if conn.execute("SELECT COUNT(*) FROM questions").fetchone()[0] == 0:
                questions = [
                    (1, "Which symbol assigns a value to a variable in Python?", "=", "==", ":=", "->", "A", "The '=' operator is the standard assignment operator in Python."),
                    (1, "Which of the following is a valid Python variable name?", "2variable", "user_score", "user-score", "class", "B", "Variable names cannot start with numbers, contain hyphens, or use reserved keywords."),
                    (2, "Which keyword begins a conditional branching statement?", "if", "when", "check", "case", "A", "Python uses 'if', 'elif', and 'else' for conditionals."),
                    (2, "What does the expression 10 > 5 evaluate to in Python?", "10", "5", "True", "False", "C", "Comparison operators evaluate to Boolean True or False."),
                    (3, "Which statement immediately exits a running loop?", "continue", "break", "pass", "skip", "B", "'break' immediately terminates the nearest enclosing loop."),
                    (3, "How many times does range(4) produce a number during iteration?", "3", "4", "5", "0", "B", "range(4) produces 0, 1, 2, 3 (a total of 4 values)."),
                    (4, "Which brackets are used to declare a standard Python list?", "()", "{}", "[]", "<>", "C", "Square brackets '[]' denote a mutable list."),
                    (4, "What is the index of the first element in a Python list?", "0", "1", "-1", "Depends", "A", "Python uses 0-based indexing for sequences."),
                    (5, "Which keyword is used to define a new function in Python?", "function", "def", "fn", "define", "B", "'def' defines function signatures in Python."),
                    (5, "Which keyword sends a return value back to the caller?", "send", "yield-only", "return", "output", "C", "'return' terminates the function call and hands the value back."),
                    (6, "Which block is used to catch and handle exceptions gracefully?", "catch", "except", "rescue", "handle", "B", "Python uses 'try...except' blocks for exception handling."),
                ]
                conn.executemany("""
                    INSERT INTO questions (topic_id, question, option_a, option_b, option_c, option_d, correct_option, explanation)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, questions)

                # Initialize default progress
                conn.executemany("""
                    INSERT INTO progress (topic_id, mastery, attempts)
                    VALUES (?, ?, 1)
                """, [(1, 85.0), (2, 70.0), (3, 40.0), (4, 90.0), (5, 55.0), (6, 30.0)])

            conn.commit()
    except sqlite3.Error as e:
        print(f"Error initializing Site A DB: {e}")


def get_student_dashboard():
    init_db()
    with _get_conn() as conn:
        rows = conn.execute("""
            SELECT t.id, t.name, t.subject, t.icon, COALESCE(p.mastery, 0) as mastery, COALESCE(p.attempts, 0) as attempts
            FROM topics t
            LEFT JOIN progress p ON t.id = p.topic_id
            ORDER BY t.id
        """).fetchall()
        
        topics = [dict(r) for r in rows]
        avg_mastery = round(sum(t["mastery"] for t in topics) / (len(topics) or 1), 1)
        weak_topics = [t for t in topics if t["mastery"] < 60]

        return {
            "overall_mastery": avg_mastery,
            "topics_count": len(topics),
            "weak_topics_count": len(weak_topics),
            "topics": topics,
        }


def get_all_questions():
    init_db()
    with _get_conn() as conn:
        rows = conn.execute("""
            SELECT q.*, t.name as topic_name, t.subject
            FROM questions q
            JOIN topics t ON q.topic_id = t.id
            ORDER BY q.id
        """).fetchall()
        return [dict(r) for r in rows]


def evaluate_test(answers: Dict[str, str]):
    init_db()
    with _get_conn() as conn:
        questions = conn.execute("SELECT * FROM questions").fetchall()
        
        topic_stats = {}
        total_correct = 0

        for q in questions:
            tid = q["topic_id"]
            if tid not in topic_stats:
                topic_stats[tid] = {"correct": 0, "total": 0}
            topic_stats[tid]["total"] += 1

            submitted = answers.get(f"q_{q['id']}") or answers.get(str(q['id']))
            if submitted == q["correct_option"]:
                topic_stats[tid]["correct"] += 1
                total_correct += 1

        # Update progress table
        for tid, data in topic_stats.items():
            pct = round((data["correct"] / data["total"]) * 100, 1)
            conn.execute("""
                INSERT INTO progress (topic_id, mastery, attempts, last_attempt)
                VALUES (?, ?, 1, CURRENT_TIMESTAMP)
                ON CONFLICT(topic_id) DO UPDATE SET
                    mastery = excluded.mastery,
                    attempts = progress.attempts + 1,
                    last_attempt = CURRENT_TIMESTAMP
            """, (tid, pct))
        conn.commit()

        total_q = len(questions)
        overall_pct = round((total_correct / total_q) * 100, 1) if total_q else 0

        return {
            "score": total_correct,
            "total": total_q,
            "percentage": overall_pct,
            "topic_breakdown": topic_stats,
        }
