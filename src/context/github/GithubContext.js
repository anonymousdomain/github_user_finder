import { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducer'
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GthubProvider = ({ children }) => {
	const intialState = {
		users: [],
		loading: false,
	}
	const [state, dispatch] = useReducer(GithubReducer, intialState)
	//get initial users for testing purposes
	const searchUsers = async (text) => {
		setLoading()
		const params = new URLSearchParams({
			q: text,
		})
		const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		})
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
				searchUsers,
				clearUsers
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}
export default GithubContext
