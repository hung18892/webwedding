export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Gửi dữ liệu dưới dạng JSON thay vì x-www-form-urlencoded
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbxma2n1fJH-nwbA4ScYDDPlLRncnCeA6RgPGUtH0wlaHkXYMcWEbQpGMjgMB6RY5vfb/exec', // Thay URL deployment mới
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body) // Gửi nguyên bộ dữ liệu dạng JSON
      }
    );

    const result = await response.json();
    return res.status(200).json(result);
    
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ message: err.message });
  }
}
