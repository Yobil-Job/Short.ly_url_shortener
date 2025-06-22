<div align="center">
  <img src="assets/screen1.png" alt="Project Banner" width="800"/>
  <br/>
  <br/>
  
  # **Short.ly: A Backend-Focused URL Shortener**
  
  **A full-stack application built to demonstrate robust, secure, and scalable backend architecture for the CodeAlpha internship.**
  
  <br/>
  
  <a href="https://short-ly-6oe6.onrender.com">
    <img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=rocket&logoColor=white" alt="Live Demo"/>
  </a>
  <a href="https://github.com/Yobil-Job/Short.ly_url_shortener/stargazers">
    <img src="https://img.shields.io/github/stars/your-username/your-repo?style=for-the-badge&logo=github&color=FFC107" alt="Stars"/>
  </a>
  <a href="https://github.com/Yobil-Job/Short.ly_url_shortener/network/members">
    <img src="https://img.shields.io/github/forks/your-username/your-repo?style=for-the-badge&logo=github&color=4CAF50" alt="Forks"/>
  </a>

</div>

---

<a href="https://short-ly-6oe6.onrender.com">
   <h3>Live demo</h3>
  </a>

### **🧠 Backend Architecture & Design Philosophy**
While the application features a clean UI, its core is a powerful backend architecture designed for efficiency and security. This project is a testament to a deep understanding of server-side principles:

-   **Secure by Design**: APIs are protected with authentication middleware. Routes that expose user data are locked down, ensuring that users can only access their own information.
-   **Efficient Data Modeling**: The MongoDB schema is logically structured using Mongoose, enabling fast queries for users, URLs, and complex, time-series analytics data.
-   **Robust Authentication**: Security is paramount. The system uses session-based authentication and hashes all user passwords with `bcryptjs`, leaving no plain-text credentials in the database.
-   **Production-Ready Configuration**: The app is fully configured with environment variables (`.env`), allowing for seamless and secure deployment to production environments like Render without any code changes.
-   **Modular & Scalable Code**: The backend codebase is organized into modular routers, controllers, and models, making it clean, easy to maintain, and scalable for future features.

---

### **✨ Key Features**

| Feature | Description |
| :--- | :--- |
| ✅ **User Authentication** | Secure, session-based registration and login system. |
| 🔗 **Powerful Shortening** | Instantly generate unique, short links with an option for custom aliases. |
| 📈 **Advanced Analytics** | Private dashboard for each link with charts for click trends and device types. |
| 🌍 **Geographic Tracking** | An interactive world map that visualizes the origin of every click. |
| 📂 **Link Management** | A central "My Links" page to view, copy, and access analytics for all created URLs. |
| 😎 **Developer Showcase** | A custom-built developer profile page with a unique, animated design. |

---

### **📸 Screenshot Gallery**

<table>
  <tr>
    <td align="center"><strong>Regsteration & Login</strong></td>
    <td align="center"><strong>Dashboard </strong></td>
    <td align="center"><strong>Detailed Analytics</strong></td>
  </tr>
  <tr>
    <td><img src="assets/screen1.png" alt="Dashboard Screenshot" width="100%"></td>
    <td><img src="assets/screen2.png" alt="Analytics Screenshot" width="100%"></td>
    <td><img src="assets/screen3.png" alt="Developer Profile Screenshot" width="100%"></td>
  </tr>
</table>

---

### **🛠️ Technologies & Tools**

| Category | Tools |
| :--- | :--- |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) |
| **Frontend** | ![EJS](https://img.shields.io/badge/EJS-A91E50?style=flat-square&logo=ejs&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **Authentication** | ![Express Session](https://img.shields.io/badge/Express_Session-000000?style=flat-square) ![Bcrypt](https://img.shields.io/badge/Bcrypt-62438B?style=flat-square) |
| **Charting** | ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white) |

---

This project was a fantastic learning experience that covered every aspect of modern web development. It stands as a practical demonstration of the backend development skills and architectural concepts central to the CodeAlpha internship program. 
