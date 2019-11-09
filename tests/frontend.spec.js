const fs = require('fs');
const request = require('supertest');
const { expect } = require('chai');
const cheerio = require('cheerio');

const globalCSS = fs.readFileSync('./src/public/sass/global.css', 'utf-8');

const app = require('../src/app');

const { mockedProjects } = require('./mocks/projects');

describe('Frontend', () => {
  it('Got correct content for home page', async () => request(app)
    .get('/')
    .set('Accept', 'text/html')
    .then((result) => {
      const { status, type, text } = result;

      expect(status).to.equal(200);
      expect(type).to.equal('text/html');

      const [featured, item1, item2, item3] = mockedProjects;
      const $ = cheerio.load(text);

      expect($('body > style').attr('type')).to.equal('text/css');
      expect($('body > style').attr('media')).to.equal('screen');
      expect($('body > style').html()).to.equal(globalCSS);

      expect($('.global-header .nav li').eq(0).find('a').hasClass('current')).to.equal(true);
      expect($('.outer-menu .nav li').eq(0).find('a').hasClass('current')).to.equal(true);
      expect($('main').hasClass('home')).to.equal(true);

      expect($('.home .featured h2').text()).to.equal(featured.title);
      expect($('.home .featured p').text()).to.equal(featured.description);
      expect($('.home .featured .links .link').eq(0).attr('href')).to.equal(`/projects/${featured.key}`);
      expect($('.home .featured .links .link').eq(1).attr('href')).to.equal(featured.websiteURL);
      $('.home .featured .technologies li').each((index, element) => {
        expect($(element).text()).to.equal(featured.technologies[index]);
      });
      expect($('.home .featured .preview').attr('href')).to.equal(`/projects/${featured.key}`);
      expect($('.home .featured .preview .preview-image').attr('alt')).to.equal(`Preview image for the ${featured.title} project.`);
      expect($('.home .featured .preview .preview-image').attr('data-src')).to.equal(featured.previewImage);

      const project1 = $('.home .list > .project').eq(0);
      expect(project1.find('.preview').attr('href')).to.equal(`/projects/${item1.key}`);
      expect(project1.find('.preview .preview-image').attr('alt')).to.equal(`Preview image for the ${item1.title} project.`);
      expect(project1.find('.preview .preview-image').attr('data-src')).to.equal(item1.previewImage);
      expect(project1.find('h2').text()).to.equal(item1.title);
      expect(project1.find('p').text()).to.equal(item1.description);
      expect(project1.find('.links .link').eq(0).attr('href')).to.equal(`/projects/${item1.key}`);
      expect(project1.find('.links .link').eq(1).length).to.equal(0);
      project1.find('.technologies li').each((index, element) => {
        expect($(element).text()).to.equal(item1.technologies[index]);
      });

      const project2 = $('.home .list > .project').eq(1);
      expect(project2.find('.preview').attr('href')).to.equal(`/projects/${item3.key}`);
      expect(project2.find('.preview .preview-image').attr('alt')).to.equal(`Preview image for the ${item3.title} project.`);
      expect(project2.find('.preview .preview-image').attr('data-src')).to.equal(item3.previewImage);
      expect(project2.find('h2').text()).to.equal(item3.title);
      expect(project2.find('p').text()).to.equal(item3.description);
      expect(project2.find('.links .link').eq(0).attr('href')).to.equal(`/projects/${item3.key}`);
      expect(project2.find('.links .link').eq(1).attr('href')).to.equal(item3.websiteURL);
      project2.find('.technologies li').each((index, element) => {
        expect($(element).text()).to.equal(item3.technologies[index]);
      });

      expect($('.home .list').html()).to.not.have.string(item2.title);
    }));

  it('Got correct content for project page', async () => request(app)
    .get('/projects/tng-fintech-website')
    .set('Accept', 'text/html')
    .then((result) => {
      const { status, type, text } = result;

      expect(status).to.equal(200);
      expect(type).to.equal('text/html');

      const {
        key,
        title,
        description,
        technologies,
        responsibilities,
        websiteURL,
        previewImage,
        started,
        ended,
      } = mockedProjects[0];

      const $ = cheerio.load(text);

      expect($('body > style').attr('type')).to.equal('text/css');
      expect($('body > style').attr('media')).to.equal('screen');
      expect($('body > style').html()).to.equal(globalCSS);

      expect($('head title').text()).to.have.string(title);
      expect($('head meta[name="description"]').attr('content')).to.have.string(description);
      expect($('head meta[name="subject"]').attr('content')).to.have.string(description);
      expect($('head meta[property="og:url"]').attr('content')).to.have.string(key);
      expect($('head meta[property="og:title"]').attr('content')).to.have.string(title);
      expect($('head meta[property="og:description"]').attr('content')).to.have.string(title);
      expect($('head meta[property="og:description"]').attr('content')).to.have.string(description);
      expect($('head meta[property="og:image"]').attr('content')).to.equal(previewImage);
      expect($('head meta[name="twitter:site"]').attr('content')).to.have.string(key);
      expect($('head meta[name="twitter:title"]').attr('content')).to.have.string(title);
      expect($('head meta[name="twitter:description"]').attr('content')).to.have.string(description);
      expect($('head meta[name="twitter:image"]').attr('content')).to.equal(previewImage);

      expect($('.global-header .nav li').eq(0).find('a').hasClass('current')).to.equal(true);
      expect($('.outer-menu .nav li').eq(0).find('a').hasClass('current')).to.equal(true);
      expect($('main').hasClass('project')).to.equal(true);

      expect($('.project-header').hasClass(key)).to.equal(true);
      expect($('.project-header h2').text()).to.equal(title);
      expect($('.project-header p').text()).to.equal(description);
      expect($('.project-header ul li').eq(0).text()).to.have.string(responsibilities);
      expect($('.project-header ul li').eq(1).text()).to.have.string(technologies.join(', '));
      expect($('.project-header ul li').eq(2).text()).to.have.string(started.toLocaleDateString('en', { month: 'long', year: 'numeric' }));
      expect($('.project-header ul li').eq(2).text()).to.have.string(ended.toLocaleDateString('en', { month: 'long', year: 'numeric' }));
      expect($('.project-header .links a').attr('href')).to.equal(websiteURL);
      expect($('.project-content').hasClass(key)).to.equal(true);
    }));

  it('Got correct response for non-existing project page', async () => request(app)
    .get('/projects/should-not-exist')
    .set('Accept', 'text/html')
    .then((result) => {
      const { status, type } = result;

      expect(status).to.equal(404);
      expect(type).to.equal('text/html');
    }));

  it('Got correct content for photography page', async () => request(app)
    .get('/photography')
    .set('Accept', 'text/html')
    .then((result) => {
      const { status, type, text } = result;

      expect(status).to.equal(200);
      expect(type).to.equal('text/html');

      const $ = cheerio.load(text);

      expect($('body > style').attr('type')).to.equal('text/css');
      expect($('body > style').attr('media')).to.equal('screen');
      expect($('body > style').html()).to.equal(globalCSS);

      expect($('body > style').attr('type')).to.equal('text/css');
      expect($('body > style').attr('media')).to.equal('screen');
      expect($('body > style').html()).to.equal(globalCSS);

      expect($('.global-header .nav li').eq(1).find('a').hasClass('current')).to.equal(true);
      expect($('.outer-menu .nav li').eq(1).find('a').hasClass('current')).to.equal(true);
      expect($('main').hasClass('photography')).to.equal(true);
    }));

  it('Got correct content for about page', async () => request(app)
    .get('/about')
    .set('Accept', 'text/html')
    .then((result) => {
      const { status, type, text } = result;

      expect(status).to.equal(200);
      expect(type).to.equal('text/html');

      const $ = cheerio.load(text);

      expect($('body > style').attr('type')).to.equal('text/css');
      expect($('body > style').attr('media')).to.equal('screen');
      expect($('body > style').html()).to.equal(globalCSS);

      expect($('.global-header .nav li').eq(2).find('a').hasClass('current')).to.equal(true);
      expect($('.outer-menu .nav li').eq(2).find('a').hasClass('current')).to.equal(true);
      expect($('main').hasClass('about')).to.equal(true);
    }));
});
