/* eslint-disable import/no-extraneous-dependencies */

// SASS
import './sass/styles.scss';

// JavaScript
import Vue from 'vue';

import './js/scripts';
import './js/menu';
import Photography from './vue/photography.vue';

new Vue(Photography).$mount('#photography');
