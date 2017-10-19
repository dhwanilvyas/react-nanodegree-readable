import axios from 'axios';
import {
  CATEGORIES_AVAILABLE
} from './types';

export function getCategories() {
  return function(dispatch) {
    axios.get('categories')
      .then(response => {
        dispatch(categoriesAvailable(response.categories));
      });
  }
}

function categoriesAvailable(categories) {
  return {
    type: CATEGORIES_AVAILABLE,
    categories
  };
}
