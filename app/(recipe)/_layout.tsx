import TabsLayout from '@/components/TabsLayout'
import React from 'react'

const TabsArray = [
  {
    name: 'content',
    icon: require('@/assets/images/icons/recipe.png'),
    title: 'Recipe',
  },
  {
    name: 'comments',
    icon: require('@/assets/images/icons/comments.png'),
    title: 'Comments',
  }
]

const RecipeLayout = () => {
  return (
    <>
    <TabsLayout tabs={TabsArray}/>
    </>
  )
}

export default RecipeLayout;