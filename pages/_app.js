import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// File: pages/index.js
import ChoresAssistant from '@/components/ChoresAssistant'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <ChoresAssistant />
    </main>
  )
}
