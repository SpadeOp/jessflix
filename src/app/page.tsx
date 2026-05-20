"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { movies } from "@/lib/data"
import { tmdbImg } from "@/lib/tmdb"
import Card from "@/components/Card"

function shuffle(a: any[]) {
  const b = [...a]
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[b[i], b[j]] = [b[j], b[i]]
  }
  return b
}

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    movies.forEach((m: any) => {
      m._poster = m.poster ? tmdbImg(m.poster, "w500") : undefined
      m._backdrop = m.backdrop ? tmdbImg(m.backdrop, "w1280") : undefined
    })
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    const t = setInterval(() => setHeroIdx(prev => (prev + 1) % heroM.length), 6000)
    return () => clearInterval(t)
  }, [ready])

  if (!ready) return null

  const heroM = shuffle(movies).slice(0, 5)
  const m = heroM[heroIdx]
  const bg = m._backdrop
    ? `linear-gradient(135deg,rgba(15,12,41,.95),rgba(36,13,58,.85)),url(${m._backdrop}) center/cover no-repeat`
    : ""

  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ background: bg }} />
        <div className="hero-shine" />
        <div className="hero-content">
          <span className="hero-badge">&#9733; {heroIdx === 0 ? "Featured" : "Now Trending"}</span>
          <h1>{m.title}</h1>
          <div className="hero-meta">
            <span>{m.year}</span><span className="dot">&#183;</span><span>{m.runtime}</span>
            <span className="dot">&#183;</span><span className="rating">&#9733; {m.rating}</span>
            <span className="dot">&#183;</span><span>{m.director}</span>
          </div>
          <p className="hero-desc">{m.plot.slice(0, 150)}...</p>
          <div className="hero-btns">
            <Link href={`/movie/${m.id}?watch=1`} className="btn-primary">&#9654; Watch Now</Link>
            <Link href={`/movie/${m.id}`} className="btn-secondary">Details</Link>
          </div>
        </div>
        <div className="hero-dots">
          {heroM.map((_, i) => (
            <button key={i} className={`hero-dot ${i === heroIdx ? "active" : ""}`} onClick={() => setHeroIdx(i)} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Trending Now</h2>
          <Link href="/movies" className="see-all">See All &rarr;</Link>
        </div>
        <div className="scroll-row">
          {shuffle(movies).slice(0, 8).map(m => <Card key={m.id} item={m} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Top Rated</h2>
          <Link href="/movies" className="see-all">See All &rarr;</Link>
        </div>
        <div className="scroll-row">
          {[...movies].sort((a, b) => b.rating - a.rating).slice(0, 8).map(m => <Card key={m.id} item={m} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Action &amp; Thrillers</h2>
          <Link href="/movies" className="see-all">See All &rarr;</Link>
        </div>
        <div className="scroll-row">
          {movies.filter(m => m.genre.includes("Action") || m.genre.includes("Thriller")).map(m => <Card key={m.id} item={m} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Sci-Fi &amp; Fantasy</h2>
          <Link href="/movies" className="see-all">See All &rarr;</Link>
        </div>
        <div className="scroll-row">
          {movies.filter(m => m.genre.includes("Sci-Fi") || m.genre.includes("Fantasy")).map(m => <Card key={m.id} item={m} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>&#128571; Explore More</h2>
        </div>
        <div className="scroll-row" style={{ display: "flex", gap: "1rem" }}>
          {[
            { name: "TV Shows", icon: "📺", route: "/tv" },
            { name: "Collections", icon: "🎬", route: "/movies" },
            { name: "Library", icon: "📚", route: "/library" },
          ].map(n => (
            <Link key={n.name} href={n.route} className="card" style={{ width: 200, opacity: 1 }}>
              <div className="poster-wrap" style={{ aspectRatio: "auto", height: 140, background: "linear-gradient(135deg,#7c5cfc33,#5c3cfc22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                {n.icon}
              </div>
              <div className="card-info"><h3>{n.name}</h3></div>
            </Link>
          ))}
        </div>
      </section>

      <footer>
        <p>JessFlix &copy; 2024 &middot; Made with <span className="gold">&#9829;</span> by Jess</p>
      </footer>
    </>
  )
}
