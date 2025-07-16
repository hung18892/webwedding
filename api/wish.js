// pages/api/wish.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  console.log('Received data:', req.body); // Debug log

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbxma2n1fJH-nwbA4ScYDDPlLRncnCeA6RgPGUtH0wlaHkXYMcWEbQpGMjgMB6RY5vfb/exec', // Dán URL deployment mới vào đây
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: req.body.name,
          attendance: req.body.attendance,
          wish: req.body.wish
        }).toString()
      }
    );

    const result = await response.text();
    console.log('Google Sheets response:', result); // Debug log
    
    return res.status(200).json({ message: 'Success', data: result });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ message: err.message });
  }
}
