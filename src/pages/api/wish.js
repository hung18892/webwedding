export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { name, attendance, wish } = req.body;

  if (!name || !wish) {
    return res.status(400).json({ error: 'Missing name or wish' });
  }

  const formBody = new URLSearchParams({ name, attendance, wish });

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbxma2n1fJH-nwbA4ScYDDPlLRncnCeA6RgPGUtH0wlaHkXYMcWEbQpGMjgMB6RY5vfb/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      }
    );

    const text = await response.text();
    res.status(200).json({ message: 'Success', text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to forward request', detail: err.message });
  }
}