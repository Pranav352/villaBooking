import { useEffect, useState } from "react"
import DataTable from "../components/DataTable"
import Toast from "../components/Toast"
import { deleteUser, getUsers } from "../../services/userService"

function ManageUsersPage() {
  const [users, setUsers] = useState([])
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2200)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch (error) {
        console.error("Failed to load users:", error)
      }
    }
    loadData()
  }, [])

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user?")) return
    try {
      await deleteUser(userId)
      showToast("User deleted.")
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white"
        >
          Delete
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-5">
      <Toast toast={toast} />
      <h2 className="text-xl font-semibold text-slate-900">Manage Users</h2>
      <DataTable columns={columns} rows={users} emptyMessage="No users registered yet." />
    </div>
  )
}

export default ManageUsersPage
