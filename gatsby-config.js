module.exports = {
  siteMetadata: {
    navbarLinks: [
      { to: '/about', name: 'about' },
      { to: '/episodes', name: 'episodes' },
      { to: '/contact', name: 'contact' }
    ],
    title: 'Poor People',
    description:
      'Poor People is a platform for new generation people of color to discuss their socioeconomic backgrounds and to share stories and financial experiences of today.',
    siteUrl: 'https://poor-people.netlify.com',
    homepageHeader: 'Poor People Podcast',
    homepageAbout:
      'Poor People is a platform for new generation people of color to discuss their socioeconomic backgrounds and to share stories and financial experiences of today.',
    mailChimpUrl:
      'https://gmail.us4.list-manage.com/subscribe/post?u=1d6dfdbdc85da3734b4c7a9ec&amp;id=322edcc0bc',
    mailChimpToken: 'b_1d6dfdbdc85da3734b4c7a9ec_322edcc0bc',
    youtube: 'https://www.youtube.com/channel/UC3f4S1vWhbjSJNU2w6wKRRg', // YOUR YOUTUBE PROFILE HERE
    github: '', // YOUR GITHUB PROFILE HERE
    pinterest: 'https://www.pinterest.com/poorpeoplepodcast', // YOUR PINTEREST PROFILE HERE
    instagram: 'https://www.instagram.com/poorpeoplepodcast', // YOUR IG PROFILE HERE
    facebook: 'https://www.facebook.com/poorpeoplepodcast', // YOUR FACEBOOK PROFILE HERE
    twitter: 'https://twitter.com/PoorPeoplePod', // YOUR TWITTER PROFILE HERE
    anchor: 'https://anchor.fm/poorpeople'
  },
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }]
                });
              });
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {frontmatter: {type: {eq: "post"}}}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      slug
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'Gatsby RSS Feed'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1400
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Karla', 'Playfair Display', 'Lora']
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '',
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ['/success'],
        cookieDomain: 'tyra-starter.netlify.com'
      }
    }
  ]
};
