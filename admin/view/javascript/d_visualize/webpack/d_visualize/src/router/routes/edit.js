d_visualize.routes.push({
	path: '/edit',
	component: {
		template: '<vz-edit-theme></vz-edit-theme>'
	},
	children: [
		{
			path: 'components',
			component: {
				template: '<vz-component-list></vz-component-list>'
			},
		},
		{
			path: 'buttons',
			component: {
				template: '<vz-buttons></vz-buttons>'
			},
		},
		{
			path: 'inputs',
			component: {
				template: '<vz-inputs></vz-inputs>'
			},
		},
		{
			path: 'settings',
			component: {
				template: '<vz-settings></vz-settings>'
			},
		},	{
			path: 'vdh',
			component: {
				template: '<vz-edit-vdh></vz-edit-vdh>'
			},
		}, {
			path: 'vdf',
			component: {
				template: '<vz-edit-vdf></vz-edit-vdf>'
			},
		},
	]
},);