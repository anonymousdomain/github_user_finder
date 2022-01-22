import { type } from '@testing-library/user-event/dist/type'
import { createContext, useReducer } from 'react'
import GithubReducer from './GithubReducer'
const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GthubProvider = ({ children }) => {
	const intialState = {
		users: [],
		loading: true,
	}
	const [state, dispatch] = useReducer(GithubReducer, intialState)
	const fetchUsers = async () => {
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

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				fetchUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}
export default GithubContext
