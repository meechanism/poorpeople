# Poor People Podcast

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://shields.io/)

Source code for the Poor People Podcast website.

## Getting Started

1. Clone repo
2. Install dependencies:

```sh
  yarn install
```

3. To develop:

```sh
  yarn develop
```

4. To build:

```sh
yarn build
```

## Adding your Content

This project uses markdown for writing episode posts, and follows a simple template for adding new posts.

To add a new episode post, create a file `filename.md` in `content/posts/` with the following:

```markdown
---
type: 'post'
title: 'My Awesome Post Title'
author: 'My Name'
category: 'My Category'
date: '2019-01-05'
slug: '/my-awesome-post'
postImage: './img/myimage.jpg'
metaDescription: 'This is my first awesome and cool post!!!'
---

You can write your post here using markdown! Link to images in the `img` folder using this syntax:

![Alt Text](./img/my-image.jpeg)
```

Images for posts are stored in `content/posts/img/`. Images in the frontmatter will be used as thumbnails for the articles, as well as in search results.

## Content Directories

- `/content/episodes`: meant for containing pages for episodes
- `/content/posts`: blog-like content for non-episode notes and updates for project

## Templates

These are specifically used with the Gatsby API to create pages. The name is not a React construct.

# Credits and Resources

- [GatsbyJS](https://www.gatsbyjs.org/) team for creating an amazing platform.
- [Netlify](https://www.netlify.com/) for making static site hosting even easier.
- [Pexels](https://pexels.com/) and the Free Photography Community.
