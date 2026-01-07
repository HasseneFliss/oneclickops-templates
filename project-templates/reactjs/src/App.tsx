import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

interface Item {
  id: string;
  name: string;
  description?: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">{{DISPLAY_NAME}}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-slate-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
