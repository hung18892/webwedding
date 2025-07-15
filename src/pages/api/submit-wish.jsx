export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const formBody = new URLSearchParams(req.body).toString();

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxma2n1fJH-nwbA4ScYDDPlLRncnCeA6RgPGUtH0wlaHkXYMcWEbQpGMjgMB6RY5vfb/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });

    const text = await response.text();
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to forward request', detail: error.message });
  }
}
