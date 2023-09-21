// Import necessary Vue.js modules and a custom component
import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3.2.7/dist/vue.esm-browser.js';
import { GitHubUserInfo } from './github-user-info.js';

// Create a Vue.js application
const app = createApp({
  setup() {
    // Initialize default GitHub username
    const defaultUsername = 'octocat';

    // Track user input for GitHub username
    const username = ref('');

    // Store user data fetched from GitHub
    const user = ref(null);

    // Store error flag and error message
    const error = ref(false);
    const errorMessage = ref('');

    // Function to fetch user data from GitHub API
    async function searchUser() {
      user.value = null; // Clear previous user data
      error.value = false; // Reset error flag
      errorMessage.value = ''; // Reset error message

      const response = await fetch(`https://api.github.com/users/${username.value || defaultUsername}`);
      if (response.ok) {
        user.value = await response.json(); // Update user data if request is successful
      } else {
        // If the request is not successful, set user data to null and display an error message
        user.value = null;
        error.value = true;
        errorMessage.value = 'Failed to fetch user data from GitHub';
        console.error(`GitHub API request failed with status: ${response.status}`);
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
