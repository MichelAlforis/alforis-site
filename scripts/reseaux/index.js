// Load environment variables from .env.local file

require('dotenv').config({ path: '.env.local' }); 
const inquirer = require('inquirer');
const linkedin = require('./linkedin');
const instagram = require('./instagram');
const facebook = require('./facebook');
const twitter = require('./twitter');
const googlemybusiness = require('./googlemybusiness');

const platformModules = {
  'LinkedIn': linkedin,
  'Instagram': instagram,
  'Facebook': facebook,
  'X (Twitter)': twitter,
  'Google My Business': googlemybusiness
};

async function main() {
  console.log('Welcome to the Social Media Poster!');
  let platform = ''; // Define platform outside try to be available in final log

  try {
    const platformAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'platform',
        message: 'Select the social media platform to post to:',
        choices: Object.keys(platformModules)
      }
    ]);
    platform = platformAnswer.platform;
    const selectedModule = platformModules[platform];
    let result = { success: false, message: 'Action cancelled or input not provided.' }; // Default result

    // URL validation function (basic)
    const isValidUrl = (urlString) => {
      if (!urlString || urlString.trim() === '') return 'URL cannot be empty.';
      try {
        new URL(urlString);
        return true;
      } catch (e) {
        return 'Please enter a valid URL (e.g., https://example.com)';
      }
    };

    if (platform === 'Google My Business') {
      const { message: gmbMessage } = await inquirer.prompt([
        { type: 'input', name: 'message', message: 'Enter summary for your GMB post:', validate: input => (input && input.trim() !== '') || 'Summary cannot be empty.' }
      ]);
      // Inquirer's behavior with validate means gmbMessage should have a value if we reach here.
      result = await selectedModule.createPost(gmbMessage);
    } else if (platform === 'LinkedIn') {
      const { postType } = await inquirer.prompt([
        { type: 'list', name: 'postType', message: 'LinkedIn - Select post type:', choices: ['Text Update', 'Article'] }
      ]);
      if (postType === 'Text Update') {
        const { message: liMessage } = await inquirer.prompt([
          { type: 'input', name: 'message', message: 'Enter text for LinkedIn update:', validate: input => (input && input.trim() !== '') || 'Text cannot be empty.' }
        ]);
        result = await selectedModule.postTextUpdate(liMessage);
      } else { // Article
        const articleDetails = await inquirer.prompt([
          { type: 'input', name: 'articleUrl', message: 'Enter article URL:', validate: isValidUrl },
          { type: 'input', name: 'title', message: 'Enter article title:', validate: input => (input && input.trim() !== '') || 'Title cannot be empty.' },
          { type: 'input', name: 'description', message: 'Enter article commentary/description:', validate: input => (input && input.trim() !== '') || 'Description cannot be empty.' }
        ]);
        result = await selectedModule.postArticle(articleDetails.articleUrl, articleDetails.title, articleDetails.description);
      }
    } else if (platform === 'Instagram') {
      const igDetails = await inquirer.prompt([
        { type: 'input', name: 'imageUrl', message: 'Enter IMAGE URL for Instagram (must be publicly accessible):', validate: isValidUrl },
        { type: 'input', name: 'caption', message: 'Enter caption for Instagram post:', validate: input => (input && input.trim() !== '') || 'Caption cannot be empty.' }
      ]);
      result = await selectedModule.postImage(igDetails.imageUrl, igDetails.caption);
    } else if (platform === 'Facebook') {
      const { fbPostType } = await inquirer.prompt([
        { type: 'list', name: 'fbPostType', message: 'Facebook - Select post type:', choices: ['Text Update', 'Link Post', 'Image Post'] }
      ]);
      if (fbPostType === 'Text Update') {
        const { message: fbMessage } = await inquirer.prompt([
          { type: 'input', name: 'message', message: 'Enter text for Facebook update:', validate: input => (input && input.trim() !== '') || 'Text cannot be empty.' }
        ]);
        result = await selectedModule.postTextUpdate(fbMessage);
      } else if (fbPostType === 'Link Post') {
        const fbLinkDetails = await inquirer.prompt([
          { type: 'input', name: 'linkUrl', message: 'Enter link URL:', validate: isValidUrl },
          { type: 'input', name: 'message', message: 'Enter message for link post:', validate: input => (input && input.trim() !== '') || 'Message cannot be empty.' }
        ]);
        result = await selectedModule.postLink(fbLinkDetails.linkUrl, fbLinkDetails.message);
      } else { // Image Post
        const fbImageDetails = await inquirer.prompt([
          { type: 'input', name: 'imageUrl', message: 'Enter IMAGE URL for Facebook (must be publicly accessible):', validate: isValidUrl },
          { type: 'input', name: 'caption', message: 'Enter caption for Facebook image:', validate: input => (input && input.trim() !== '') || 'Caption cannot be empty.' }
        ]);
        result = await selectedModule.postImage(fbImageDetails.imageUrl, fbImageDetails.caption);
      }
    } else if (platform === 'X (Twitter)') {
      const { message: tweetText } = await inquirer.prompt([
        { type: 'input', name: 'message', message: 'Enter your tweet text:', validate: input => (input && input.trim() !== '') || 'Tweet text cannot be empty.' }
      ]);
      result = await selectedModule.postTweet(tweetText);
    } else {
      console.log(`Platform ${platform} selected - No specific posting logic defined in index.js yet beyond placeholders.`);
      // result remains the default { success: false, message: '...' }
    }

    if (result.success) {
      console.log(`\n✅ Successfully posted to ${platform}!`);
      if (result.data) {
        if (result.data.id) console.log(`   Post ID: ${result.data.id}`);
        if (result.data.name) console.log(`   Resource Name: ${result.data.name}`);
      }
    } else {
      console.error(`\n❌ Failed to post to ${platform}.`);
      if (result.message) console.error(`   Reason: ${result.message}`);
      else console.error('   An unknown error occurred or action was cancelled by user.'); // More specific default
    }

  } catch (error) {
    console.error('\n🚨 An unexpected error occurred in the application:');
    console.error(error.message || error);
    // console.error(error.stack); // Potentially for dev debugging
  }

  console.log(`\nSocial media post attempt for ${platform || 'the selected platform'} concluded.`);
}

main().catch(error => {
  console.error('🚨 CRITICAL: Unhandled promise rejection in main():', error);
});
