const fetchRecipes = async (url) => {
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

export default fetchRecipes;
