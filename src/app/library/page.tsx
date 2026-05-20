"use client"

import Link from "next/link"

export default function LibraryPage() {
  return (
    <>
      <div className="page-header">
        <h1>Your Library</h1>
      </div>
      <div className="library-empty">
        <div className="icon">&#9825;</div>
        <h3>No favorites yet</h3>
        <p>Click the heart on any movie to add it to your library.</p>
        <Link href="/movies" className="btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>Browse Movies</Link>
      </div>
      <footer><p>JessFlix &copy; 2024</p></footer>
    </>
  )
}
