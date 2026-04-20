import { useEffect, useState } from "react"
import DataTable from "../components/DataTable"
import FormModal from "../components/FormModal"
import Toast from "../components/Toast"
import { addVilla, deleteVilla, getAllVillas, updateVilla } from "../../services/villaService"

const defaultFormState = {
  name: "",
  location: "",
  pricePerNight: "",
  amenities: "",
  imageUrl: "",
  maxGuests: 4,
}

function ManageVillasPage() {
  const [villas, setVillas] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVilla, setEditingVilla] = useState(null)
  const [formData, setFormData] = useState(defaultFormState)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2200)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAllVillas()
        setVillas(data)
      } catch (error) {
        console.error("Failed to load villas:", error)
      }
    }
    loadData()
  }, [])

  const openAddModal = () => {
    setEditingVilla(null)
    setFormData(defaultFormState)
    setIsModalOpen(true)
  }

  const openEditModal = (villa) => {
    setEditingVilla(villa)
    setFormData({
      name: villa.name,
      location: villa.location,
      pricePerNight: villa.pricePerNight,
      amenities: villa.amenities.join(", "),
      imageUrl: villa.images?.[0] || "",
      maxGuests: villa.maxGuests || 4,
    })
    setIsModalOpen(true)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          let width = img.width
          let height = img.height
          const MAX_WIDTH = 800
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width)
            width = MAX_WIDTH
          }
          const canvas = document.createElement("canvas")
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          ctx.drawImage(img, 0, 0, width, height)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7)
          setFormData((prev) => ({ ...prev, imageUrl: compressedDataUrl }))
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      if (editingVilla) {
        await updateVilla(editingVilla.id, formData)
        showToast("Villa updated successfully.")
      } else {
        await addVilla(formData)
        showToast("Villa added successfully.")
      }
      // Refresh list
      const data = await getAllVillas()
      setVillas(data)
      setIsModalOpen(false)
    } catch (error) {
      console.error("Failed to save villa:", error)
      showToast("Error saving villa.", "error")
    }
  }

  const handleDelete = async (villaId) => {
    if (!window.confirm("Delete this villa permanently?")) return
    try {
      await deleteVilla(villaId)
      showToast("Villa deleted.")
      const data = await getAllVillas()
      setVillas(data)
    } catch (error) {
      console.error("Failed to delete villa:", error)
      showToast("Error deleting villa.", "error")
    }
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "location", label: "Location" },
    { key: "pricePerNight", label: "Price", render: (row) => `₹${row.pricePerNight}` },
    { key: "amenities", label: "Amenities", render: (row) => row.amenities.join(", ") },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEditModal(row)}
            className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="rounded-md bg-rose-600 px-3 py-1 text-xs font-semibold text-white"
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-5">
      <Toast toast={toast} />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Manage Villas</h2>
        <button
          onClick={openAddModal}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Add New Villa
        </button>
      </div>

      <DataTable columns={columns} rows={villas} emptyMessage="No villas available." />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVilla ? "Edit Villa" : "Add New Villa"}
      >
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Villa name"
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            required
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            required
            name="pricePerNight"
            type="number"
            value={formData.pricePerNight}
            onChange={handleInputChange}
            placeholder="Price per night"
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <input
            required
            name="maxGuests"
            type="number"
            min="1"
            value={formData.maxGuests}
            onChange={handleInputChange}
            placeholder="Max guests"
            className="rounded-lg border border-slate-300 px-3 py-2"
          />
          <div className="md:col-span-2">
            <span className="mb-1 block text-sm font-medium text-slate-700">Villa Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="Preview" className="mt-2 h-24 w-32 rounded-lg object-cover border border-slate-200" />
            )}
          </div>
          <textarea
            required
            name="amenities"
            value={formData.amenities}
            onChange={handleInputChange}
            placeholder="Amenities (comma separated)"
            className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2"
          />
          <div className="md:col-span-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              {editingVilla ? "Save Changes" : "Create Villa"}
            </button>
          </div>
        </form>
      </FormModal>
    </div>
  )
}

export default ManageVillasPage
