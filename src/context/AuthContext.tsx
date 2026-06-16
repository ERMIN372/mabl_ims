"use client";

// Mock-авторизация на стороне клиента (localStorage).
// TODO(backend): заменить на реальную аутентификацию (JWT/сессии, API /login).
// Структура контекста сохранится — поменяется только реализация методов.

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface User {
  login: string;
  name: string;
}

interface StoredCredential {
  login: string;
  password: string;
  name: string;
}

interface AuthContextValue {
  user: User | null;
  ready: boolean;
  login: (login: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  // Регистрирует учётные данные, выданные после оплаты (mock).
  registerCredential: (login: string, password: string, name: string) => void;
  // Восстановление доступа (mock): возвращает пароль по логину.
  recover: (login: string) => { ok: boolean; password?: string; error?: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "mabl_users";
const SESSION_KEY = "mabl_session";

// Демо-учётная запись, всегда доступна для входа.
const DEMO: StoredCredential = {
  login: "demo@mabl.academy",
  password: "mabl2026",
  name: "Демо-пользователь",
};

function readUsers(): StoredCredential[] {
  if (typeof window === "undefined") return [DEMO];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const list: StoredCredential[] = raw ? JSON.parse(raw) : [];
    if (!list.some((u) => u.login === DEMO.login)) list.push(DEMO);
    return list;
  } catch {
    return [DEMO];
  }
}

function writeUsers(users: StoredCredential[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Восстановление сессии при загрузке.
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((loginValue: string, password: string) => {
    const users = readUsers();
    const found = users.find(
      (u) => u.login.toLowerCase() === loginValue.trim().toLowerCase()
    );
    if (!found) return { ok: false, error: "Пользователь не найден" };
    if (found.password !== password)
      return { ok: false, error: "Неверный логин или пароль" };
    const session: User = { login: found.login, name: found.name };
    setUser(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const registerCredential = useCallback(
    (loginValue: string, password: string, name: string) => {
      const users = readUsers();
      const idx = users.findIndex((u) => u.login === loginValue);
      const entry: StoredCredential = { login: loginValue, password, name };
      if (idx >= 0) users[idx] = entry;
      else users.push(entry);
      writeUsers(users);
    },
    []
  );

  const recover = useCallback((loginValue: string) => {
    const users = readUsers();
    const found = users.find(
      (u) => u.login.toLowerCase() === loginValue.trim().toLowerCase()
    );
    if (!found) return { ok: false, error: "Пользователь с таким логином не найден" };
    // Mock: показываем пароль. В production — отправка ссылки на e-mail.
    return { ok: true, password: found.password };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, ready, login, logout, registerCredential, recover }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth должен использоваться внутри AuthProvider");
  return ctx;
}
