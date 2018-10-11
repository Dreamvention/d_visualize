export const actions = {
  async nuxtClientInit ({ commit }) {
      let data = await this.$axios.get('extension/module/d_visualize/loadState');
  }
}
