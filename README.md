# Army Portal - Java Full Stack Project

## 🔥 Overview
Army Portal is a **Java Full Stack project** showcasing:
- Responsive UI with Tailwind CSS
- Posts feed (like Instagram) with images, captions, tags, likes & comments
- Secure login module
- Public post sharing
- Real-time updates

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS (Tailwind), JavaScript
- **Backend:** Spring Boot (Java)
- **Database:** MySQL (normalized schema: users, posts, comments)
- **ORM:** JPA/Hibernate
- **Security:** Spring Security (password hashing, JWT)

## 📂 Schema
**Table: posts**
- id (PK), image, caption, tags, description, likes, timestamp, postId

**Table: comments**
- id (PK), username, comment, timestamp, postId (FK)

**Table: users**
- id (PK), username, email, password (hashed)

## 🚀 Features
- Add posts with images, captions, and tags
- React to posts (like system)
- Comment on posts
- Secure login/signup
- Posts visible publicly
- Only owner can delete their posts
- Hindi motivational slogans with animations

## 🎯 Run
```bash
mvn spring-boot:run
```
