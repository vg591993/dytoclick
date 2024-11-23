import { useState } from 'react';

interface ViewDetailsButtonProps {
  clientID: string;
}

export default function ViewDetailsButton({ clientID }: ViewDetailsButtonProps) {
  const [data, setData] = useState(null);  // For storing the API response if needed

  const handleViewDetails = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    try {
      const response = await fetch(`https://gg.ai/health?clientID=${clientID}`, {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleViewDetails}
        className="opacity-50 group-hover:opacity-100 transition-opacity duration-200 px-4 py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg"
      >
        View Details
      </button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
