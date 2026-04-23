import { useEffect, useState } from "react"
import { Trash2, Mail, User, MessageSquare, Clock } from "lucide-react"
import DataTable from "../components/DataTable"
import Toast from "../components/Toast"
import { getContactMessages, deleteContactMessage } from "../../services/contactService"

function ContactMessagesPage() {
  const [messages, setMessages] = useState([])
  const [toast, setToast] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await getContactMessages()
      setMessages(data)
    } catch (error) {
      console.error("Failed to load contact messages:", error)
      showToast("Could not load contact messages.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return
    try {
      await deleteContactMessage(id)
      showToast("Message deleted successfully.")
      loadData()
    } catch (error) {
      console.error("Failed to delete message:", error)
      showToast("Error deleting message.", "error")
    }
  }

  const columns = [
    {
      key: "name",
      label: "Sender",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
            <User size={18} />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{row.name}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Mail size={10} />
              <span>{row.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "message",
      label: "Message",
      render: (row) => (
        <div className="flex items-start gap-2 max-w-md">
          <MessageSquare size={14} className="mt-0.5 shrink-0 text-slate-400" />
          <p className="text-sm text-slate-700 line-clamp-3">{row.message}</p>
        </div>
      ),
    },
    {
      key: "created_at",
      label: "Received",
      render: (row) => (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock size={12} className="text-slate-400" />
          <span>{new Date(row.created_at).toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${row.email}?subject=Re: Your message on VillaBook&body=Hi ${row.name},%0D%0A%0D%0AThank you for reaching out.%0D%0A%0D%0A`}
            title="Reply via Email"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <Mail size={16} />
          </a>
          <button
            onClick={() => handleDelete(row.id)}
            title="Delete Message"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Toast toast={toast} />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Contact Messages</h2>
        <div className="text-sm text-slate-500">
          Total: <span className="font-semibold text-slate-900">{messages.length}</span> messages
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <DataTable
          columns={columns}
          rows={messages}
          emptyMessage={isLoading ? "Loading messages..." : "No contact messages yet."}
        />
      </div>
    </div>
  )
}

export default ContactMessagesPage
