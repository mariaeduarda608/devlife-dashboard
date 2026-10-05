function RecipeCard({
  titulo,
  descricao,
  categoria,
  dificuldade,
  tempo,
  cor,
  onRemover,
  favorito,
  onFavoritar,
}) {
  let estilo = ""

  if (cor === "Chocolate") {
    estilo = "border-l-amber-700"
  } else if (cor === "Biscoitos") {
    estilo = "border-l-orange-400"
  } else if (cor === "Bolos") {
    estilo = "border-l-purple-400"
  } else if (cor === "Sobremesas") {
    estilo = "border-l-red-400"
  }

  return (
    <article
      className={`rounded-2xl border border-stone-200 border-l-[6px] ${estilo} bg-white p-6 shadow-md hover:shadow-xl transition duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold uppercase text-rose-700">
  {categoria}
</span>

        <button
  onClick={onFavoritar}
  aria-pressed={favorito}
  className={`text-3xl hover:scale-110 transition ${
    favorito ? "text-rose-500" : "text-rose-500"
  }`}
>
  {favorito ? "★" : "☆"}
</button>
      </div>

      <h2 className="text-2xl font-bold text-stone-900 mb-3">
        {titulo}
      </h2>

      <p className="text-stone-600 leading-relaxed mb-5">
        {descricao}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="bg-rose-50 px-3 py-1 rounded-full text-sm text-stone-600 shadow-sm">
          ⏱️ {tempo}
        </span>

        <span className="bg-rose-50 px-3 py-1 rounded-full text-sm text-stone-600 shadow-sm">
          ⭐ {dificuldade}
        </span>
      </div>

      <div className="flex gap-3">
        <button className="bg-rose-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-rose-600 transition">
          Ver receita
        </button>

        <button
  onClick={onRemover}
  aria-label={`Excluir receita: ${titulo}`}
  className="bg-stone-200 text-stone-700 px-5 py-2 rounded-lg font-semibold hover:bg-stone-300 transition"
>
   Excluir
</button>
      </div>
    </article>
  )
}

export default RecipeCard