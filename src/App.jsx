import { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Noise() {
  return (
    <div className="pointer-events-none fixed inset-0 mix-blend-soft-light opacity-30" style={{backgroundImage:'url(https://grainy-gradients.vercel.app/noise.svg)'}}/>
  )
}

function Nav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4">
      <div className="text-xs tracking-[0.35em] uppercase text-neutral-300">Petits a</div>
      <div className="flex items-center gap-6 text-neutral-300">
        <a href="#" className="hover:text-white transition-colors">Issues</a>
        <a href="#" className="hover:text-white transition-colors">Features</a>
        <a href="#" className="hover:text-white transition-colors">About</a>
      </div>
    </div>
  )
}

function Marquee() {
  return (
    <div className="absolute left-0 right-0 -bottom-2 overflow-hidden">
      <div className="whitespace-nowrap text-[10vw] leading-none font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500/30 opacity-[0.05] select-none">
        PETITS A • AVANT • GRUNGE • LUXE • PETITS A • AVANT • GRUNGE • LUXE •
      </div>
    </div>
  )
}

function Hero({featured}) {
  const f = featured?.[0]
  return (
    <section className="relative min-h-[80vh] flex items-end">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]"/>
        <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]"/>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,black_80%)]"/>
      </div>
      <div className="relative w-full px-6 pb-24">
        <h1 className="text-[16vw] leading-[0.8] font-black tracking-tighter text-white select-none">
          {f?.title || 'VOID / GLAMOUR'}
        </h1>
        <div className="mt-6 max-w-xl text-neutral-300">
          {f?.excerpt || 'An exploration of decayed luxury and new brutal beauty.'}
        </div>
      </div>
      <Marquee/>
    </section>
  )
}

function Grid({articles}) {
  return (
    <section className="px-6 py-20">
      <div className="grid md:grid-cols-12 gap-6">
        {articles?.map((a, i) => (
          <article key={a._id || i} className={`group md:col-span-${i%5===0?6:3} bg-neutral-900/60 border border-neutral-800 rounded-lg overflow-hidden relative`}> 
            <div className="aspect-[4/5] bg-neutral-800 flex items-end p-4">
              <h3 className="text-xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{a.title}</h3>
            </div>
            <div className="p-4 text-neutral-300 text-sm flex items-center justify-between">
              <span>{a.category || 'Feature'}</span>
              <span className="opacity-50">{a.author || 'Editorial'}</span>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,transparent,black)]"/>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function App(){
  const [featured, setFeatured] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        // ensure there is content
        await fetch(`${BACKEND}/seed`, {method: 'POST'})
        const f = await fetch(`${BACKEND}/articles?featured=true`).then(r=>r.json())
        const a = await fetch(`${BACKEND}/articles`).then(r=>r.json())
        setFeatured(f)
        setArticles(a)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Nav/>
      <Noise/>
      <main>
        <Hero featured={featured}/>
        <div className="px-6">
          <div className="border-t border-neutral-800"/>
        </div>
        <Grid articles={articles}/>
      </main>
      <footer className="px-6 py-10 text-neutral-500 text-xs uppercase tracking-widest">
        © {new Date().getFullYear()} Petits a
      </footer>
    </div>
  )
}
