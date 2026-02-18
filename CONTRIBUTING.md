# Contributing to BlackOut

First off, thank you for considering contributing to BlackOut! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

BlackOut is a **Free Speech Tracker** for India, built to provide transparency around internet censorship, website blocking, and content takedowns.

## 🛠️ Development Setup

This project uses **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

1.  **Fork the repository** to your own GitHub account.
2.  **Clone the project** to your machine:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/blackout-tracker.git](https://github.com/YOUR_USERNAME/blackout-tracker.git)
    cd blackout-tracker
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📂 Project Structure

To help you navigate the codebase:

* **`src/components/`**: Reusable UI components. We use **Shadcn UI**.
* **`src/data/`**: JSON files containing the incident and film censorship data.
* **`src/pages/`**: Main view logic (e.g., `Dashboard.tsx`).
* **`src/utils/`**: Helper functions for data analytics and normalization.
* **`Data_Extractor/`**: Python scripts used to scrape and parse transparency reports.

---

## 💡 How Can I Contribute?

### 1. Improve the Data (Python & Data Science)
* Our `FSC_extractor` scripts (in the `Data_Extractor` folder) need improvements to handle more government transparency report formats.
* **Goal:** Automate the parsing of PDF/HTML orders into our JSON format.

### 2. Enhance the Frontend (React & Maps)
* **Map Precision:** We currently use a simplified GeoJSON. Implementing a high-fidelity District-level map of India would be a huge upgrade.
* **Mobile Experience:** Improve the responsiveness of the charts and tables on smaller screens.

### 3. Backend Integration (Node/Supabase)
* Currently, user submissions are saved to `localStorage`.
* **Goal:** Connect the "Submit Incident" form to a real backend (like Supabase, Firebase, or a Node.js API) so reports are actually saved to a central database.

---

## 📝 Coding Guidelines

* **TypeScript:** We use strict TypeScript. Please define interfaces for your data (e.g., `interface Incident { ... }`) instead of using `any`.
* **Styling:** Use **Tailwind CSS** classes. Avoid writing custom CSS files unless absolutely necessary.
* **Components:** If you need a new UI element (like a Dialog or Dropdown), check if it's available in Shadcn UI first.
* **Linting:** Run `npm run lint` before committing to ensure there are no errors.

---

## 🚀 Submitting a Pull Request (PR)

1.  Create a new branch for your feature:
    ```bash
    git checkout -b feature/amazing-feature
    ```
2.  Commit your changes with a clear message:
    ```bash
    git commit -m "feat: add district-level map support"
    ```
3.  Push to your fork:
    ```bash
    git push origin feature/amazing-feature
    ```
4.  Open a **Pull Request** on the main repository.
5.  Describe your changes and link to any relevant issues.

---

## 🤝 Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of level of experience, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other similar characteristic.

Happy Hacking! 🚀