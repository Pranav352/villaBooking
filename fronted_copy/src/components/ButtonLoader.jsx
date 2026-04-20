import { Loader2 } from "lucide-react"

function ButtonLoader({ className = "h-4 w-4" }) {
  return <Loader2 className={`animate-spin ${className}`} />
}

export default ButtonLoader
