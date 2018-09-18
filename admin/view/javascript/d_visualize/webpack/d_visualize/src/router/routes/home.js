d_visualize.routes.push({
	path: '/home',
	component: {
		template: '<viz-home></viz-home>'
	},
	children: [
		{
			path: 'dashboard',
			component: {
				template: '<viz-dashboard></viz-dashboard>'
			},
		},
		{
			path: 'marketplace',
			component: {
				template: '<viz-marketplace></viz-marketplace>'
			},
		}
	]
});
d_visualize.routes.push(  { path: '/', redirect: '/home/dashboard'});
d_visualize.routes.push(  { path: '/', redirect: '/home/dashboard'});