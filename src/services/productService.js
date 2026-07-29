/**
 * Fetches products from the mock JSON endpoint.
 *
 * @returns {Promise<Array>} Product list.
 */
export async function fetchProductsApi() {
  const response = await fetch("/products.json");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
