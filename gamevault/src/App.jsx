import { useState, useEffect } from "react"
import Header from "./components/Header"
import RecipeCard from "./components/RecipeCard"
import TaskForm from "./components/TaskForm"
import Footer from "./components/Footer"

function App() {
  const [anuncio, setAnuncio] = useState("")
  const receitasIniciais = [
    {
      id: 1,
      titulo: "Brownie",
      descricao: "Brownie de chocolate intenso, macio por dentro e com uma deliciosa casquinha por cima.",
      categoria: "Chocolate",
      dificuldade: "Fácil",
      tempo: "40 min",
      cor: "Chocolate",
      favorito: false,
    },
    {
      id: 2,
      titulo: "Cookies",
      descricao: "Cookies crocantes por fora, macios por dentro e recheados com gotas de chocolate.",
      categoria: "Biscoitos",
      dificuldade: "Fácil",
      tempo: "30 min",
      cor: "Biscoitos",
      favorito: false,
    },
    {
      id: 3,
      titulo: "Cupcake",
      descricao: "Cupcakes fofinhos de baunilha com uma cobertura cremosa e irresistível.",
      categoria: "Bolos",
      dificuldade: "Fácil",
      tempo: "35 min",
      cor: "Bolos",
      favorito: false,
    },
    {
      id: 4,
      titulo: "Petit Gâteau",
      descricao: "Bolinho de chocolate com uma casquinha delicada e recheio cremoso por dentro.",
      categoria: "Chocolate",
      dificuldade: "Médio",
      tempo: "25 min",
      cor: "Chocolate",
      favorito: false,
    },
    {
      id: 5,
      titulo: "Cheesecake",
      descricao: "Sobremesa cremosa com base crocante e uma deliciosa cobertura de frutas vermelhas.",
      categoria: "Sobremesas",
      dificuldade: "Médio",
      tempo: "1h 20min",
      cor: "Sobremesas",
      favorito: false,
    },
    {
      id: 6,
      titulo: "Rocambole",
      descricao: "Massa leve e fofinha enrolada com um recheio cremoso e saboroso.",
      categoria: "Bolos",
      dificuldade: "Médio",
      tempo: "50 min",
      cor: "Bolos",
      favorito: false,
    },
  ]

  const [receitas, setReceitas] = useState(() => {
    const salvas = localStorage.getItem("sweetbite-receitas")

    return salvas ? JSON.parse(salvas) : receitasIniciais
  })

  const [filtro, setFiltro] = useState("Todas")

  useEffect(() => {
    localStorage.setItem("sweetbite-receitas", JSON.stringify(receitas))
  }, [receitas])

  function adicionarReceita(novaReceita) {
    const receitaCompleta = {
      ...novaReceita,
      id: Date.now(),
      cor: novaReceita.categoria,
      favorito: false,
    }
    setAnuncio(`Receita "${novaReceita.titulo}" adicionada.`)

    setReceitas((atual) => [...atual, receitaCompleta])
  }

  function removerReceita(id) {
    setReceitas((atual) =>
      atual.filter((receita) => receita.id !== id)
    )
  }

  function alternarFavorito(id) {
    setReceitas((atual) =>
      atual.map((receita) =>
        receita.id === id
          ? { ...receita, favorito: !receita.favorito }
          : receita
      )
    )
  }

  const receitasFiltradas =
  filtro === "Todas"
    ? receitas
    : filtro === "Favoritos"
    ? receitas.filter((receita) => receita.favorito)
    : receitas.filter((receita) => receita.categoria === filtro)

  return (
    <div className="min-h-screen bg-rose-50">
      <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-stone-900 focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
    >
      Pular para o conteúdo
    </a>
      <Header />
      <div aria-live="polite" role="status" className="sr-only">
  {anuncio}
</div>

      <main id="conteudo" className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-950">
            Receitas deliciosas
          </h2>

          <p className="text-rose-800 mt-3">
            Encontre sua próxima sobremesa favorita.
          </p>
        </section>
        <TaskForm onAdicionar={adicionarReceita} />

        <section className="mb-10">
          <h2 className="text-xl font-bold text-rose-950 mb-4">
            Filtrar receitas
          </h2>

          <div className="flex flex-wrap gap-3">
            {["Todas", "Favoritos", "Chocolate", "Biscoitos", "Bolos", "Sobremesas"].map(
              (categoria) => (
                <button
                  key={categoria}
                  onClick={() => setFiltro(categoria)}
                  aria-pressed={filtro === categoria}
                  className={`px-5 py-2 rounded-full font-semibold transition ${
                    filtro === categoria
                      ? "bg-rose-500 text-white"
                      : "bg-white text-rose-700 border border-rose-200 hover:bg-rose-100"
                  }`}
                >
                  {categoria}
                </button>
              )
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {receitasFiltradas.map((receita) => (
            <RecipeCard
              key={receita.id}
              titulo={receita.titulo}
              descricao={receita.descricao}
              categoria={receita.categoria}
              dificuldade={receita.dificuldade}
              tempo={receita.tempo}
              cor={receita.cor}
              favorito={receita.favorito}
              onFavoritar={() => alternarFavorito(receita.id)}
              onRemover={() => removerReceita(receita.id)}
            />
          ))}
        </section>

        {receitasFiltradas.length === 0 && (
          <p className="text-center text-stone-500 mt-10">
            Nenhuma receita encontrada nessa categoria.
          </p>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App