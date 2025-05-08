# 🐾 Adopt Me

Aplikacja webowa do przeglądania i adopcji zwierząt. Projekt składa się z części frontendowej (React + TypeScript) oraz backendowej (Java + Spring Boot).

## 📁 Struktura katalogów

```
adopt-me/
├── adopt-me-backend/    ← API Spring Boot (Java)
└── adopt-me-front/      ← Aplikacja frontendowa (React + TypeScript)
```

---

## 🚀 Jak uruchomić projekt lokalnie

### Backend (Spring Boot)

```bash
cd adopt-me-backend
./mvnw spring-boot:run
```

**Wymagania**:
- Java 17+
- Maven (lub wrapper `./mvnw`)

API będzie dostępne pod:  
`http://localhost:8080/api/...`

---

### Frontend (React + TypeScript)

```bash
cd adopt-me-front
npm install
npm start
```

**Wymagania**:
- Node.js 18+
- npm

Frontend działa domyślnie na:  
`http://localhost:3000`

---

## 🧰 Technologie

- React + Vite + TypeScript
- Spring Boot (REST API)
- Maven
- Postman (do testowania backendu)

---

## 📝 Status projektu

> Projekt w fazie rozwojowej – testowany lokalnie, backend i frontend rozwijane równolegle.

---

## 📸 Zrzuty ekranu

> *(Dodaj screeny po zapisaniu ich w folderze `assets/` lub wrzuć na imgur/GitHub i wstaw URL)*

#### Formularz adopcji zwierzaka:
![Formularz adopcji](./assets/formularz-adopcji.png)

#### Lista dostępnych zwierząt:
![Lista zwierząt](./assets/lista-zwierzat.png)

---

## 🔌 API – przykładowe endpointy (Spring Boot)

#### 📄 GET /api/animals
Zwraca listę wszystkich zwierząt dostępnych do adopcji.

#### 🐶 POST /api/animals
Dodaje nowe zwierzę do systemu (wymaga danych: imię, gatunek, wiek itd.)

#### 💬 POST /api/adoptions
Zgłoszenie chęci adopcji zwierzaka.

#### 🔍 GET /api/animals/{id}
Zwraca szczegóły konkretnego zwierzęcia po jego ID.

---

## 📋 Plan funkcjonalności (WIP)

- [x] Podstawowy interfejs frontendowy (lista + formularz adopcji)
- [x] Proste REST API (Spring Boot)
- [x] Walidacja formularzy
- [ ] Autoryzacja użytkownika (Google OAuth)
- [ ] Dashboard administratora
- [ ] System notyfikacji / maili
- [ ] Wdrożenie na serwer (np. Vercel / Heroku / Railway)

---

## 📌 Autor

Jakub Jędrzejewski  
[github.com/Jcob3011](https://github.com/Jcob3011)
