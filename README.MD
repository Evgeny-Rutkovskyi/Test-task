# Task Manager Desktop App

Це настільний кросплатформенний додаток для управління задачами, побудований на стеку **Electron + React + NestJS + PostgreSQL**.

---

## Технології

- **Electron** — створення десктопного додатку
- **React** — інтерфейс користувача
- **NestJS** — бекенд API
- **PostgreSQL** — база даних (через Docker)
- **TypeORM + Zod** — ORM та валідація

---

## Швидкий старт

### Структура

```
root/
├── backend/        # NestJS API
├── frontend/       # React UI
├── electron/       # Electron оболонка
├── docker-compose.yml  # Сервіс бази даних PostgreSQL
```

---

## Що потрібно для запуску

###  Клонування репозиторію

```bash
git clone https://github.com/Evgeny-Rutkovskyi/Test-task.git
cd Test-task
```

### Встановити:

- [Node.js](https://nodejs.org/) (LTS версія)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — для запуску бази даних

---

## Запуск у режимі розробки

### 1. Встановити залежності

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
npm install --prefix electron
```

### 2. Запустити базу даних

```bash
docker-compose up -d
```

База доступна на `localhost:5432`. Всі змінні вже налаштовані у коді.

---

### 3. Запустити додаток у dev-режимі

```bash
npm run dev
```

Це запускає:

- React UI на [http://localhost:3000](http://localhost:3000)
- NestJS API на [http://localhost:3001](http://localhost:3001)
- Electron оболонку (яка відкриває UI)

---
