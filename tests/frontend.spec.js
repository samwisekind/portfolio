const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const request = require('supertest');
const cheerio = require('cheerio');

const globalCSS = fs.readFileSync('./src/public/sass/global.css', 'utf-8');

const app = require('../src/app');

const { Project } = require('../src/models/project');
const { mockedProjects } = require('./mocks/projects');

let database;

beforeAll(async () => {
  database = new MongoMemoryServer();
  await mongoose.connect(await database.getConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await Promise.all([
    Project.collection.insertMany(mockedProjects),
  ]);
});

afterAll(() => {
  mongoose.disconnect();
  database.stop();
});

describe('Frontend', () => {
  it('Got correct content for home page', async (done) => {
    const result = await request(app)
      .get('/')
      .set('Accept', 'text/html');

    const { status, type, text } = result;

    expect(status).toBe(200);
    expect(type).toBe('text/html');

    const [featured, item1, , item3] = mockedProjects;
    const $ = cheerio.load(text);

    expect($('head > style[type="text/css"]').attr('type')).toBe('text/css');
    expect($('head > style[type="text/css"]').attr('media')).toBe('screen');
    expect($('head > style[type="text/css"]').html()).toBe(globalCSS);

    expect($('.global-header .nav li').eq(0).find('a').hasClass('current')).toBe(true);
    expect($('.outer-menu .nav li').eq(0).find('a').hasClass('current')).toBe(true);
    expect($('main').hasClass('home')).toBe(true);

    expect($('.home .featured h2').text()).toBe(featured.title);
    expect($('.home .featured p').text()).toBe(featured.description);
    expect($('.home .featured .links .link').eq(0).attr('href')).toBe(`/projects/${featured.key}`);
    expect($('.home .featured .links .link').eq(1).attr('href')).toBe(featured.websiteURL);
    $('.home .featured .technologies li').each((index, element) => {
      expect($(element).text()).toBe(featured.technologies[index]);
    });
    expect($('.home .featured .preview').attr('href')).toBe(`/projects/${featured.key}`);
    expect($('.home .featured .preview .preview-image').attr('alt')).toBe(`Preview image for the ${featured.title} project.`);
    expect($('.home .featured .preview .preview-image').attr('data-src')).toBe(featured.previewImage);

    const project1 = $('.home .list > .project').eq(0);
    expect(project1.find('.preview').attr('href')).toBe(`/projects/${item1.key}`);
    expect(project1.find('.preview .preview-image').attr('alt')).toBe(`Preview image for the ${item1.title} project.`);
    expect(project1.find('.preview .preview-image').attr('data-src')).toBe(item1.previewImage);
    expect(project1.find('h2').text()).toBe(item1.title);
    expect(project1.find('p').text()).toBe(item1.description);
    expect(project1.find('.links .link').eq(0).attr('href')).toBe(`/projects/${item1.key}`);
    expect(project1.find('.links .link').eq(1).length).toBe(0);
    project1.find('.technologies li').each((index, element) => {
      expect($(element).text()).toBe(item1.technologies[index]);
    });

    const project2 = $('.home .list > .project').eq(1);
    expect(project2.find('.preview').attr('href')).toBe(`/projects/${item3.key}`);
    expect(project2.find('.preview .preview-image').attr('alt')).toBe(`Preview image for the ${item3.title} project.`);
    expect(project2.find('.preview .preview-image').attr('data-src')).toBe(item3.previewImage);
    expect(project2.find('h2').text()).toBe(item3.title);
    expect(project2.find('p').text()).toBe(item3.description);
    expect(project2.find('.links .link').eq(0).attr('href')).toBe(`/projects/${item3.key}`);
    expect(project2.find('.links .link').eq(1).attr('href')).toBe(item3.websiteURL);
    project2.find('.technologies li').each((index, element) => {
      expect($(element).text()).toBe(item3.technologies[index]);
    });

    done();
  });

  it('Got correct content for project page', async (done) => {
    const result = await request(app)
      .get('/projects/tng-fintech-website')
      .set('Accept', 'text/html');

    const { status, type, text } = result;

    expect(status).toBe(200);
    expect(type).toBe('text/html');

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

    expect($('head > style[type="text/css"]').attr('type')).toBe('text/css');
    expect($('head > style[type="text/css"]').attr('media')).toBe('screen');
    expect($('head > style[type="text/css"]').html()).toBe(globalCSS);

    expect($('head title').text()).toEqual(expect.stringContaining(title));
    expect($('head meta[name="description"]').attr('content')).toEqual(expect.stringContaining(description));
    expect($('head meta[name="subject"]').attr('content')).toEqual(expect.stringContaining(description));
    expect($('head meta[property="og:url"]').attr('content')).toEqual(expect.stringContaining(key));
    expect($('head meta[property="og:title"]').attr('content')).toEqual(expect.stringContaining(title));
    expect($('head meta[property="og:description"]').attr('content')).toEqual(expect.stringContaining(title));
    expect($('head meta[property="og:description"]').attr('content')).toEqual(expect.stringContaining(description));
    expect($('head meta[property="og:image"]').attr('content')).toEqual(expect.stringContaining(previewImage));
    expect($('head meta[name="twitter:site"]').attr('content')).toEqual(expect.stringContaining(key));
    expect($('head meta[name="twitter:title"]').attr('content')).toEqual(expect.stringContaining(title));
    expect($('head meta[name="twitter:description"]').attr('content')).toEqual(expect.stringContaining(description));
    expect($('head meta[name="twitter:image"]').attr('content')).toEqual(previewImage);

    expect($('.global-header .nav li').eq(0).find('a').hasClass('current')).toBe(true);
    expect($('.outer-menu .nav li').eq(0).find('a').hasClass('current')).toBe(true);
    expect($('main').hasClass('project')).toBe(true);

    expect($('.project-header').hasClass(key)).toBe(true);
    expect($('.project-header h2').text()).toBe(title);
    expect($('.project-header p').text()).toBe(description);
    expect($('.project-header ul li').eq(0).text()).toEqual(expect.stringContaining(responsibilities));
    expect($('.project-header ul li').eq(1).text()).toEqual(expect.stringContaining(technologies.join(', ')));
    expect($('.project-header ul li').eq(2).text()).toEqual(expect.stringContaining(started.toLocaleDateString('en', { month: 'long', year: 'numeric' })));
    expect($('.project-header ul li').eq(2).text()).toEqual(expect.stringContaining(ended.toLocaleDateString('en', { month: 'long', year: 'numeric' })));
    expect($('.project-header .links a').attr('href')).toBe(websiteURL);
    expect($('.project-content').hasClass(key)).toBe(true);

    done();
  });

  it('Got correct response for non-existing project page', async (done) => {
    const result = await request(app)
      .get('/projects/should-not-exist')
      .set('Accept', 'text/html');

    const { status, type } = result;

    expect(status).toBe(404);
    expect(type).toBe('text/html');

    done();
  });

  it('Got correct content for photography page', async (done) => {
    const result = await request(app)
      .get('/photography')
      .set('Accept', 'text/html');

    const { status, type, text } = result;

    expect(status).toBe(200);
    expect(type).toBe('text/html');

    const $ = cheerio.load(text);

    expect($('head > style[type="text/css"]').attr('type')).toBe('text/css');
    expect($('head > style[type="text/css"]').attr('media')).toBe('screen');
    expect($('head > style[type="text/css"]').html()).toBe(globalCSS);

    expect($('head > style[type="text/css"]').attr('type')).toBe('text/css');
    expect($('head > style[type="text/css"]').attr('media')).toBe('screen');
    expect($('head > style[type="text/css"]').html()).toBe(globalCSS);

    expect($('.global-header .nav li').eq(1).find('a').hasClass('current')).toBe(true);
    expect($('.outer-menu .nav li').eq(1).find('a').hasClass('current')).toBe(true);
    expect($('main').hasClass('photography')).toBe(true);

    done();
  });

  it('Got correct content for about page', async (done) => {
    const result = await request(app)
      .get('/about')
      .set('Accept', 'text/html');


    const { status, type, text } = result;

    expect(status).toBe(200);
    expect(type).toBe('text/html');

    const $ = cheerio.load(text);

    expect($('head > style[type="text/css"]').attr('type')).toBe('text/css');
    expect($('head > style[type="text/css"]').attr('media')).toBe('screen');
    expect($('head > style[type="text/css"]').html()).toBe(globalCSS);

    expect($('.global-header .nav li').eq(2).find('a').hasClass('current')).toBe(true);
    expect($('.outer-menu .nav li').eq(2).find('a').hasClass('current')).toBe(true);
    expect($('main').hasClass('about')).toBe(true);

    done();
  });
});
