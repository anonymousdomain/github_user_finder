import React, { useContext, useEffect } from 'react'
import GithubContext from '../../context/github/GithubContext'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'

function UserResults() {
 const {users,loading,fetchUsers}=useContext(GithubContext)
	useEffect(() => {
		fetchUsers()
	}, [])


	if (loading) {
		return <Spinner/>
	} else {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{users.map((user) => (
					<UserItem key={user.id} user={user}/>
				))}
			</div>
		)
	}
}

export default UserResults
