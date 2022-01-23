import { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducer'
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GthubProvider = ({ children }) => {
	const intialState = {
		users: [],
		user:{},
		loading: false,
	}
	const [state, dispatch] = useReducer(GithubReducer, intialState)

//search users
	const searchUsers = async (text) => {
		setLoading()
		const params = new URLSearchParams({
			q: text,
		})
		const res = await fetch(`${GITHUB_URL}/search/users?${params}`)
		const { items } = await res.json()
		dispatch({
			type: 'GET_USERS',
			payload: items,
		})
	}
	const setLoading = () => {
		dispatch({
			type: 'SET_LOADING',
		})
	}

	//get single user
	const getUser = async (login) => {
		setLoading()
		const res = await fetch(`${GITHUB_URL}/users/${login}`)
		if(res.status===404){
			window.location='/notfound'
		}else{
			const data = await res.json()
			dispatch({
				type: 'GET_USER',
				payload:data,
			})
		}
		
	}
	 

	//clear users from state 
	const clearUsers=()=>{
		dispatch({
			type:'CLEAR_USERS'
		})
	}
	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				user:state.user,
				searchUsers,
				clearUsers,
				getUser
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}
export default GithubContext
