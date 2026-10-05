import { useState } from "react"

function RecipeForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [categoria, setCategoria] = useState("")
  const [dificuldade, setDificuldade] = useState("")
  const [tempo, setTempo] = useState("")

  function aoEnviar(evento) {
    evento.preventDefault()

    if (
      titulo.trim() === "" ||
      descricao.trim() === "" ||
      categoria === "" ||
      dificuldade === "" ||
      tempo.trim() === ""
    ) {
      return
    }

    onAdicionar({
      titulo,
      descricao,
      categoria,
      dificuldade,
      tempo,
    })

    setTitulo("")
    setDescricao("")
    setCategoria("")
    setDificuldade("")
    setTempo("")
  }

  return (
    <form
      onSubmit={aoEnviar}
      className="bg-white rounded-2xl shadow-md p-6 mb-10"
    >
      <h2 className="text-2xl font-bold text-rose-950 mb-5">
        Adicionar nova receita
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
         <label
  htmlFor="campo-titulo"
  className="block text-sm font-semibold text-stone-700 mb-1"
>
  Nome da receita
</label>

<input
  id="campo-titulo"
  type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Brigadeiro"
            className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        <div>
          <label
  htmlFor="campo-dificuldade"
  className="block text-sm font-semibold text-stone-700 mb-1"
>
  Dificuldade
</label>

<select
  id="campo-dificuldade"
            onChange={(e) => setDificuldade(e.target.value)}
            className={`w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              categoria === "" ? "text-stone-400" : "text-black"
            }`}
          >
            <option value="" disabled hidden>
  Ex: Bolos
</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Biscoitos">Biscoitos</option>
            <option value="Bolos">Bolos</option>
            <option value="Sobremesas">Sobremesas</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label
  htmlFor="campo-descricao"
  className="block text-sm font-semibold text-stone-700 mb-1"
>
  Descrição da receita
</label>

<textarea
  id="campo-descricao"
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Brigadeiro cremoso de chocolate, perfeito para festas."
            rows="3"
            className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1">
            Dificuldade
          </label>

          <select
            value={dificuldade}
            onChange={(e) => setDificuldade(e.target.value)}
            className={`w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              dificuldade === "" ? "text-stone-400" : "text-black"
            }`}
          >
            <option value="" disabled hidden>
             Ex: Fácil
            </option>
            <option value="Fácil">Fácil</option>
            <option value="Médio">Médio</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <div>
          <label
  htmlFor="campo-descricao"
  className="block text-sm font-semibold text-stone-700 mb-1"
>
  Descrição da receita
</label>

<textarea
  id="campo-descricao"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            placeholder="Ex: 30 min"
            className="w-full border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-lg transition"
      >
        + Adicionar receita
      </button>
    </form>
  )
}

export default RecipeForm