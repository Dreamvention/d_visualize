import Cookies from 'js-cookie';

// state
export const state = ()=>({
	user: null,
	token: null,
	admin_url: null
});

// getters
export const getters = {
	user: state=>state.user,
	token: state=>state.token,
	check: state=>state.user !== null,
	admin_url: state=>state.admin_url,
	OCSESSID: state=>state.SET_OCSESSID
};

// mutations
export const mutations = {
	SET_TOKEN(state, token) {
		state.token = token;
	},

	FETCH_USER_SUCCESS(state, user) {
		state.user = user;
	},

	FETCH_USER_FAILURE(state) {
		state.token = null;
	},
	LOGOUT(state) {
		state.user = null;
		state.token = null;
	},
	UPDATE_USER(state, {user}) {
		state.user = user;
	},
	SET_ADMIN_URL(state, admin_url) {
		state.admin_url = admin_url;
	},
	SET_OCSESSID(state, SET_OCSESSID) {
		state.SET_OCSESSID = SET_OCSESSID;
	}
};

// actions
export const actions = {
	async login(store) {
		let res = await this.$axios({
			method: 'post',
			url: 'common/login',
			transformRequest: [function (data, headers) {
				return `username=${data.username}&password=${data.password}`;
			}],
			data: {
				username: 'admin',
				password: 'demo1234'
			},
			maxRedirects:0
		});
		store.commit('SET_ADMIN_URL', res.request.responseURL);
		store.dispatch('init_state');

	},
	async init_state({rootGetters}, s) {
		let data = await this.$axios.get('extension/module/d_visualize/init_state');
		console.log(data)
	},
	saveToken({commit, dispatch}, {token, remember}) {
		commit('SET_TOKEN', token);

		Cookies.set('token', token, {expires: remember ? 365 : null});
	},

	async fetchUser({commit}) {
		try {
			const {data} = await axios.get('/user');

			commit('FETCH_USER_SUCCESS', data);
		} catch (e) {
			Cookies.remove('token');

			commit('FETCH_USER_FAILURE');
		}
	},

	updateUser({commit}, payload) {
		commit('UPDATE_USER', payload);
	},

	async logout({commit}) {
		try {
			await axios.post('/logout');
		} catch (e) {
		}

		Cookies.remove('token');

		commit('LOGOUT');
	},

	async fetchOauthUrl(ctx, {provider}) {
		const {data} = await axios.post(`/oauth/${provider}`);

		return data.url;
	}
};
