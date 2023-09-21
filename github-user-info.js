export const GitHubUserInfo = {
  template: `
    <div>
      <!-- Input field for GitHub username -->
      <input v-model="username" placeholder="Enter GitHub username" @input="searchUser" />
      
      <!-- Display user information or loading/error messages -->
      <div v-if="user">
        <!-- User's name or 'Name not available' if not provided -->
        <h1>{{ user.name || 'Name not available' }}</h1>
        
        <!-- User's profile name or 'Profile name not available' -->
        <h4>Profile Name: {{ user.login || 'Profile name not available' }}</h4>
        
        <!-- User's bio or 'Bio not available' -->
        <h4>Bio: {{ user.bio || 'Bio not available' }}</h4>
        
        <!-- Date joined GitHub or 'Date joined not available' -->
        <h3>Date Joined: {{ formatDate(user.created_at) || 'Date joined not available' }}</h3>
        
        <!-- Number of public repositories or 'Repos not available' -->
        <div class="column">
          <h4>Repos</h4>
          <p class="numeric-field">{{ user.public_repos || 'Repos not available' }}</p>
        </div>
        
        <!-- Number of followers or 'Followers not available' -->
        <div class="column">
          <h4>Followers</h4>
          <p class="numeric-field">{{ user.followers || 'Followers not available' }}</p>
        </div>
        
        <!-- Number of following or 'Following not available' -->
        <div class="column">
          <h4>Following</h4>
          <p class="numeric-field">{{ user.following || 'Following not available' }}</p>
        </div>

        <!-- User's location or 'Location not available' -->
        <p>Location: {{ user.location || 'Location not available' }}</p>

        <!-- User's Twitter handle with a link or 'Twitter not available' -->
        <p>Twitter: <a :href="'https://twitter.com/' + (user.twitter_username || '')">{{ user.twitter_username || 'Twitter not available' }}</a></p>

        <!-- User's website with a link or 'Website not available' -->
        <p>Website: <a :href="user.blog || '#'">{{ user.blog || 'Website not available' }}</a></p>

        <!-- User's company or 'Company not available' -->
        <p>Company: {{ user.company || 'Company not available' }}</p>
      </div>
      
      <!-- Display 'Loading...' while fetching data -->
      <div v-else-if="loading">Loading...</div>
      
      <!-- Display a custom error message when an error occurs -->
      <div v-else-if="error">
        {{ errorMessage }}
      </div>
      
      <!-- Display fallback content if user info is not available -->
      <div v-else>
        Fallback content when user info is not available.
      </div>
    </div>
  `,
  data() {
    return {
      // Data properties
      username: "",     // Stores the entered GitHub username
      user: null,       // Stores the fetched user data
      loading: false,   // Indicates if data is being fetched
      error: false,     // Indicates if there's an error
      errorMessage: "", // Stores custom error messages
    };
  },
  methods: {
    // Method to fetch GitHub user data
    async searchUser() {
      // Show loading message
      this.loading = true;
      // Reset error flag and message
      this.error = false;
      this.errorMessage = "";

      try {
        // Fetch user data from GitHub API using the provided username
        const response = await fetch(`https://api.github.com/users/${this.username}`);
        
        if (response.ok) {
          // If successful, store the user data
          this.user = await response.json();
        } else if (response.status === 404) {
          // If user not found, set error flag and provide a custom error message
          this.error = true;
          this.errorMessage = "User not found on GitHub";
        } else {
          // If other API errors, set error flag and provide a custom error message
          this.error = true;
          this.errorMessage = "An error occurred while fetching data from GitHub";
        }
      } catch (err) {
        // Handle network or other errors, set error flag, and provide a custom error message
        console.error(err);
        this.error = true;
        this.errorMessage = "An error occurred while making the request";
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
