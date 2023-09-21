import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3.2.7/dist/vue.esm-browser.js';
import { GitHubUserInfo } from './github-user-info.js';

const app = createApp({
  setup() {
    // Use a ref to track the 'username' and 'user' data
    const defaultUsername = 'octocat'; // Default username
    const username = ref(''); // Initialize username as an empty string

    const user = ref(null);

    // Function to search for the user
    async function searchUser() {
      user.value = null; // Clear previous user data
      const response = await fetch(`https://api.github.com/users/${username.value || defaultUsername}`);
      if (response.ok) {
        user.value = await response.json();
      }
    }

    // Function to format date
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }

    // Call the searchUser function on component creation
    onMounted(searchUser);

    return {
      username,
      user,
      searchUser,
      formatDate,
      defaultUsername,
    };
  },
});

app.component("github-user-info", GitHubUserInfo);
app.mount("#app");
