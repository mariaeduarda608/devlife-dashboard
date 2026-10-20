
const VAPID_PUBLIC_KEY =
  "BBB4P_ZvVY64umR_Q-wOq0Zoj9BAABM21XuCAD04za53RfHFb_7JWQy" +
  "S-VHR9f4u_OtJ6ljEU-j1uymGxFrc1bg"

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/")

  const rawData = atob(base64)

  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)))
}

export function suportaNotificacoes() {
  return "Notification" in window && "serviceWorker" in navigator
}


export async function ativarNotificacoes() {
  if (!suportaNotificacoes()) {
    return { ok: false, motivo: "sem-suporte" }
  }

  try {
    const permissao = await Notification.requestPermission()

    if (permissao !== "granted") {
      return { ok: false, motivo: "negada" }
    }

    return { ok: true }
  } catch (erro) {
    console.warn("Erro ao ativar notificações:", erro)
    return { ok: false, motivo: "falha", erro }
  }
}

export async function notificarLocal(titulo, opcoes = {}) {
  if (
    !suportaNotificacoes() ||
    Notification.permission !== "granted"
  ) {
    return
  }

  const registro = await navigator.serviceWorker.ready

  await registro.showNotification(titulo, {
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    ...opcoes,
  })
}
