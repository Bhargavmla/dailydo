DailyDo is a minimal, fast to-do list manager built as a take-home prototype for Cluco's internship screening.  
It focuses on quick task entry, simple prioritization, and a clean, distraction-free user experience.
## Features (MVP)
- Add tasks (title, optional due date, priority: Low/Medium/High)  
- Edit tasks (load into input → update)  
- Mark tasks complete / undo  
- Delete tasks (with confirmation)  
- Search tasks by title  
- Filter: All / Active / Done  
- Export tasks to JSON (download)  
- Clear All (with confirmation)  
- Tasks persist locally via `localStorage`

---

## Tech
- React (Create React App)  
- Plain CSS (modern card UI)  
- No backend for MVP — localStorage persistence

---

## Quick start (run locally)
```bash
# clone
git clone https://github.com/<your-username>/dailydo.git
cd dailydo

# install
npm install

# run
npm start
# open http://localhost:3000
