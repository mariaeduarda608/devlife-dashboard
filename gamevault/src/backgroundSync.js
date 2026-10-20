export function suportaBackgroundSync() {
  return "serviceWorker" in navigator && "SyncManager" in window
}

export async function agendarSincronizacao(tag = "sincronizar-receitas") {
  if (!suportaBackgroundSync()) {
    console.warn(
      "Background Sync não é suportado neste navegador. As receitas continuam salvas localmente."
    )
    return false
  }

  try {
    const registro = await navigator.serviceWorker.ready
    await registro.sync.register(tag)

    console.log(`Sincronização "${tag}" agendada.`)
    return true
  } catch (erro) {
    console.error("Falha ao agendar a sincronização:", erro)
    return false
  }
}