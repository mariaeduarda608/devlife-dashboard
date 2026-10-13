import { useEffect, useState } from "react"

function StatusRede() {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    function ficouOnline() {
      setOnline(true)
    }

    function ficouOffline() {
      setOnline(false)
    }

    window.addEventListener("online", ficouOnline)
    window.addEventListener("offline", ficouOffline)

    return () => {
      window.removeEventListener("online", ficouOnline)
      window.removeEventListener("offline", ficouOffline)
    }
  }, [])

  if (online) {
    return null
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-amber-100 text-amber-900 border-b border-amber-300 px-6 py-3 text-center font-semibold"
    >
      Você está offline. O SweetBite continua funcionando com os dados salvos.
    </div>
  )
}

export default StatusRede