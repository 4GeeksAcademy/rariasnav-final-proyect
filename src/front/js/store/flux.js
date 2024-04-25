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
			loggedUser: null
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
				console.log(user)
				const store = getStore()
				const actions = getActions()
				try {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type' : 'application/json' },
						body: JSON.stringify(user)
					}
					const response = await fetch(`${store.baseURL}/signup`, requestOptions)					

					if(response.ok){
						actions.loadUserData()
						return 201
					}
				} catch (error) {
					
				}
			},
			login: async (email, password) => {
				const store = getStore()
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
					const response = await fetch(`${store.baseURL}/login`, requestOptions)
					const data = await response.json()
									
					if( response.ok){
						localStorage.setItem("token", data.access_token);
						setStore({ loggedUser: data.user })
						return true
					}
					actions.logout()
					return false			
				} catch (error) {
					actions.logout()
					return false					
				}
			},
			logout: () => {
				setStore({ loggedUser: false })
				localStorage.removeItem("token")
			},
			getInMyProfile: async () => {	
				const store = getStore()
				const actions = getActions()			
				try {
					const requestOptions = {
						method: 'GET',
						headers : { 'Authorization': `Bearer ${localStorage.getItem('token')}`},						
					}
					const response = await fetch(`${store.baseURL}/profile`, requestOptions)
					const data = await response.json()
					
					if( response.ok ){
						setStore({ loggedUser: data.user })
						return true
					}
					actions.logout()
					return false	
				} catch (error) {
					actions.logout()
					return false	
				}
			},
			updateUserInformation: async (user) => {				
				const store = getStore()
				const actions = getActions()
				try {
					const requestOptions = {
						method: 'PUT',
						headers: {'Content-Type': 'application/JSON', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
						body: JSON.stringify(user)
					}
					const response = await fetch(`${store.baseURL}/user_information`, requestOptions)
					
					if( response.ok){
						actions.getInMyProfile()
						return 201
					}
				} catch (error) {
					
				}
			}
		}
	};
};

export default getState;
