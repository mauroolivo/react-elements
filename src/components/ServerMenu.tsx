"use client";

import { useState } from "react";
import Link from "next/link";

export default function ServerMenu() {
  const [open, setOpen] = useState(false);
  const [gitOpen, setGitOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [firebaseOpen, setFirebaseOpen] = useState(false);

  return (
    <aside className="w-64 border-r border-slate-700 bg-slate-800 p-4">
      <h2 className="mb-4 text-lg font-semibold">Navigation</h2>
      <nav className="space-y-2 text-sm">
        <Link
          href="/intro"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Intro
        </Link>
        <Link
          href="/admin"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Admin
        </Link>
        <Link
          href="/contact"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Contact
        </Link>
        <Link
          href="/dashboard"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard2"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Dashboard2
        </Link>
        <Link
          href="/movies"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Movies
        </Link>
        <Link
          href="/posts"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Posts
        </Link>
        <Link
          href="/products"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Products
        </Link>
        <Link
          href="/recipes"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Recipes
        </Link>
        <Link
          href="/selector"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Selector
        </Link>
        <div>
          <button
            onClick={() => setTaskOpen((v) => !v)}
            className="w-full text-left flex items-center justify-between px-2 py-1 rounded hover:bg-slate-700"
            aria-expanded={taskOpen}
          >
            <span>Task</span>
            <span className="text-xs">{taskOpen ? "▾" : "▸"}</span>
          </button>
          {taskOpen && (
            <div className="pl-4 mt-1 space-y-1">
              <Link
                href="/task/context"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Context
              </Link>
              <Link
                href="/task/zustand"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Zustand
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setUserOpen((v) => !v)}
            className="w-full text-left flex items-center justify-between px-2 py-1 rounded hover:bg-slate-700"
            aria-expanded={userOpen}
          >
            <span>User</span>
            <span className="text-xs">{userOpen ? "▾" : "▸"}</span>
          </button>
          {userOpen && (
            <div className="pl-4 mt-1 space-y-1">
              <Link
                href="/user/code"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Code
              </Link>
              <Link
                href="/user/signin"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Sign in
              </Link>
              <Link
                href="/user/signup"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
        <Link
          href="/products/1"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Product (example)
        </Link>

        <div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full text-left flex items-center justify-between px-2 py-1 rounded hover:bg-slate-700"
            aria-expanded={open}
          >
            <span>Sockets</span>
            <span className="text-xs">{open ? "▾" : "▸"}</span>
          </button>
          {open && (
            <div className="pl-4 mt-1 space-y-1">
              <Link
                href="/sockets/1"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Socket 1
              </Link>
              <Link
                href="/sockets/2"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Socket 2
              </Link>
              <Link
                href="/sockets/3"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Socket 3
              </Link>
              <Link
                href="/sockets/4"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Socket 4
              </Link>
              <Link
                href="/sockets/5"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Socket 5
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setGitOpen((v) => !v)}
            className="w-full text-left flex items-center justify-between px-2 py-1 rounded hover:bg-slate-700"
            aria-expanded={gitOpen}
          >
            <span>GitHub</span>
            <span className="text-xs">{gitOpen ? "▾" : "▸"}</span>
          </button>
          {gitOpen && (
            <div className="pl-4 mt-1 space-y-1">
              <Link
                href="/github/auth"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Auth
              </Link>
              <Link
                href="/github/repos"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Repos
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setFirebaseOpen((v) => !v)}
            className="w-full text-left flex items-center justify-between px-2 py-1 rounded hover:bg-slate-700"
            aria-expanded={firebaseOpen}
          >
            <span>Firebase</span>
            <span className="text-xs">{firebaseOpen ? "▾" : "▸"}</span>
          </button>
          {firebaseOpen && (
            <div className="pl-4 mt-1 space-y-1">
              <Link
                href="/firebase/signin"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Sign in
              </Link>
              <Link
                href="/firebase/signup"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Sign up
              </Link>
              <Link
                href="/firebase/demo"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Demo
              </Link>
              <Link
                href="/firebase/conditional"
                className="block rounded px-2 py-1 hover:bg-slate-700"
              >
                Conditional Demo
              </Link>
            </div>
          )}
        </div>
        <Link
          href="/debounce"
          className="block rounded px-2 py-1 hover:bg-slate-700"
        >
          Debounce Demo
        </Link>
      </nav>
    </aside>
  );
}
