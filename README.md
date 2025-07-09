💡 Features
⏰ Manual or scheduled trigger

📄 Reads Name, Email, Company, and CustomMessage from Google Sheets

📬 Sends dynamic emails via Gmail (using OAuth2)

🔁 Loops over all contacts using SplitInBatches

🔒 Secure OAuth2 setup for Gmail + Google Sheets

⚙️ No backend or code required — fully built in n8n

✅ Easily extendable to other use cases (reminders, onboarding, etc.)

🧰 Tech Stack
Tool	Purpose
n8n Cloud	No-code workflow builder
Google Sheets	Stores user data
Gmail API	Sends emails securely using OAuth2
OAuth2	Authentication layer for Google services

⚙️ How It Works
Schedule Trigger: Starts the flow manually or on a recurring schedule.

Google Sheets Node: Reads contact data from a spreadsheet.

SplitInBatches Node: Loops over each row to handle one contact at a time.

Gmail Node: Sends a custom email using fields like:

{{ $json["Name"] }}

{{ $json["Company"] }}

{{ $json["CustomMessage"] }}

📧 Email Format:
Subject:
Welcome to {{ Company }}, {{ Name }}!
Body:
Hi {{ Name }},

We're excited to have you on board at {{ Company }}.

{{ CustomMessage }}

Best regards,  
GigFloww
