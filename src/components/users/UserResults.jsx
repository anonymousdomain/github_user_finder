import React, { useEffect, useState } from 'react'
import Spinner from '../layout/Spinner'

function UserResults() {
	const [users, setUsers] = useState([])
	const [Loading, setLoading] = useState(true)
	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		const res = await fetch(`${process.env.REACT_APP_URL}/users`, {
			headers: {
				Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
			},
		})
		const data = await res.json()
		setUsers(data)
		setLoading(false)
	}

	if (Loading) {
		return <Spinner/>
	} else {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{users.map((user) => (
					<li>{user.login}</li>
				))}
			</div>
		)
	}
}

export default UserResults