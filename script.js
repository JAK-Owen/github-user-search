import { createApp, ref } from 'https://unpkg.com/vue@3.2.7/dist/vue.esm-browser.js';
import { GitHubUserInfo } from './github-user-info.js';

const app = createApp({
  setup() {
    // Use a ref to track the 'username' and 'user' data
    const username = ref('');
    const user = ref(null);

    // Function to search for the user
    async function searchUser() {
      user.value = null; // Clear previous user data
      const response = await fetch(`https://api.github.com/users/${username.value}`);
      if (response.ok) {
        user.value = await response.json();
      }
    }

    // Function to format date
    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }

    return {
      username,
      user,
      searchUser,
      formatDate,
    };
  },
});

app.component("github-user-info", GitHubUserInfo);
app.mount("#app");
