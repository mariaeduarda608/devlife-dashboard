
import { useState, useEffect } from "react"
import {
  suportaNotificacoes,
  ativarNotificacoes,
  notificarLocal,
} from "../notifications"

function NotificationPrompt() {
  const [permissao, setPermissao] = useState(
    suportaNotificacoes() ? Notification.permission : "unsupported"
  )
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (permissao === "granted") {
      ativarNotificacoes().catch((erro) =>
        console.warn("Inscrição de push adiada:", erro)
      )
    }
  }, [permissao])

  async function handleAtivar() {
    setCarregando(true)

    try {
      await ativarNotificacoes()
      setPermissao(
        suportaNotificacoes() ? Notification.permission : "unsupported"
      )
    } finally {
      setCarregando(false)
    }
  }

  if (permissao === "unsupported" || permissao === "denied") {
    return null
  }

  if (permissao === "granted") {
    return (
      <div className="bg-rose-100 text-rose-950 text-sm px-6 py-3 flex items-center justify-between flex-wrap gap-2">
        <span>Notificações ativadas!</span>

        <button
          onClick={() =>
            notificarLocal("SweetBite", {
              body: "Esta é uma notificação de teste!",
            })
          }
          className="text-sm font-semibold underline rounded px-2 py-1"
        >
          Testar notificação
        </button>
      </div>
    )
  }

  return (
    <div className="bg-rose-100 text-rose-950 px-6 py-3 flex items-center justify-between flex-wrap gap-3">
      <p className="text-sm">
        Quer receber avisos sobre suas receitas?
      </p>

      <button
        onClick={handleAtivar}
        disabled={carregando}
        className="bg-rose-700 hover:bg-rose-800 disabled:opacity-60 text-white text-sm font-bold px-4 py-2 rounded-lg"
      >
        {carregando ? "Ativando..." : "Ativar notificações"}
      </button>
    </div>
  )
}

export default NotificationPrompt
