import { useEffect, useState } from "react"

function InstallPrompt() {
  const [eventoInstalacao, setEventoInstalacao] = useState(null)
  const [mostrar, setMostrar] = useState(false)

  useEffect(() => {
    function capturarInstalacao(evento) {
      evento.preventDefault()
      setEventoInstalacao(evento)
      setMostrar(true)
    }

    window.addEventListener("beforeinstallprompt", capturarInstalacao)

    return () => {
      window.removeEventListener("beforeinstallprompt", capturarInstalacao)
    }
  }, [])

  async function instalarAplicativo() {
    if (!eventoInstalacao) return

    eventoInstalacao.prompt()

    const resultado = await eventoInstalacao.userChoice

    if (resultado.outcome === "accepted") {
      setMostrar(false)
    }

    setEventoInstalacao(null)
  }

  if (!mostrar) {
    return null
  }

  return (
    <div className="bg-emerald-100 border-b border-emerald-300 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-emerald-900 font-semibold text-center sm:text-left">
          Instale o SweetBite no seu dispositivo para acessar suas receitas rapidamente.
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={instalarAplicativo}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-lg transition"
          >
            Instalar
          </button>

          <button
            type="button"
            onClick={() => setMostrar(false)}
            className="bg-white text-emerald-800 border border-emerald-300 font-semibold px-5 py-2 rounded-lg hover:bg-emerald-50 transition"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  )
}

export default InstallPrompt
