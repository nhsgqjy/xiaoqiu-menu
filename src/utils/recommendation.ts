import { dishesData, Dish, Category } from '../data/dishes';

const MEAT_CATEGORIES: Category[] = ['beef', 'chicken', 'seafood', 'pork'];
const VEGGIE_CATEGORIES: Category[] = ['vegetable', 'egg'];
const SIDE_CATEGORIES: Category[] = ['soup', 'cold-dish', 'staple'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomFrom(arr: Dish[]): Dish {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getDishesFromCategories(categories: Category[]): Dish[] {
  return dishesData.filter(d => categories.includes(d.category));
}

/**
 * Generate daily recommendation: 1 meat + 1 veggie + 1 side
 * Prioritizes favorites, avoids recent history
 */
export function generateRecommendation(
  favoriteIds: number[],
  recentIds: number[]
): Dish[] {
  // Helper: get candidates, favorites first then others shuffled
  const getCandidates = (categories: Category[]): Dish[] => {
    const pool = getDishesFromCategories(categories)
      .filter(d => !recentIds.includes(d.id));

    const favInPool = pool.filter(d => favoriteIds.includes(d.id));
    const restInPool = pool.filter(d => !favoriteIds.includes(d.id));

    return [...shuffle(favInPool), ...shuffle(restInPool)];
  };

  const meatCandidates = getCandidates(MEAT_CATEGORIES);
  const veggieCandidates = getCandidates(VEGGIE_CATEGORIES);
  const sideCandidates = getCandidates(SIDE_CATEGORIES);

  const result: Dish[] = [];

  // Meat
  if (meatCandidates.length > 0) {
    result.push(meatCandidates[0]);
  } else {
    result.push(getRandomFrom(getDishesFromCategories(MEAT_CATEGORIES)));
  }

  // Veggie
  if (veggieCandidates.length > 0) {
    result.push(veggieCandidates[0]);
  } else {
    result.push(getRandomFrom(getDishesFromCategories(VEGGIE_CATEGORIES)));
  }

  // Side
  if (sideCandidates.length > 0) {
    result.push(sideCandidates[0]);
  } else {
    result.push(getRandomFrom(getDishesFromCategories(SIDE_CATEGORIES)));
  }

  return result;
}
