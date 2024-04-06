// import { useState } from "react";
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
interface CurrencyDropDownProps {
  currencies: string[]; // Explicitly define the type of the 'currencies' prop
  currency: string;
  setCurrency: (currency: string) => void;
  favorites: string[];
  handleFavorite: (currency: string) => void;
  title?: string;
}

export const CurrencyDropDown: React.FC<CurrencyDropDownProps> = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title = "",
  }) => {
    const isFavorite = (curr: string) => favorites.includes(curr);
  
    return (
      <div className="mt-1 relative">
        <label htmlFor={title} className="block text-sm font-medium text-gray-500">
          {title}
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus-ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a currency</option>
          {favorites.map((favoriteCurrency) => (
            <option className="bg-gray-200" key={favoriteCurrency} value={favoriteCurrency}>
              {favoriteCurrency}
            </option>
          ))}
          {currencies
            ?.filter((c) => !favorites.includes(c))
            .map((nonFavoriteCurrency) => (
              <option value={nonFavoriteCurrency} key={nonFavoriteCurrency}>
                {nonFavoriteCurrency}
              </option>
            ))}
        </select>
        <button
          className="absolute inset-y-0 right-0 mt-4 mr-4 p-2  flex items-center justify-center text-sm leading-5"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click event from propagating to select element
            handleFavorite(currency);
          }}
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    );
  };
  ;
