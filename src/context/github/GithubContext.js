import { type } from '@testing-library/user-event/dist/type'
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
	const fetchUsers = async () => {
		setLoading()
		const res = await fetch(`${GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
		})
		const data = await res.json()
		dispatch({
			type: 'GET_USERS',
			payload: data,
		})
	}
	const setLoading = () => {
		dispatch({
			type: 'SET_LOADING',
		})
	}
	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}
export default GithubContext
