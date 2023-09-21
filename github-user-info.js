const GitHubUserInfo = {
    template: `
      <div>
        <input v-model="username" placeholder="Enter GitHub username" @input="searchUser" />
        <div v-if="user">
          <h2>{{ user.name }}</h2>
          <p>Profile Name: {{ user.login }}</p>
          <p>Bio: {{ user.bio }}</p>
          <p>Date Joined: {{ formatDate(user.created_at) }}</p>
          <p>Number of Repos: {{ user.public_repos }}</p>
          <p>Number of Followers: {{ user.followers }}</p>
          <p>Number Following: {{ user.following }}</p>
          <p>Location: {{ user.location }}</p>
          <p>Twitter: <a :href="'https://twitter.com/' + user.twitter_username">{{ user.twitter_username }}</a></p>
          <p>Website: <a :href="user.blog">{{ user.blog }}</a></p>
          <p>Company: {{ user.company }}</p>
        </div>
        <div v-else-if="loading">Loading...</div>
        <div v-else-if="error">User not found</div>
      </div>
    `,
    data() {
        return {
            username: "",
            user: null,
            loading: false,
            error: false,
        };
    },
    methods: {
        async searchUser() {
            this.loading = true;
            this.error = false;
            try {
                const response = await fetch(`https://api.github.com/users/${this.username}`);
                if (response.ok) {
                    this.user = await response.json();
                } else {
                    this.error = true;
                }
            } catch (err) {
                console.error(err);
                this.error = true;
            } finally {
                this.loading = false;
            }
        },
        formatDate(dateString) {
            // Implement date formatting logic here if needed
            // For example, you can use JavaScript's Date object
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
    },
};

export default GitHubUserInfo;
