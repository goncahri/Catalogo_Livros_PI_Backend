import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
});

export async function logInfo(message, data = {}) {
  logger.info({ ...data }, message);
  await sendToBetterStack("info", message, data);
}

export async function logError(message, data = {}) {
  logger.error({ ...data }, message);
  await sendToBetterStack("error", message, data);
}

async function sendToBetterStack(level, message, data = {}) {
  const token = process.env.BETTERSTACK_TOKEN;
  const host = process.env.BETTERSTACK_HOST;

  if (!token || !host) return;

  try {
    await fetch(`https://${host}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dt: new Date().toISOString(),
        level,
        message,
        service: "catalogo-livros-backend",
        environment: process.env.NODE_ENV || "local",
        ...data,
      }),
    });
  } catch (error) {
    logger.error({ error: error.message }, "Erro ao enviar log para Better Stack");
  }
}