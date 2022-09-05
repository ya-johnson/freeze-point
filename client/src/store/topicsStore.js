import create from 'zustand'


const topics = [
  'Animals',
  'Art',
  'Books',
  'Career',
  'Craft',
  'Design',
  'Education',
  'Enviroment',
  'Fashion',
  'Fitness',
  'Film',
  'Food',
  'History',
  'Lifestyle',
  'Health',
  'Music',
  'Nature',
  'News',
  'Science',
  'Sports',
  'Social',
  'Tech',
  'Travel',
  'Work'
]

const useTopicsStore = create( set => ({
  topics: topics
}))


export default useTopicsStore