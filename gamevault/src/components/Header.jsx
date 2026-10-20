import { useState } from "react"
import Relogio from "./Relogio"

function Header() {
  const [mostrarRelogio, setMostrarRelogio] = useState(true)

  return (
    <header className="bg-rose-900 text-white px-6 py-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
         <h1 className="text-2xl font-bold font-display">
  SweetBite
</h1>

          <p className="text-rose-200 mt-1">
            Receitas doces para deixar seu dia mais gostoso
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-rose-300 mb-1">
            Horário atual
          </p>

          {mostrarRelogio && (
            <span aria-hidden="true">
              <Relogio />
            </span>
          )}

          <button
            type="button"
            onClick={() => setMostrarRelogio(!mostrarRelogio)}
            aria-pressed={mostrarRelogio}
            className="mt-2 text-xs border border-rose-300 px-3 py-1 rounded-lg hover:bg-rose-800 transition"
          >
            {mostrarRelogio ? "Esconder relógio" : "Mostrar relógio"}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header