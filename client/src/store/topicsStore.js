import create from 'zustand'


const topics = [
  'Animals',
  'Art',
  'Craft',
  'Design',
  'Economics',
  'Education',
  'Enviroment',
  'Fashion',
  'Fitness',
  'Film',
  'Food',
  'History',
  'Journalism',
  'Lifestyle',
  'Literature',
  'Health',
  'Music',
  'Nature',
  'News',
  'Science',
  'Sports',
  'Technology',
]

const useTopicsStore = create( set => ({
  topics: topics
}))


export default useTopicsStore