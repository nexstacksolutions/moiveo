async function searchAction({ request }) {
  try {
    const response = await request.formData();
    const data = Object.fromEntries(response);
    return data;
  } catch (error) {
    throw new Error("An error occurred while searching");
  }
}

export default searchAction;
