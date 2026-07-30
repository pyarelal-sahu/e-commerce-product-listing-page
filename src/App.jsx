import ProductListingPage from "./containers/productListing/ProductListingPage";
import PropTypes from "prop-types";

/**
 * Root application component.
 *
 * @returns {JSX.Element} Rendered application shell.
 */
function App({ isDarkMode, onToggleTheme }) {
  return <ProductListingPage isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />;
}

App.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired
};

export default App;
