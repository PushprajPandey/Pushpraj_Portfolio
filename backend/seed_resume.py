"""
Seed the database with resume data for Pushpraj Pandey.
Run this once: python seed_resume.py
"""

from database import engine, SessionLocal, Base
from models import ResumeSection

RESUME_DATA = [
    {
        "section": "personal_info",
        "content": (
            "Name: Pushpraj Pandey\n"
            "Email: sajalpandey858@gmail.com\n"
            "Phone: (+91) 7489690930\n"
            "LinkedIn: https://www.linkedin.com/in/pushpraj-pandey-249732250\n"
            "GitHub: https://github.com/PushprajPandey\n"
            "Telegram: https://t.me/pushpraj_pandey\n"
            "Website: https://pushprajpandey.in"
        ),
    },
    {
        "section": "summary",
        "content": (
            "Passionate DevOps Engineer, Full-Stack Developer and Computer Science student "
            "with a strong foundation in building scalable web applications and data-driven solutions. "
            "Specializes in React.js, Node.js, and MongoDB, with experience in developing real-time "
            "applications that serve hundreds of users. Proficient in integrating AI capabilities, "
            "optimizing database performance, and creating responsive user experiences. "
            "Skilled in multiple programming languages including Python, Java, JavaScript, "
            "with hands-on experience with modern frameworks and cloud technologies. "
            "Solved 150+ DSA problems on LeetCode and contributed to multiple open-source projects."
        ),
    },
    {
        "section": "education",
        "content": (
            "Bachelor's of Technology in Computer Science\n"
            "VIT (Vellore Institute of Technology)\n"
            "September 2022 - May 2026 (Expected)"
        ),
    },
    {
        "section": "experience",
        "content": (
            "Full-Stack Developer (MERN) — SmartBridge\n"
            "January 2025 - March 2025\n"
            "• Built expense tracker application managing 100+ transaction records with real-time data visualization.\n"
            "• Integrated generative AI capabilities reducing manual data entry by 60%.\n"
            "• Optimized MongoDB performance achieving 40% faster query performance."
        ),
    },
    {
        "section": "skills",
        "content": (
            "Programming Languages: Python, Java, JavaScript, TypeScript\n"
            "Frontend: React.js, HTML5, CSS3, SASS, Styled Components\n"
            "Backend: Node.js, Express.js, FastAPI\n"
            "Databases: MongoDB, SQL, DynamoDB\n"
            "Cloud & DevOps: GCP (Google Cloud Platform), AWS Lambda, API Gateway, Docker\n"
            "Data & Analytics: Power BI, Chart.js, Data Visualization\n"
            "AI/ML: LangChain, PyPDF2, Generative AI integration\n"
            "Tools: Git, GitHub, Streamlit\n"
            "Other: RESTful APIs, Stripe API integration, WebSocket, Real-time applications"
        ),
    },
    {
        "section": "projects",
        "content": (
            "1. Rentyor — Real estate rental platform\n"
            "   Tech: React.js, Node.js, MongoDB, Stripe API\n"
            "   Features: Property listings, payment integration, user authentication\n\n"
            "2. PennyPilot — Expense tracking application\n"
            "   Tech: React.js, MongoDB, Node.js, Chart.js\n"
            "   Features: Real-time data visualization, AI-powered data entry, budget tracking\n\n"
            "3. MedSync — Healthcare management system\n"
            "   Tech: React.js, Node.js, Express.js, MongoDB\n"
            "   Features: Patient records management, appointment scheduling\n\n"
            "4. Crime-Scan — Crime data analysis tool\n"
            "   Tech: Python, SQL, JavaScript, Shell\n"
            "   Features: Data analysis, visualization, pattern detection\n\n"
            "5. Serverless Voting Application\n"
            "   Tech: AWS Lambda, API Gateway, DynamoDB\n"
            "   Features: Serverless architecture, real-time vote counting\n\n"
            "6. GeniusBot: AI-Powered Assistance\n"
            "   Tech: Streamlit, PyPDF2, LangChain\n"
            "   Features: AI chatbot, PDF document interaction, intelligent responses"
        ),
    },
    {
        "section": "achievements",
        "content": (
            "• Solved 150+ DSA problems on LeetCode\n"
            "• Contributed to multiple open-source projects\n"
            "• Built applications serving hundreds of users\n"
            "• Achieved 40% faster MongoDB query performance through optimization\n"
            "• Reduced manual data entry by 60% through AI integration"
        ),
    },
]


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # Clear existing resume data
        db.query(ResumeSection).delete()
        db.commit()

        for item in RESUME_DATA:
            db.add(ResumeSection(**item))
        db.commit()
        print(f"✅ Seeded {len(RESUME_DATA)} resume sections successfully.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
