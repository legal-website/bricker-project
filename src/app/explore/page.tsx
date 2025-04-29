"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, Package } from "lucide-react"
import Header from "@/components/layout/header"
import SetCard from "@/components/lego/set-card"
import SetDetailModal from "@/components/lego/set-detail-modal"
import LoadingState from "@/components/ui/loading-state"

// Mock data for preview
const mockSets = [
  {
    id: "1",
    name: "LEGO Star Wars Imperial Star Destroyer",
    image: "/placeholder.svg?height=300&width=300",
    pieces: 4784,
    theme: "Star Wars",
    year: 2019,
    matchPercentage: 85,
  },
  {
    id: "2",
    name: "LEGO Ideas Tree House",
    image: "/placeholder.svg?height=300&width=300",
    pieces: 3036,
    theme: "Ideas",
    year: 2019,
    matchPercentage: 72,
  },
  {
    id: "3",
    name: "LEGO Creator Expert Bookshop",
    image: "/placeholder.svg?height=300&width=300",
    pieces: 2504,
    theme: "Creator Expert",
    year: 2020,
    matchPercentage: 65,
  },
  {
    id: "4",
    name: "LEGO Technic Bugatti Chiron",
    image: "/placeholder.svg?height=300&width=300",
    pieces: 3599,
    theme: "Technic",
    year: 2018,
    matchPercentage: 45,
  },
  {
    id: "5",
    name: "LEGO Harry Potter Hogwarts Castle",
    image: "/placeholder.svg?height=300&width=300",
    pieces: 6020,
    theme: "Harry Potter",
    year: 2018,
    matchPercentage: 38,
  },
  {
    id: "6",
    name: "LEGO Architecture Statue of Liberty",
    image: "/placeholder.svg?height=300&width=300",
    pieces: 1685,
    theme: "Architecture",
    year: 2018,
    matchPercentage: 25,
  },
]

// Mock themes for filter
const themes = ["All Themes", "Star Wars", "Ideas", "Creator Expert", "Technic", "Harry Potter", "Architecture"]

export default function ExplorePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [sets, setSets] = useState<typeof mockSets>([])
  const [filteredSets, setFilteredSets] = useState<typeof mockSets>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("All Themes")
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setSets(mockSets)
      setFilteredSets(mockSets)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter sets based on search and theme
  useEffect(() => {
    let result = [...sets]

    if (searchQuery) {
      result = result.filter((set) => set.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (selectedTheme !== "All Themes") {
      result = result.filter((set) => set.theme === selectedTheme)
    }

    setFilteredSets(result)
  }, [searchQuery, selectedTheme, sets])

  const handleViewSet = (id: string) => {
    setSelectedSetId(id)
    setIsModalOpen(true)
  }

  const handleAddSet = (id: string) => {
    // Add set to collection logic would go here
    console.log(`Added set ${id} to collection`)
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Explore LEGO Sets</h1>
          <p className="text-gray-600 mt-1">Discover sets you can build with your current collection</p>
        </div>

        {/* Search and filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for LEGO sets..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                >
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <motion.button
                className="flex items-center justify-center py-3 px-4 bg-gray-100 text-gray-700 rounded-lg md:hidden"
                whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={18} className="mr-2" />
                Filters
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile filters */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              className="mb-6 p-4 bg-white rounded-lg shadow-md md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="font-medium text-gray-800 mb-3">Filter by:</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                  >
                    {themes.map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Match Percentage</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <motion.button
                  className="py-2 px-4 bg-emerald-500 text-white rounded-lg"
                  whileHover={{ scale: 1.02, backgroundColor: "#10b981" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFilterOpen(false)}
                >
                  Apply Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        {isLoading ? (
          <LoadingState message="Finding matching LEGO sets..." />
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredSets.length} {filteredSets.length === 1 ? "set" : "sets"} found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedTheme !== "All Themes" && ` in ${selectedTheme}`}
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filteredSets.map((set) => (
                  <SetCard
                    key={set.id}
                    id={set.id}
                    name={set.name}
                    image={set.image}
                    pieces={set.pieces}
                    theme={set.theme}
                    year={set.year}
                    matchPercentage={set.matchPercentage}
                    onView={handleViewSet}
                    onAdd={handleAddSet}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredSets.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No matching sets found</h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <SetDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setId={selectedSetId || undefined} />
    </div>
  )
}
