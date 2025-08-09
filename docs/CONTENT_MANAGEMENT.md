# Content Management System

This document explains how to use the JSON-based content management system to easily update website content without modifying code.

## Overview

The content management system allows you to update:
- **Services** - Coaching services and programs
- **Testimonials** - Client success stories and reviews
- **Blog Posts** - Articles and resources
- **Site Configuration** - General site settings and navigation

## Content Files

All content is stored in JSON files located in `src/data/`:

```
src/data/
├── services.json       # Coaching services
├── testimonials.json   # Client testimonials
├── blog-posts.json     # Blog articles
└── site-config.json    # Site configuration
```

## Services Management

### File: `src/data/services.json`

Services are displayed on the main services section. Each service should have:

```json
{
  "id": "unique-service-id",
  "title": "Service Title",
  "description": "Brief description of the service",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "duration": "3 months",
  "price": "Starting at $297/month",
  "category": "individual",
  "targetAudience": "Target audience description",
  "callToAction": "Button text",
  "availability": true
}
```

**Field Descriptions:**
- `id`: Unique identifier (use kebab-case)
- `title`: Service name displayed to users
- `description`: Brief overview of the service
- `features`: Array of key features/benefits
- `duration`: How long the service takes
- `price`: Pricing information
- `category`: One of: "individual", "group", "workshop", "package"
- `targetAudience`: Who this service is for
- `callToAction`: Text for the action button
- `availability`: Set to `false` to hide the service

### Adding a New Service

1. Open `src/data/services.json`
2. Add a new service object to the array
3. Save the file
4. The website will automatically display the new service

## Testimonials Management

### File: `src/data/testimonials.json`

Testimonials appear in the success stories section:

```json
{
  "id": "unique-testimonial-id",
  "clientName": "Client Name",
  "content": "The testimonial content...",
  "outcome": "What the client achieved",
  "rating": 5,
  "clientTitle": "Client's Job Title",
  "location": "City, State",
  "serviceUsed": "Which service they used",
  "featured": true,
  "dateGiven": "2024-01-15T00:00:00.000Z"
}
```

**Field Descriptions:**
- `id`: Unique identifier
- `clientName`: Client's name (can be anonymized)
- `content`: The testimonial text
- `outcome`: Optional - specific result achieved
- `rating`: 1-5 star rating (optional)
- `clientTitle`: Client's professional title
- `location`: Client's location
- `serviceUsed`: Which service they used
- `featured`: Set to `true` to highlight this testimonial
- `dateGiven`: ISO date string when testimonial was given

## Blog Posts Management

### File: `src/data/blog-posts.json`

Blog posts appear in the resources section:

```json
{
  "id": "unique-post-id",
  "title": "Blog Post Title",
  "excerpt": "Brief summary of the post...",
  "content": "Full post content (optional)",
  "publishDate": "2024-01-15T00:00:00.000Z",
  "category": "career-transition",
  "featured": true,
  "author": "Author Name",
  "tags": ["tag1", "tag2", "tag3"],
  "readTime": 8,
  "status": "published",
  "featuredImage": "https://example.com/image.jpg"
}
```

**Field Descriptions:**
- `id`: Unique identifier (use kebab-case)
- `title`: Post title
- `excerpt`: Brief summary for previews
- `content`: Full post content (can be empty)
- `publishDate`: ISO date string
- `category`: Post category (see categories below)
- `featured`: Set to `true` to feature this post
- `author`: Author name
- `tags`: Array of relevant tags
- `readTime`: Estimated reading time in minutes
- `status`: "published", "draft", or "archived"
- `featuredImage`: Optional image URL

**Available Categories:**
- `career-transition`
- `work-life-balance`
- `personal-development`
- `success-stories`
- `tips-advice`
- `industry-insights`

## Site Configuration

### File: `src/data/site-config.json`

General site settings and information:

```json
{
  "siteName": "Site Name",
  "tagline": "Site tagline",
  "description": "Site description",
  "author": {
    "name": "Author Name",
    "title": "Professional Title",
    "bio": "Author biography",
    "photo": "/path/to/photo.jpg",
    "credentials": ["Credential 1", "Credential 2"]
  },
  "contact": {
    "email": "coaching@andreagray.de",
    "phone": "+49 176 64022283",
    "address": {
      "city": "Strasskirchen",
      "state": "Bavaria, Germany"
    },
    "socialMedia": [
      {
        "platform": "linkedin",
        "url": "https://linkedin.com/in/profile",
        "label": "Connect on LinkedIn"
      }
    ]
  },
  "navigation": [
    {
      "id": "home",
      "label": "Home",
      "href": "#hero"
    }
  ]
}
```

## Content Validation

The system automatically validates content when it loads:

- **Services**: Checks for required fields and valid categories
- **Testimonials**: Validates ratings (1-5) and required fields
- **Blog Posts**: Ensures published posts have required fields
- **Site Config**: Validates essential configuration

Validation warnings appear in the browser console if there are issues.

## Best Practices

### Content Writing
- Keep service descriptions concise but informative
- Use bullet points for features to improve readability
- Write testimonials in the client's voice
- Use clear, benefit-focused language

### SEO Optimization
- Include relevant keywords in titles and descriptions
- Use descriptive file names for images
- Keep excerpts under 160 characters for better search previews
- Add relevant tags to blog posts

### Image Guidelines
- Use high-quality images (minimum 600px wide)
- Optimize images for web (compress file sizes)
- Use descriptive alt text for accessibility
- Consider using a CDN for better performance

### Content Organization
- Use consistent naming conventions for IDs
- Group related content logically
- Keep featured content fresh and relevant
- Archive outdated content rather than deleting

## Demo Script

A demo script is available to show how easy content updates are:

```bash
# Run the demo (adds sample content)
node scripts/update-content-demo.js

# Clean up demo content
node scripts/update-content-demo.js cleanup
```

## Troubleshooting

### Content Not Appearing
1. Check the JSON syntax is valid
2. Ensure required fields are present
3. Check the browser console for validation errors
4. Verify the file is saved properly

### Validation Errors
- Check field names match the expected format
- Ensure dates are in ISO format
- Verify category values are from the allowed list
- Check that arrays contain the expected data types

### Performance Issues
- Limit the number of featured items
- Optimize image sizes
- Consider pagination for large content sets

## Testing

The content management system includes comprehensive integration tests that validate:

- **Content Loading**: All JSON files load correctly and return expected data structures
- **Data Validation**: Content structure matches TypeScript interfaces
- **Error Handling**: Graceful handling of missing or malformed content
- **Type Safety**: Proper typing for all content models
- **Performance**: Efficient loading and caching of content

### Running Content Tests

```bash
# Run all tests including content management
npm run test

# Run only content management tests
npm run test -- contentManager
```

The integration tests automatically verify:
- Services have required fields (id, title, description, features)
- Testimonials include proper client information and ratings (1-5 scale)
- Blog posts have valid publish dates and published status
- Site configuration contains essential contact and navigation data

## Technical Details

The content management system uses:
- **Dynamic imports** for loading JSON files
- **Caching** to improve performance
- **Validation** to ensure data integrity
- **Error handling** for graceful failures
- **TypeScript interfaces** for type safety
- **Integration testing** for content validation and loading workflows

Content is loaded asynchronously and cached in memory for optimal performance. The system handles loading states and error conditions gracefully, with comprehensive test coverage ensuring reliability.