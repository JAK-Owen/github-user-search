import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3.2.7/dist/vue.esm-browser.js';
import { GitHubUserInfo } from './github-user-info.js';

// Create a Vue.js application
const app = createApp({
  setup() {
    // Initialize default GitHub username
    const defaultUsername = 'octocat';

    // Track user input for GitHub username using a "ref" reactive property
    const username = ref('');

    // Store user data fetched from GitHub using a "ref" reactive property
    const user = ref(null);

    // Store error flag and error message using "ref" reactive properties
    const error = ref(false);
    const errorMessage = ref('');

    // Function to fetch user data from GitHub API
    async function searchUser() {
      // Clear previous user data and reset error flags and messages
      user.value = null;
      error.value = false;
      errorMessage.value = '';

      // Fetch user data from the GitHub API based on the entered username
      try {
        const response = await fetch(`https://api.github.com/users/${username.value || defaultUsername}`);

        if (response.status === 200) {
          // If the request is successful (status code 200), update the user data
          user.value = await response.json();
        } else {
          // If the request is not successful (status code other than 200), handle the error
          error.value = true;
          errorMessage.value = 'Failed to fetch user data from GitHub';
          console.error(`GitHub API request failed with status: ${response.status}`);
        }
      } catch (e) {
        // Handle network errors or other exceptions
        error.value = true;
        errorMessage.value = 'An error occurred while fetching user data from GitHub';
        console.error('An error occurred:', e);
      }
    }

    // Function to format dates
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }

    // Call the searchUser function when the component is mounted
    onMounted(searchUser);

    // Return data and functions for the Vue.js component
    return {
      username,           // User input field
      user,               // GitHub user data
      error,              // Error flag
      errorMessage,       // Error message
      searchUser,         // Function to fetch user data
      formatDate,         // Function to format dates
      defaultUsername,    // Default GitHub username
    };
  },
});

// Register a custom component for displaying GitHub user info
app.component("github-user-info", GitHubUserInfo);

// Mount the Vue.js application to an HTML element with the ID 'app'
app.mount("#app");
