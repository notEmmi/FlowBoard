import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")


def send_email(to_email: str, subject: str, body: str) -> bool:
    if not SMTP_USER or not SMTP_PASSWORD:
        print(f"[DEV] Email would be sent to {to_email}:")
        print(f"Subject: {subject}")
        print(f"Body:\n{body}")
        return True

    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = FROM_EMAIL
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(FROM_EMAIL, to_email, msg.as_string())

        return True
    except Exception as e:
        print(f"Email send failed: {e}")
        return False


def send_password_reset_email(to_email: str, reset_token: str) -> bool:
    reset_link = f"{FRONTEND_URL}/reset-password?token={reset_token}"
    subject = "FlowBoard Password Reset"
    body = f"""
Hi,

You requested a password reset for your FlowBoard account.

Click the link below to reset your password (valid for 15 minutes):

{reset_link}

If you did not request this, please ignore this email.

Thanks,
FlowBoard Team
"""
    return send_email(to_email, subject, body)
