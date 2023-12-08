
import { useEffect, useState } from "react";
import "./Multifilter.css";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function MultiFilter({ challenges }) {
  // State variables to store challenges, selected filters, selected difficulty, and filtered challenges
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filtersSelected, setFiltersSelected] = useState(false);

  // Arrays to store difficulty and category filters
  let difficultyFilters = ["Easy", "Medium", "Hard"];
  let categoryFilters = [
    "Many Ingredients",
    "One Ingredient",
    "Seasonal",
    "Technique",
    "Theme",
  ];

  // Function to handle category filters
  const handleFilter = (category) => {
    // If the category is already selected, remove it
    if (selectedFilters.includes(category)) {
      const updatedFilters = selectedFilters.filter(
        (filter) => filter !== category
      );
      setSelectedFilters(updatedFilters);
    } else {
      // If the category is not selected, add it

      setSelectedFilters([...selectedFilters, category]);
    }
  };

  const handleDifficultyFilter = (difficulty) => {
    // If the same difficulty filter is selected again, clear it
    setSelectedDifficulty((prevDifficulty) =>
      prevDifficulty === difficulty ? "" : difficulty
    );
  };

  // Effect to filter items based on selected filters and difficulty

  useEffect(() => {
    filterItems();
  }, [selectedFilters, selectedDifficulty]);

  // Function to filter challenges based on selected filters and difficulty

  const filterItems = () => {
    const filteredItems = challenges.filter((challenge) => {
      // Check if the challenge has all selected categories

      const hasSelectedCategory =
        selectedFilters.length === 0 ||
        selectedFilters.every((selectedCategory) =>
          challenge.categories.includes(selectedCategory)
        );

      // Check if the challenge has the selected difficulty

      const hasSelectedDifficulty =
        selectedDifficulty === "" ||
        challenge.categories.includes(selectedDifficulty);

      // Return true if the challenge meets both category and difficulty criteria
      return hasSelectedCategory && hasSelectedDifficulty;
    });

    // Update the filteredItems state and set the flag if filters are selected

    setFilteredItems(filteredItems);
    setFiltersSelected(selectedFilters.length > 0 || selectedDifficulty !== "");
  };

  return (
    <div>
      <div className="filter-buttons-container">
        <div className="difficulty-filter">
          <h2>Difficulty</h2>
          {difficultyFilters.map((difficulty, idx) => (
            <button
              onClick={() => handleDifficultyFilter(difficulty)}
              className={`filter-button ${
                selectedDifficulty === difficulty ? "selected-filter" : ""
              }`}
              key={`difficulty-filter-${idx}`}
            >
              {difficulty}
            </button>
          ))}
        </div>
        <div className="category-filter">
          <h2>Category</h2>
          {categoryFilters.map((category, idx) => (
            <button
              onClick={() => handleFilter(category)}
              className={`filter-button ${
                selectedFilters.includes(category) ? "selected-filter" : ""
              }`}
              key={`category-filter-${idx}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Display filtered results if filters are selected */}
      {filtersSelected && (
        <>
          <h2>Results</h2>

          {filteredItems ? (
            // Check if there are matching challenges
            filteredItems.length === 0 ? (
              <p>No matching challenges found.</p>
            ) : (
              // Display SmallChallengeCard for each matching challenge

              <div className="SmallChallengeSlider">
                {filteredItems.map((recipe) => (
                  <RecipeCard
                    recipe={recipe}
                    key={recipe.id}
                  />
                ))}
              </div>
            )
          ) : null}
        </>
      )}
    </div>
  );
}
