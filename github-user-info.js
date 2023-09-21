export const GitHubUserInfo = {
  template: `
    <div>
      <input v-model="username" placeholder="Enter GitHub username" @input="searchUser" />
      <div v-if="user">
        <h2>{{ user.name || 'Name not available' }}</h2>
        <p>Profile Name: {{ user.login || 'Profile name not available' }}</p>
        <p>Bio: {{ user.bio || 'Bio not available' }}</p>
        <p>Date Joined: {{ formatDate(user.created_at) || 'Date joined not available' }}</p>
        <p>Number of Repos: {{ user.public_repos || 'Repos not available' }}</p>
        <p>Number of Followers: {{ user.followers || 'Followers not available' }}</p>
        <p>Number Following: {{ user.following || 'Following not available' }}</p>
        <p>Location: {{ user.location || 'Location not available' }}</p>
        <p>Twitter: <a :href="'https://twitter.com/' + user.twitter_username">{{ user.twitter_username || 'Twitter not available' }}</a></p>
        <p>Website: <a :href="user.blog || '#'">{{ user.blog || 'Website not available' }}</a></p>
        <p>Company: {{ user.company || 'Company not available' }}</p>
      </div>
      <div v-else-if="loading">Loading...</div>
      <div v-else-if="error">
        <!-- Display a custom error message for 404 Not Found -->
        {{ errorMessage }}
      </div>
    </div>
  `,
  data() {
    return {
      username: "",
      user: null,
      loading: false,
      // Initialize error flag to false
      error: false,
      // Initialize error message
      errorMessage: "",
    };
  },
  methods: {
    async searchUser() {
      this.loading = true;
      // Reset error flag and message
      this.error = false;
      this.errorMessage = "";
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}`);
        if (response.ok) {
          this.user = await response.json();
        } else if (response.status === 404) {
          // Set error flag and provide a custom error message
          this.error = true;
          this.errorMessage = "User not found on GitHub";
        } else {
          // Set error flag for other API errors
          this.error = true;
          this.errorMessage = "An error occurred while fetching data from GitHub";
        }
      } catch (err) {
        console.error(err);
        // Set error flag for network or other errors
        this.error = true;
        // Provide a custom error message for network errors
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
};
