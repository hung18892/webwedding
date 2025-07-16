// pages/api/wish.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, attendance, wish } = req.body;

  try {
    const formBody = new URLSearchParams({
      name,
      attendance,
      wish
    });

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbxma2n1fJH-nwbA4ScYDDPlLRncnCeA6RgPGUtH0wlaHkXYMcWEbQpGMjgMB6RY5vfb/exec',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      }
    );

    const data = await response.text();
    res.status(200).json({ message: 'Success', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
