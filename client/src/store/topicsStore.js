import create from 'zustand'


const topics = [
  'Art',
  'Design',
  'Nature',
  'Tech'

]

const useTopicsStore = create( set => ({
  topics: topics
}))







export default useTopicsStore