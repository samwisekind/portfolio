/* eslint-disable import/no-extraneous-dependencies */

import LazyLoad from 'vanilla-lazyload';

const lazyLoad = new LazyLoad({ elements_selector: '.js-lazy', use_native: true });

export default lazyLoad;
