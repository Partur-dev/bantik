export const env = (key: string) => {
  if (!Deno.env.has(key)) {
    throw new Error(`Missing ${key} environment variable`)
  }

  return Deno.env.get(key)
}
