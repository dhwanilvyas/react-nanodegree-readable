import {
  CATEGORIES_AVAILABLE
} from '../actions/types';

const initialState = {
  categories: []
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_AVAILABLE:
      const { categories } = action;
      return Object.assign({}, state, {
        categories
      });
    default:
      return state;
  }
}

export default categoriesReducer;
