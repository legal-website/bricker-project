"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Plus } from "lucide-react"
import Header from "@/components/layout/header"
import SetCard from "@/components/lego/set-card"
import SetDetailModal from "@/components/lego/set-detail-modal"
import EmptyState from "@/components/ui/empty-state"

// Mock data for preview
const mockSets = [
  {
    id: "1",
    name: "LEGO Star Wars Imperial Star Destroyer",
    image: "/game.jpg",
    pieces: 4784,
    theme: "Star Wars",
    year: 2019,
  },
  {
    id: "2",
    name: "LEGO Ideas Tree House",
    image: "/game.jpg",
    pieces: 3036,
    theme: "Ideas",
    year: 2019,
  },
  {
    id: "3",
    name: "LEGO Creator Expert Bookshop",
    image: "/game.jpg",
    pieces: 2504,
    theme: "Creator Expert",
    year: 2020,
  },
  {
    id: "4",
    name: "LEGO Technic Bugatti Chiron",
    image: "/game.jpg",
    pieces: 3599,
    theme: "Technic",
    year: 2018,
  },
]

export default function MySetsPage() {
  const [sets, setSets] = useState(mockSets)
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRemoveSet = (id: string) => {
    setSets((prevSets) => prevSets.filter((set) => set.id !== id))
  }

  const handleViewSet = (id: string) => {
    setSelectedSetId(id)
    setIsModalOpen(true)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      <motion.main
        className="container mx-auto px-6 md:px-8 pt-28 pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My LEGO Sets</h1>
            <p className="text-gray-600 mt-1">Manage your collection of LEGO sets</p>
          </div>

          <motion.button
            className="mt-4 md:mt-0 flex items-center justify-center py-2 px-4 bg-emerald-500 text-white rounded-lg"
            whileHover={{ scale: 1.02, backgroundColor: "#10b981" }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} className="mr-2" />
            Add New Set
          </motion.button>
        </div>

        {sets.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {sets.map((set) => (
                <SetCard
                  key={set.id}
                  id={set.id}
                  name={set.name}
                  image={set.image}
                  pieces={set.pieces}
                  theme={set.theme}
                  year={set.year}
                  isOwned={true}
                  onRemove={handleRemoveSet}
                  onView={handleViewSet}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title="No LEGO Sets Found"
            message="You haven't added any LEGO sets to your collection yet. Start building your collection by adding your first set!"
            icon={<Package size={48} />}
            action={
              <motion.button
                className="flex items-center justify-center py-2 px-4 bg-emerald-500 text-white rounded-lg"
                whileHover={{ scale: 1.02, backgroundColor: "#10b981" }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={18} className="mr-2" />
                Add Your First Set
              </motion.button>
            }
            image="/placeholder.svg?height=200&width=200"
          />
        )}
      </motion.main>

      <SetDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setId={selectedSetId || undefined} />
    </motion.div>
  )
}
