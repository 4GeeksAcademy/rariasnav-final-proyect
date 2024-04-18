const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			baseURL : 'https://legendary-tribble-97999g966jjxh47v-3001.app.github.dev/api',
			users: [],
			auth: false,
			token: localStorage.getItem('token'),
			loggedUser: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			loadUserData: async () => {
				const store = getStore()
				try {
					const response = await fetch(`${store.baseURL}/user`)
					const data = await response.json()

					if( response.ok ){
						setStore({ users: data })
					}
				} catch (error) {
					
				}
			},
			createUser: async (user) => {
				const store = getStore()
				const actions = getActions()
				try {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type' : 'application/json' },
						body: JSON.stringify(user)
					}
					const response = await fetch(`${store.baseURL}/signup`, requestOptions)
					const data = await response.json()

					if(response.ok){
						actions.loadUserData()
						return 201
					}
				} catch (error) {
					
				}
			},
			login: async (email, password) => {
				const actions = getActions()
				try {					
					const requestOptions = {
						method : 'POST',
						headers : { 'Content-Type' : 'application/json'},
						body : JSON.stringify({
							"email" : email,
							"password" : password
						})
					}
					const response = await fetch(`${getStore().baseURL}/login`, requestOptions)
					const data = await response.json()
					if( response.status === 200 ){
						setStore({ auth: true })
					}					
					if( response.ok){
						localStorage.setItem("token", data.access_token);
						actions.getInMyProfile()
					}			
				} catch (error) {
					
				}
			},
			logout: () => {
				setStore({ auth: false })
				localStorage.removeItem("token")
			},
			getInMyProfile: async () => {
				const store = getStore()
				try {
					const requestOptions = {
						method: 'GET',
						headers : { 'Authorization': `Bearer ${store.token}`},						
					}
					const response = await fetch(`${store.baseURL}/profile`, requestOptions)
					const data = await response.json()
					
					if( response.ok ){
						store.loggedUser({ loggedUser: data })
					}
				} catch (error) {
					
				}
			}
		}
	};
};

export default getState;
