Fullstack TypeScript Application/Framework with SSR

This project is a Next.js-based fullstack framework that supports Server-Side Rendering (SSR) and implements a modular backend-frontend architecture. The system is built entirely in TypeScript and follows a layered structure for maintainability and scalability.

🛠️ Technologies Used
Frontend: Next.js, React, TypeScript, Tailwind CSS, DaisyUI
Backend: Express.js, TypeScript, MongoDB
Data Handling: RESTful API, Firestore (coming soon)
Localization: i18n (next-i18next)
HTTP: Axios

📁 Project Structure
The project consists of two main parts:

frontend/ → SSR-enabled Next.js frontend
backend/ → REST API backend built with Express.js
Each part follows a specific modular architecture, ensuring flexibility and clean separation of concerns.

🖥️ Frontend Architecture
The frontend follows a layered architecture, ensuring efficient data flow and structured logic.

1️⃣ Service Layer (/service/)
The frontend components only call this layer.
This layer handles business logic and requests data through the repository layer.

2️⃣ Repository Layer (/repository/)
This layer handles data-fetching operations only.
It utilizes the useHttp hook for API communication.

3️⃣ HTTP Handling (/hook/useHttp.ts)
A reusable HTTP hook that manages all API interactions.
Supports standard GET, POST, PUT, and DELETE requests.

4️⃣ State Management (/store/)
Stores all retrieved data from the backend.
Components interact with the store, not directly with API calls.

5️⃣ Localization (i18n)
Multi-language support via next-i18next.
Provides internationalization capabilities for dynamic content.

🛠️ Backend Architecture
The backend follows a RESTful API structure and implements fundamental HTTP methods (GET, POST, PUT, DELETE).

1️⃣ Routes (/routes/)
Defines all RESTful API endpoints.
Routes pass requests to controllers for processing.

2️⃣ Controller (/controller/)
The controller layer handles direct request processing.
It forwards data to the service layer for logic execution.

3️⃣ Service (/service/)
Acts as an intermediary between controllers and repositories.
Contains business logic, validation, and additional data processing.

4️⃣ Repository (/repository/)
Handles only database operations, without business logic.
Interacts directly with MongoDB for data retrieval and updates.

5️⃣ Database Handling (/database/db[type]/useAPI.ts)
Provides a generic CRUD API for MongoDB.
Manages all database interactions dynamically.

6️⃣ Factories (/factory/)
Transforms incoming frontend data into backend-compatible format.
Converts database responses back into frontend-friendly objects.

This architecture ensures that the backend remains scalable, modular, and easily extendable, allowing for future integrations with external servers.

🚀 Upcoming Features
🔜 Firestore CRUD operations will be implemented soon.
🔜 Firebase integration will provide more flexible data storage options.

🛠️ How to Run the Project
1️⃣ Install dependencies:
npm install

2️⃣ Start the backend server and the app:
npm run dev

The frontend runs on http://localhost:3000.
The backend runs on http://localhost:5000 by default.

🔗 Summary
✅ Full SSR support using Next.js.
✅ Modular frontend architecture (Service → Repository → HTTP → Store).
✅ TypeScript-based RESTful backend.
✅ Factory system for safe data transformations.
✅ Built-in internationalization using i18n.
✅ Supports multiple databases (MongoDB now, Firestore soon).

🚀 This framework provides a modern and scalable foundation for a fullstack application!
