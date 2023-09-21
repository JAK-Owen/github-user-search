// This is a Vue.js component for displaying GitHub user information.
export const GitHubUserInfo = {
  // HTML template for the component
  template: `
    <div>
      <!-- Input field for GitHub username -->
      <input v-model="username" placeholder="Enter GitHub username" @input="searchUser" />

      <!-- Display user information or loading/error messages -->
      <div v-if="user">

        <!-- User's name, fallback to 'Name not available' if not provided -->
        <h2>{{ user.name || 'Name not available' }}</h2>

        <!-- User's profile name, fallback to 'Profile name not available' -->
        <p>Profile Name: {{ user.login || 'Profile name not available' }}</p>

        <!-- User's bio, fallback to 'Bio not available' -->
        <p>Bio: {{ user.bio || 'Bio not available' }}</p>

        <!-- Date joined GitHub, fallback to 'Date joined not available' -->
        <p>Date Joined: {{ formatDate(user.created_at) || 'Date joined not available' }}</p>

        <!-- Number of public repositories, fallback to 'Repos not available' -->
        <p>Number of Repos: {{ user.public_repos || 'Repos not available' }}</p>

        <!-- Number of followers, fallback to 'Followers not available' -->
        <p>Number of Followers: {{ user.followers || 'Followers not available' }}</p>

        <!-- Number following, fallback to 'Following not available' -->
        <p>Number Following: {{ user.following || 'Following not available' }}</p>

        <!-- User's location, fallback to 'Location not available' -->
        <p>Location: {{ user.location || 'Location not available' }}</p>

        <!-- User's Twitter handle with a link, fallback to 'Twitter not available' -->
        <p>Twitter: <a :href="'https://twitter.com/' + user.twitter_username">{{ user.twitter_username || 'Twitter not available' }}</a></p>

        <!-- User's website with a link, fallback to '#' if not provided -->
        <p>Website: <a :href="user.blog || '#'">{{ user.blog || 'Website not available' }}</a></p>

        <!-- User's company, fallback to 'Company not available' -->
        <p>Company: {{ user.company || 'Company not available' }}</p>

      </div>
      <!-- Loading message while fetching data -->
      <div v-else-if="loading">Loading...</div>
      
      <!-- Error message if the user is not found or an error occurs -->
      <div v-else-if="error">User not found</div>
    </div>
  `,
  // Data properties for the component
  data() {
    return {
      // Stores the entered GitHub username
      username: "",
      // Stores the fetched user data
      user: null,
      // Indicates if data is being fetched
      loading: false,
      // Indicates if there's an error
      error: false,
    };
  },
  // Methods for the component
  methods: {
    // Method to fetch GitHub user data
    async searchUser() {
      // Show loading message
      this.loading = true;
      // Reset error flag
      this.error = false;
      try {
        // Fetch user data from GitHub API using the provided username
        const response = await fetch(`https://api.github.com/users/${this.username}`);
        if (response.ok) {
          // If successful, store the user data
          this.user = await response.json();
        } else {
          // If not successful, set the error flag
          this.error = true;
        }
      } catch (err) {
        // Handle any errors and set the error flag
        console.error(err);
        this.error = true;
      } finally {
        // Hide loading message when data fetching is complete
        this.loading = false;
      }
    },
    // Method to format a date string as a user-friendly date
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
