import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);  // Manage loading state

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setBalance(response.data.balance);
        setLoading(false);  
      } catch (error) {
        console.error("Error fetching balance:", error);
        setLoading(false);  
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="flex">
      <div className="font-bold text-lg mt-4">
        Your balance
      </div>
      <div className="font-semibold ml-4 mt-4 text-lg">
        :Rs.{balance.toFixed(2)}
      </div>
    </div>
  );
};
