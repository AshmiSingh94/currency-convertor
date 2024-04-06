import { useState, useEffect } from "react";
import { CurrencyDropDown } from "./dropdown";
import { IoIosSwap } from "react-icons/io";
export const CurrencyConvertor = () => {
  const [curriences, setCurriences] = useState<string[]>([]);
  const [amount, setAmount] = useState<number>();
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [converting, setConverting] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const fetchCurriences = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurriences(Object.keys(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCurriences();
    handleSwap;
  }, [toCurrency, fromCurrency]);
  
  const convertcurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + "" + toCurrency);
    } catch (error) {
      console.log(error);
    } finally {
      setConverting(false);
    }
  };

  //https://api.frankfurter.app/latest?amount=1&from=USD&toINR

  const handleFavorite = (currency:any) => {
  let updatedCurrency = [...favorites];
  if(favorites.includes(currency)){
    updatedCurrency = updatedCurrency.filter((fav)=>fav !==currency)
  }else{
    updatedCurrency.push(currency)
  }

  setFavorites(updatedCurrency)
  localStorage.setItem("favorites", JSON.stringify(updatedCurrency))
  };
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    console.log(handleSwap);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-20 bg-white rounded-lg shadow-lg">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">Currency Convertor</h2>
      <div className="grid grid-cols-3 sm:grid-cols-1 ">
        <CurrencyDropDown
          currencies={curriences}
          title="From"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
          favorites={favorites}
        />
        <div className="flex justify-center -mb-5 sm:-mt-1">
          <button onClick={handleSwap} className="p-2 mt-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
            <IoIosSwap />
          </button>
        </div>

        <CurrencyDropDown
          currencies={curriences}
          title="To"
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorite={handleFavorite}
          favorites={favorites}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="number"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>
      <div className="flex justify-end mt-5">
        <button
          onClick={convertcurrency}
          className={`px-5 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus: ring-2 focus:ring-indigo-500 focus:ring-offset-4 ${
            converting ? "animate-bounce" : "none"
          }`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4  font-medium flex-start text-green-500">Converted Amount : {convertedAmount}</div>
      )}
    </div>
  );
};
