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
			loadUserDataById: async (id) => {
				const store = getStore()
				try {
					const response = await fetch(`${store.baseURL}/user/${id}`)
					const data = await response.json()

					if( response.ok ){
						return data
					}
					return false
				} catch (error) {
					return false
				}
			},
			createUser: async (user) => {				
				const store = getStore()
				try {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type' : 'application/json' },
						body: JSON.stringify(user)
					}
					const response = await fetch(`${store.baseURL}/signup`, requestOptions)					

					if(response.ok){
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
			},
			loadTestData: async ()=> {
				try {
					const response = await fetch('https://jsonplaceholder.typicode.com/users')
					const data = await response.json()

					if(response.ok){
						return data
					}
					return false
				} catch (error) {
					return false
				}
			},
			getCategories: async ()=> {
				const store = getStore()
				try {
					const response = await fetch(`${store.baseURL}/services_category`)
					const data = await response.json()

					if( response.ok ){
						return data
					}
					return false
				} catch (error) {
					return false
				}
			},
			getSubcategories: async ()=>{
				const store = getStore()
				try {
					const response = await fetch(`${store.baseURL}/services_subcategory`)
					const data = await response.json()

					if( response.ok ){
						return data
					}
					return false					
				} catch (error) {
					return false
				}
			},
			getCategoriesSubcategories: async ()=>{
				const store = getStore()
				try {
					const response = await fetch(`${store.baseURL}/services_category_subcategory`)
					const data = await response.json()

					if( response.ok ){
						return data
					}				
					return false	
				} catch (error) {
					return false
				}
			},
			postForAService: async (service_request)=>{
				const store = getStore()
				const newData = {
					"email": store.loggedUser.email,
					...service_request
				}
				try {
					const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/JSON', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
						body: JSON.stringify(newData)
					}
					const response = await fetch(`${store.baseURL}/service_request`, requestOptions)
					if( response.ok ){
						return 201
					}
					
				} catch (error) {
					
				}
				
			},
			getServicesRequests: async () =>{
				const store = getStore()
				try {
					const requestOptions = {
						method: 'GET',
						headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
					}
					const response = await fetch(`${store.baseURL}/service_request`, requestOptions)
					const data = await response.json()

					if(response.ok){
						return data
					}
					return false
				} 
				catch (error) {
					return false
				}
			},
			cancelServiceRequest: async (filteredServiceRequestId)=>{
				const store = getStore()
				const actions = getActions()
				try {
					const requestOptions ={
						method: 'DELETE',
						headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
					}
					const response = await fetch(`${store.baseURL}/service_request/${filteredServiceRequestId}`, requestOptions)
					if( response.ok ){
						actions.getServicesRequests()
						return 201
					}
				} catch (error) {
					
				}
			},
			offerServiceRequest: async (data, requestServiceOffer)=>{
				const store = getStore()
				const actions = getActions()
				const newData = {
					"vendor_email": store.loggedUser.email,
					...data,
					...requestServiceOffer
				}				 				 												
				try {
					const requestOptions = {
						method: 'POST',
						headers: {'Content-Type':'application/JSON', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
						body: JSON.stringify(newData)
					}
					const response = await fetch(`${store.baseURL}/service_request_offer`, requestOptions)
					if(response.ok){
						actions.getServicesRequests()
						return 201
					}
					
				} catch (error) {
					
				}
			},
			getServicesRequestsOffers: async ()=>{
				const store = getStore()
				try {
					const requestOptions = {
						method: 'GET',
						headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
					}
					const response = await fetch(`${store.baseURL}/service_request_offer`, requestOptions)
					const data = await response.json()

					if( response.ok ){
						return data
					}
					return false
				} catch (error) {
					return false
				}
			},
			getOfferKnowedle: async ()=>{
				const store = getStore()
				try {
					const requestOptions = {
						method: 'GET',
						headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
					}
					const response = await fetch(`${store.baseURL}/offer_knowledge`, requestOptions)
					const data = await response.json()
					
					if( response.ok ){
						return data
					}
					return false
				} catch (error) {
					return false
				}
			},
			updateServicesRequestsOffers: async (index,data)=>{
				const store = getStore()
				const actions = getActions()
				try {
					const requestOptions = {
						method: 'PUT',
						headers: {'Content-Type':'application/JSON', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
						body: JSON.stringify(data)
					}
					const response = await fetch(`${store.baseURL}/service_request_offer/${index.service_request_offer_id}/${index.service_request_id}`, requestOptions)

					if(response.ok){
						actions.getServicesRequests()
						actions.getServicesRequestsOffers()
						return 201
					}
					
				} catch (error) {
					
				}
			},
			updateProfilePicture: async (pictureFile) =>{
				const store = getStore()
				try {
					const response = await fetch(`${store.baseURL}/upload_profile_picture`, {
						method: ['PUT'],
						body: pictureFile,
						headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
					})
					return response.status
				} catch (error) {
					
				}
			},
			uploadGalleryPicture: async (galleryPicture) =>{
				const store = getStore()

				try {
					const response = await fetch(`${store.baseURL}/user_gallery_pictures`, {
						method: ['POST'],
						body: galleryPicture,
						headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
					})
					return response.status
					
				} catch (error) {
					console.log('Error uploading gallery picture', error)
				}
			},
			getGalleryPictures: async () =>{
				const store = getStore()
				try {
					const requestOptions = {
						method: ['GET'],
						headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
					}
					const response = await fetch(`${store.baseURL}/user_gallery_pictures`, requestOptions)
					const data = await response.json()
					if(response.ok){
						return data
					}
					return false
				} catch (error) {
					return false
				}
			},
		}
	};
};

export default getState;
