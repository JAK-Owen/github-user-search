// Merged File

import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3.2.7/dist/vue.esm-browser.js';

const app = createApp({
  setup() {
    const defaultUsername = 'octocat';
    const username = ref('');
    const user = ref(null);
    const error = ref(false);
    const errorMessage = ref('');

    async function searchUser() {
      user.value = null;
      error.value = false;
      errorMessage.value = '';

      try {
        const response = await fetch(`https://api.github.com/users/${username.value || defaultUsername}`);

        if (response.status === 200) {
          user.value = await response.json();
        } else {
          error.value = true;
          errorMessage.value = 'Failed to fetch user data from GitHub';
          console.error(`GitHub API request failed with status: ${response.status}`);
        }
      } catch (e) {
        error.value = true;
        errorMessage.value = 'An error occurred while fetching user data from GitHub';
        console.error('An error occurred:', e);
      }
    }

    function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }

    onMounted(searchUser);

    return {
      username,
      user,
      error,
      errorMessage,
      searchUser,
      formatDate,
      defaultUsername,
    };
  },
});

app.component("github-user-info", {
  template: `
    <div>
      <!-- Template content as provided in the first file -->
    </div>
  `,
  data() {
    return {
      username: "",
      user: null,
      loading: false,
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    async searchUser() {
      this.loading = true;
      this.error = false;
      this.errorMessage = "";

      try {
        const response = await fetch(`https://api.github.com/users/${this.username}`);
        
        if (response.ok) {
          this.user = await response.json();
        } else if (response.status === 404) {
          this.error = true;
          this.errorMessage = "User not found on GitHub";
        } else {
          this.error = true;
          this.errorMessage = "An error occurred while fetching data from GitHub";
        }
      } catch (err) {
        console.error(err);
        this.error = true;
        this.errorMessage = "An error occurred while making the request";
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
});

app.mount("#app");
