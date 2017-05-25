import { createStore } from 'redux';
import reducers from './services/reducers';

export default createStore(
    reducers,
);
